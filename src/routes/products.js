import express from "express";
import productsController from "../controllers/productsController.js";
import auth from "../middleware/auth.js";

const router= express.Router();

router.post("/", auth, productsController.createProducts);
router.put("/:id", auth, productsController.updateProduct);
router.get("/:id", productsController.getProductById);
router.get("/", productsController.getAllProducts);
router.delete("/:id", auth, productsController.deleteProduct);

export default router