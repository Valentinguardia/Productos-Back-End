import express from "express";
import productsRouter from "./products.js"
import usersRouter from "./users.js"
import brandsRouter from "./brands.js"

const router = express.Router();

router.use("/products", productsRouter);
router.use("/brands", brandsRouter)
router.use("/users", usersRouter)

export default router