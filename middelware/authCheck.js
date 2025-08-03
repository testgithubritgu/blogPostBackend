const jwt = require("jsonwebtoken")

exports.authCheck = async (req, res, next) => {

    const authToken = req.headers["authorization"]
    const token =authToken &&  authToken.split(' ')[1]

    
    if (!token) {
        return res.status(404).json({ message: "no token provided" ,success:false })
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
       
        next()
    } catch {
        return res.status(401).json({ message: "token expired need to login" ,success:false})
    }
}

