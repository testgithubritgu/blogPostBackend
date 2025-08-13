const express = require("express")
const { userLogin, userRegister, userAccountUpdate } = require("../controller/userController")
const { authCheck } = require("../middelware/authCheck")


const router = express.Router()


router.post("/login",userLogin)
router.post("/register",userRegister)
router.put("/updateaccount",authCheck,userAccountUpdate)


module.exports = router