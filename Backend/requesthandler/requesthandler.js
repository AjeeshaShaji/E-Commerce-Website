import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



import User from "../models/user.js";
import Product from "../models/products.js";
import Order from "../models/orders.js";
import Cart from "../models/Cart.js";



/* ================= OTP ================= */
export const sendOtpHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    user.isVerified = false;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ajeeshashaji2357@gmail.com",
        pass: "jbldijqikbfjrwbh"
      }
    });
    await transporter.sendMail({
      from: "ajeeshashaji2357@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "OTP failed" });
  }
};





export const verifyOtpHandler = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now())
    return res.status(400).json({ message: "Invalid OTP" });

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ success: true });
};




/* ================= SIGNUP ================= */
export const signupHandler = async (req, res) => {
  try {
    const { email, username, password, fullname, phone, gender } = req.body;

    // 1. CHECK USER EXISTS
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    // 2. CHECK ALREADY REGISTERED
    if (user.password) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. VALIDATION
    if (!fullname || !phone || !gender || !username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 4. SAVE DATA
    user.fullname = fullname;
    user.phone = phone;
    user.gender = gender;
    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.role = "user";

    await user.save();

    res.json({ success: true, message: "Signup successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup failed" });
  }
};



/* ================= LOGIN ================= */
export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ===== ADMIN LOGIN ===== */
    if (email === "Admin" && password === "Admin12") {
      const token = jwt.sign(
        { id: "admin-id", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.json({
        success: true,
        token,
        role: "admin"
      });
    }

    /* ===== USER LOGIN ===== */
    const user = await User.findOne({
      $or: [{ email }, { username: email }]
    });
    if (!user)
      return res.status(401).json({ message: "User not found" });
    if (!user.isVerified)
      return res.status(401).json({ message: "OTP not verified" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      success: true,
      token,
      role: "user",
      user
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};





/* ================= DASHBOARD ================= */
export const dashboard = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const users = await User.countDocuments({ role: "user" });
    const orders = await Order.find();
    res.json({
      products,
      users,
      totalOrders: orders.length,
      shipped: orders.filter(o => o.status === "shipped").length,
      delivered: orders.filter(o => o.status === "delivered").length
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
};


/* ================= PRODUCTS (ADMIN) ================= */

/* ================= ADD PRODUCTS (ADMIN) ================= */

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Add failed" });
  }
};

/* ================= VIEW PRODUCTS (ADMIN) ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
};


/* ================= EDIT PRODUCTS (ADMIN) ================= */
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};


/* ================= DELETE PRODUCTS (ADMIN) ================= */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};


// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
};


/* ================= USERS (ADMIN) ================= */
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


/* ================= ORDERS (ADMIN) ================= */
export const getOrders = async (req, res) => {
  const orders = await Order.find().populate("userId");
  res.json(orders);
};










/* ================= USER ================= */

/* PRODUCTS */
export const getAllProductsUser = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* PROFILE */
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phone, username, gender } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullname, phone, username, gender },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};


/* GET CART */
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // or _id

    const cart = await Cart.find({ userId })
      .populate("productId");

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* ADD TO CART */
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const item = await Cart.create({
      userId: req.user.id,
      productId
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE CART ITEM */
export const removeCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const placeOrder = async (req, res) => {
  try {
    const { address, phone } = req.body;

    if (!address || !phone) {
      return res.status(400).json({ message: "Address and phone required" });
    }

    // get cart
    const cart = await Cart.find({ userId: req.user.id }).populate("productId");

    if (!cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // calculate total
    let total = 0;
    const items = cart.map(item => {
      total += item.productId.price * (item.quantity || 1);

      return {
        productId: item.productId._id,
        quantity: item.quantity || 1
      };
    });

    // create order
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount: total,
      address,
      phone
    });

    // clear cart
    await Cart.deleteMany({ userId: req.user.id });

    res.json(order);

  } catch (err) {
    console.log(err);   // 🔥 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};

/* WISHLIST */
export const addWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(productId)) {
      return res.json({ message: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ message: "Added to wishlist" });
  } catch {
    res.status(500).json({ message: "Wishlist error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json(user.wishlist);
  } catch {
    res.status(500).json({ message: "Fetch wishlist failed" });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: "Removed" });
  } catch {
    res.status(500).json({ message: "Remove failed" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.productId");

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow cancelling if pending
    if (order.status.toLowerCase() !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};