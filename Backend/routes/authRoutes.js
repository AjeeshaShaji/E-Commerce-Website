import express from "express";
import * as rh from "../requesthandler/requesthandler.js";
import { auth } from "../middleware/auth.Middleware.js";

const router = express.Router();

/* AUTH */
router.post("/send-otp", rh.sendOtpHandler);
router.post("/verify-otp", rh.verifyOtpHandler);
router.post("/signup", rh.signupHandler);
router.post("/login", rh.loginHandler);

/* USER */
router.get("/user/:id", rh.getUserProfile);
router.put("/user/:id", rh.updateUserProfile);
router.get("/user/:id/orders", rh.getUserOrders);

/* ADMIN */
router.post("/admin/login", rh.adminLogin);
router.get("/admin/users", rh.getAllUsers);

/* PRODUCTS */
router.post("/product", rh.addProduct);
router.get("/products", rh.getProducts);

/* ORDERS */
router.post("/order", rh.createOrder);
router.get("/orders", rh.getAllOrders);

export default router;
