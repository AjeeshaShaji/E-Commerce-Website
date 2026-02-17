import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    API.get("/admin/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  const deleteProduct = async (id) => {
    await API.delete(`/admin/product/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">All Products</h2>

      <div className="grid grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="p-4 shadow rounded bg-white">

            <h3 className="font-bold">{p.title}</h3>
            <p>₹ {p.price}</p>
            <p>{p.category}</p>
            <p>Stock: {p.stock}</p>

            <div className="flex gap-2 mt-3">
              {/* ✅ FIXED EDIT BUTTON */}
              <button
                onClick={() => navigate(`/admin/dashboard/edit/${p._id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
