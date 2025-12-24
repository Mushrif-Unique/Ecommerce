import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
//Middleware
app.use(express.json());


//importing routes
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js"

//using routes this
app.use("/api",userRoutes);
app.use("/api",productRoutes);

//Static files
app.use("/uploads",express.static("uploads"));

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
    connectDb();
})