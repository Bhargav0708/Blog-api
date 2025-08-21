// import e = require("express");
import { Router } from "express";
import { authController } from "../controller/auth.controller";

const router = Router();

router.post("/signup", authController.create);
router.post("/login", authController.login);
router.get("/usersinfo",authController.getAllUserInfo)
router.put("/update/:id",authController.UpdateUserByid)
router.delete("/deleteUser/:id",authController.DeleteUserByid)
export default router;
