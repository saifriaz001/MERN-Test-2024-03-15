const bcrypt = require("bcrypt");
const User = require("../Models/User");
const OTP = require("../Models/OTP")
const mailSender = require("../utils/mailSender")
const otpGenerator = require("otp-generator")
require ("dotenv").config();
const jwt = require("jsonwebtoken");



exports.signup = async (req, res)=>{
    try {
        
        const {
            name ,
            email,
            password,
            confirmPassword,
            otp
        } = req.body;

        //check if ALL Details Are there or not

        if(!name , !email, !password, !confirmPassword,!otp){
            return res.status(403).send({
                success:false,
                message:"ALL Fields are required",
            });
        }

            if(password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:
                    "Password and Confrim Password Do not Match. please try again"
                });
            }

            //Check if user already exists

            const existingUser = await User.findOne({ email});
            if(existingUser){
                return  res.status(400).json({
                    success:false,
                    message:"User already exists. please sign in to continue.",
                });
            }

            //Find the most recent otp for the email

            const response = await OTP.find({email}).sort({ createdAt:-1}).limit(1);
            console.log(response)

            if(response.length === 0){
                return res.status(400).json({
                    success:false,
                    message:"This OTp is not vaild",
                });
            } else if (otp !== response[0].otp){
                //Invalid Otp
                return res.status(400).json({
                    success:false,
                    message:"The OTP is not vaild",
                });
            }
            //Hash the password
            const hashedPassword = await bcrypt.hash(password,10);

            //Create the user
            const user = await User.create({
                name,
                email,
                password:hashedPassword
            })
            
            return res.status(200).json({
                success:true,
                user,
                message:"User registered Successfully"
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"USer cannot be registered . Please try again.",
        });
        
    }
};

exports.login = async(req, res)=>{
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill up all the required fields",
            });
        }

        //find user with provided email
        const user = await User.findOne({email})

        //if user not found with provided email
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered with us . Please SignUP to Continue ",
            });
        }
        
        //Generate JWT token and Compare password
        if(await bcrypt.compare(password , user.password)){
            const token = jwt.sign(
                {
                    email: user.email , id:user._id 
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            )
            //Save Token to user document in database
            user.token = token;
            user.password= undefined;
            //set Cookie for token and return  success response
            const options ={
                expires: new Date( Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie("token" , token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User Login Successfully"
            });
        } else {
            return res.status(401).json({
                success:false,
                message:"password is in-correct",
            });
        }
    }  catch(error){
        console.error(error);
         return res.status(500).json({
            success:false,
            message:"Login Failure please try again",
         });

    }
};

exports.sendotp = async(req , res) =>{
    try {
        const {email} = req.body;
        //Check if user is already present
        //Find user with provided email
        
        const  checkUserPresent = await User.findOne({email});
        //to be used in the case of signup

        // if user found  with provided email
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User is Already Registered",
            });
        }
        var otp = otpGenerator.generate( 8 ,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        const result = await OTP.findOne({otp:otp});
        console.log("Result is Generate OPT func");
        console.log("OTP" , otp);
        console.log("Result", result);
        while(result){
            otp = otpGenerator.generate(8 ,{
                upperCaseAlphabets:false,
            });
        }
        const otpPayload ={email , otp};
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body" , otpBody);
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
};