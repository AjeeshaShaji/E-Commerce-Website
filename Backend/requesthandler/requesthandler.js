import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Product from "../models/products.js";
import Order from "../models/order.js";

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

/* ================= AUTH ================= */
export const signupHandler = async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.isVerified)
    return res.status(400).json({ message: "OTP not verified" });

  user.username = username;
  user.password = await bcrypt.hash(password, 10);
  user.role = "user";
  await user.save();

  res.json({ success: true });
};


export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username: email }]
  });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
};

/* ================= USER ================= */
export const getUserProfile = async (req, res) => {
  res.json(await User.findById(req.params.id).select("-password"));
};

export const updateUserProfile = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
};

export const getUserOrders = async (req, res) => {
  res.json(await Order.find({ userId: req.params.id }));
};















/* ================= ADMIN ================= */
export const adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === "Admin" && password === "Admin12") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid admin login" });
};

export const getAllUsers = async (req, res) => {
  res.json(await User.find());
};

/* ================= PRODUCTS ================= */
export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

export const getProducts = async (req, res) => {
  res.json(await Product.find());
};








/* ================= ORDERS ================= */
export const createOrder = async (req, res) => {
  const order = new Order({
    userId: req.user.id,
    products: req.body.products
  });
  await order.save();
  res.json(order);
};

export const getAllOrders = async (req, res) => {
  res.json(await Order.find().populate("userId"));
};
