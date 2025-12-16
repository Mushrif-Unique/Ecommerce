//To create routes and get the data and using model to pass and store the data in the Database
import express from "express";
import { loginUser, myProfile, registerUser, verifyUser } from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";


const router = express.Router();

//Rgister
router.post("/user/register",registerUser);
//Verify
router.post("/user/verify",verifyUser);
//login
router.post("/user/login", loginUser);
//Profile view
router.get("/user/profile",isAuth,myProfile) //isAuth(It checks whether a user is logged in) - Provide middleware only if login 


export default router;