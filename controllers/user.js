import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // to crate new activation key
import sendMail from "../middleware/sendMail.js";

//req your data 
//res data send by the function
//New User Registration
export const registerUser = async (req, res) => {
    try {
        const {name,email,password,contact}=req.body;

        //code to check the email address already exists or not
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message: "User Email Already Exists",
            })
        }

        //Code to Convert raw password to hashed password
        const hashPassword = await bcrypt.hash(password,10);

        //generate OTP
        const otp = String(Math.floor(Math.random()*1000000)).padStart(6, '0');


        /*we can send this random number as object and put it 
        to the json token and create activation key and 
         the activation key we can send*/
        //create new user data
        user = { name, email,hashPassword, contact };


        //to create signed activation token
        const activationToken = jwt.sign({user,otp},process.env.ACTIVATION_SECRET,{
            expiresIn: "5m",
        });

        //Send Email
        const message = `Please Verify your Account using otp your otp is ${otp}`;
        await sendMail(email,"Welcome to Our Website",message);

        return res.status(200).json({
            message: "OTP sent to your mail",
            activationToken,
        });

    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
};

//Verify OTP

export const verifyUser = async(req,res) => {
    try {
        //Getting the otp and verification token
        const {otp,activationToken} = req.body;
        const verify = jwt.verify(activationToken,process.env.ACTIVATION_SECRET);
        if(!verify){
            return res.json({
                message: "OTP Expired",
            });
        }

        if(verify.otp !== otp)
        {
            return res.json({
                message:"Wrong OTP",
            })
        }

        // To Store In Database 
        await User.create({
            name:verify.user.name,
            email:verify.user.email,
            password:verify.user.hashPassword,   
            contact: verify.user.contact,

        });
        return res.status(200).json({
            message: "User Registration Success",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};