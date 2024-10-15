import express from "express";
import userController from "../controllers/usersControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userController.register);//OK
router.post("/login", userController.login);//OK
router.post("/logout", auth, userController.logout);//OK
router.get("/me", auth, userController.me);//OK

export default router