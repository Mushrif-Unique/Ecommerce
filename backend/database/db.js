import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("Databse Connectd")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;