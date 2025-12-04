//To create routes and get the data and using model to pass and store the data in the Database
import express from "express";
import { registerUser } from "../controllers/user.js";

const router = express.Router();

router.post("/user/register",registerUser);

export default router;