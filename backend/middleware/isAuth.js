//To Verify is it authorized user
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const isAuth = async(req,res,next) => {//next => if its authorized go to next procss
    try {
        const token = req.headers.token;
        if(!token){
            return res.status(403).json({
                message:"please log-in to Access"
            });
        }
            //Decode JWT Signed
            const decodedData = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decodedData._id);
            next(); //Continue to next middleware function

    } catch (error) {
        return res.status(403).json({
            message:"please log-in to Access"
        });

    }

}