import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/multer.js";
import { createProduct, fetchAllProducts } from "../controllers/product.js";

const router = express.Router();
router.post("/product/new",isAuth,uploadFiles,createProduct);
router.get("/product/all-products",fetchAllProducts);
export default router;