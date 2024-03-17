const express = require("express")
const router = express.Router()
//Import the required controllers and middleware  functions

const {
    login,
    signup,
    sendotp
} = require("../Controllers/Auth")
const {
    auth
} = require("../middleware/auth")

const {
  removeInterest,
  addInterest
} = require("../Controllers/Interest")

//Route for user login
router.post("/login" , login)

//router for user signup 
router.post("/signup", signup)

//Route for sending OTP to the user's email
router.post("/sendotp" , sendotp)

//route for adding interest
router.post('/add', addInterest)

//route for removing Interest
router.post('/remove' ,  removeInterest)

module.exports = router;