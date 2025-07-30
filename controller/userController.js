const userModel = require("../model/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.userLogin = async (req, res) => {
    const {  email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(500).json({ message: "user not found" })
    }
    const verifyPass = await bcrypt.compare(password, user.password)
    if (!verifyPass) {
        return res.status(400).json({ message: "invalid credintial" })
    }
    const token = jwt.sign({ id: user._id,name:user.name }, process.env.SECRET_KEY )
    res.status(200).json({ success: true, message: "Login succesfully", token,user })
}
exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        return res.status(500).json({ message: "user exist already" })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const createUser = await userModel.create({
        name,
        email,
        password: hashPassword,
})
    // const token = jwt.sign({ email, name }, process.env.SECRET_KEY)
    res.status(200).json({ success: true, message: "user created succesfully" })
}

