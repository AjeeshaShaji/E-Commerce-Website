import express from "express";
import * as rh from "../requesthandler/requesthandler.js";
import { adminAuth, userAuth } from "../middleware/auth.Middleware.js";

const router = express.Router();

/* ================= AUTH ================= */
router.post("/send-otp", rh.sendOtpHandler);
router.post("/verify-otp", rh.verifyOtpHandler);
router.post("/signup", rh.signupHandler);
router.post("/login", rh.loginHandler);

/* ================= ADMIN ================= */
router.get("/admin/dashboard", adminAuth, rh.dashboard);

router.post("/admin/product", adminAuth, rh.addProduct);
router.get("/admin/products", adminAuth, rh.getProducts);
router.get("/admin/product/:id", adminAuth, rh.getSingleProduct);
router.put("/admin/product/:id", adminAuth, rh.updateProduct);
router.delete("/admin/product/:id", adminAuth, rh.deleteProduct);

router.get("/admin/users", adminAuth, rh.getUsers);
router.get("/admin/orders", adminAuth, rh.getOrders);
router.put("/admin/order/:id", adminAuth, rh.updateOrderStatus);


/* ================= USER ================= */

/* PRODUCTS */
router.get("/user/products", userAuth, rh.getAllProductsUser);

/* PROFILE */
router.get("/user/profile", userAuth, rh.getProfile);
router.put("/user/profile", userAuth, rh.updateProfile);

/* CART */
router.post("/user/cart", userAuth, rh.addToCart);
router.get("/user/cart", userAuth, rh.getCart);
router.delete("/user/cart/:id", userAuth, rh.removeCart);

/* WISHLIST */
router.post("/user/wishlist", userAuth, rh.addWishlist);
router.get("/user/wishlist", userAuth, rh.getWishlist);
router.delete("/user/wishlist/:id", userAuth, rh.removeWishlist);

/* ORDERS */
router.post("/user/order", userAuth, rh.placeOrder);
router.get("/user/orders", userAuth, rh.getUserOrders);
router.put("/user/orders/:id/cancel",userAuth,rh.cancelOrder);

export default router;
