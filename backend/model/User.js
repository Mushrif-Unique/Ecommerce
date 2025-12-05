import mongoose from "mongoose";

// To use user authentication for that store the user data
const schema = new mongoose.Schema({
    //Database fields
    name :{
        type:String,
        required: true, //must fill so give like this  
    },
    email: {
        type:String,
        required: true, //must fill so give like this 
        unique:true, // can't use same email multiple times
    },
    password:{
        type:String,
        required: true, //must fill so give like this 
    },
    role:{
        type:String,
        default: "User",
    },
    contact:{
        type:String,
        required:true,
    },

},{timestamps:true}); //user log-in log-out activity store

export const User = mongoose.model("User",schema);