import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    API.get("/user/products").then(res => setProducts(res.data));
  }, []);

  const handleQty = (id, value) => {
    if (value < 1) return;
    setQty({ ...qty, [id]: Number(value) });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            
            {/* Product Info */}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{p.title}</h2>
              <p className="text-sm text-gray-500 mb-1">{p.category}</p>
              <p className="text-gray-900 font-bold text-xl mb-3">₹{p.price}</p>

              {/* Quantity */}
              <div className="flex items-center mb-4">
                <label className="mr-2 text-gray-700 font-medium">Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={qty[p._id] || 1}
                  onChange={(e) => handleQty(p._id, e.target.value)}
                  className="w-16 p-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 mt-auto">
                <button
                  onClick={() =>
                    API.post("/user/cart", {
                      productId: p._id,
                      quantity: qty[p._id] || 1
                    })
                      .then(() => alert("Added to cart"))
                      .catch(err => console.log(err))
                  }
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() =>
                    API.post("/user/wishlist", { productId: p._id })
                      .then(() => alert("Added to wishlist"))
                      .catch(err => console.log(err))
                  }
                  className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
