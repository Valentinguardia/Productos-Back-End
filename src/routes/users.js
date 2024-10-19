import express from "express";
import userController from "../controllers/usersControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.get("/me", auth, userController.me);

export default router