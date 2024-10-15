import express from "express";
import brandsController from "../controllers/brandsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth,brandsController.createBrands);//OK
router.put("/:id", auth, brandsController.updateBrand);//OK
router.get("/:id", brandsController.getBrandById);//OK
router.get("/", brandsController.getAllBrands);//OK
router.delete("/:id", auth,brandsController.deleteBrand);//OK

export default router