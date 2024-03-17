const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

exports.auth = async(req, res, next) =>{
    try{
        console.log("Before Token Extraction");
        //extract token
        const token = req.cookies.token
                        ||req.body.token
                        ||req.header("Authorisation").replace("Bearer ","");
        console.log("AFTER TOKEN EXTRACTION");
        
        //if token missing, then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }

        //verify the token
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            //Verification-issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        });
    }
}