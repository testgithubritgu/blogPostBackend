const userModel = require("../model/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    const verifyPass = await bcrypt.compare(password, user.password)
    if (!verifyPass) {
        return res.status(400).json({ message: "invalid credintial" })
    }
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.SECRET_KEY)
    res.status(200).json({ success: true, message: "Login succesfully", token, user, isAdmin: user.role === "admin" ? true : false })
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

exports.userAccountUpdate = async (req, res) => {
    try {
        const { firstname, email, oldpass, newpass } = req.body
        const { id } = req.user
        const findeUser = await userModel.findById(id)
        if (!findeUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        findeUser.name = firstname || findeUser.name
        findeUser.email = email || findeUser.email
        const pass = oldpass || false
        if (pass) {

            const checkPass = await bcrypt.compare(oldpass, findeUser.password)
            if (!checkPass) {
                return res.status(401).json({ message: "invalid password", success: false })
            }
            if ( newpass) {
                const updatePass = await bcrypt.hash(newpass, 10)
                findeUser.password = updatePass
            }
        }
        await findeUser.save()

        res.status(200).json({ message: "Account updated successfully", success: true, data: findeUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}