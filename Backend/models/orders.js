import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: Array,
  status: {
    type: String,
    default: "Pending"
  }
});

export default mongoose.model("Order", orderSchema);
