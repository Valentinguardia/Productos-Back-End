import express from "express";
import brandsController from "../controllers/brandsController.js";
import auth from "../middleware/auth.js";

const router= express.Router();

router.post("/", auth, brandsController.createBrands);
router.put("/:id", auth, brandsController.updateBrand);
router.get("/:id", brandsController.getBrandById);
router.get("/", brandsController.getAllBrands);
router.delete("/:id", auth, brandsController.deleteBrand);

export default router