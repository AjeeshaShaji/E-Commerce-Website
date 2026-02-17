import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    stock: ""
  });

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    if (!id) return;

    API.get(`/admin/product/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("Product not found");
      });
  }, [id]);

  // ================= UPDATE =================
  const updateProduct = async () => {
    try {
      await API.put(`/admin/product/${id}`, product);
      alert("Updated Successfully");
      navigate("/admin/dashboard/products");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Title"
        value={product.title}
        onChange={e => setProduct({ ...product, title: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Price"
        value={product.price}
        onChange={e => setProduct({ ...product, price: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Category"
        value={product.category}
        onChange={e => setProduct({ ...product, category: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Stock"
        value={product.stock}
        onChange={e => setProduct({ ...product, stock: e.target.value })}
      />

      <button
        onClick={updateProduct}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Update Product
      </button>
    </div>
  );
}
