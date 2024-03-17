const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/emailVerfifcationTemplate");
const OtpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    },
});

async function  sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        );
        console.log("Email sent successfully: ", mailResponse.response);

    }
    catch(error){
        console.log("Error Occurrred While sending email: " , error);
        throw error;
    }
}

OtpSchema.pre("save" , async function(next){
    console.log("New Document  saved to database");
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP" , OtpSchema);

module.exports = OTP;
