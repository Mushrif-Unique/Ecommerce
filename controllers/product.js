import { Product } from "../model/product.js";

//Add New Product
export const createProduct = async(req,res) => {
    try {
        //Check user Role
        if(req.user.role!="admin"){
            return res.status(403).json({
            message:"Unauthorized Access",
        });
        }
        const {title,description,category,price,stock,mrp}=req.body;
        const image = req.file;

        //check image is selected
        if(!image){
            return res.status(400).json({
                message:"Please select the image",
            });
        }

        const product = await Product.create({
            title,
            description,
            category,
            price,
            stock,
            image:image?.path,
            mrp,
        });
        res.status(201).json({
            message:"Product Details added success",
            product,
        });

    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
};

//Fetch all products
export const fetchAllProducts = async(req,res) => {
    try {
        // To save the all the products in variable
        const products = await Product.find();
        return res.status(200).json({message:"List of products",length: products.length,products});
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
}