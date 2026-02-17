import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: Number,
  address: String,
  phone: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;   // ✅ IMPORTANT
