import { useState } from "react";
import API from "../../services/api";

export default function AddProduct() {

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/admin/product", form);
    alert("Product Added Successfully ✅");

    setForm({
      title: "",
      price: "",
      category: "",
      stock: ""
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-5"
      >

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Add New Product
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Product Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}
