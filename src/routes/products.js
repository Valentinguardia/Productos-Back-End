import express from "express";
import productsController from "../controllers/productsController.js";
import auth from "../middleware/auth.js";

const router= express.Router();

router.post("/", auth, productsController.createProducts);//OK
router.put("/:id", auth, productsController.updateProduct);//OK
router.get("/:id", productsController.getProductById);//OK
router.get("/", productsController.getAllProducts);//OK
router.delete("/:id", auth, productsController.deleteProduct);//OK

export default router