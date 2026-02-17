import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  stock: Number,
});

export default mongoose.model("Product", productSchema);
