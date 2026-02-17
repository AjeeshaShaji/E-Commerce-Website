import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,

  fullName: String,
  gender: String,
  phone: String,

  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },

role: { type: String, default: "user" },

  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ],

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);


