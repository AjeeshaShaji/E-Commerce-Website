import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  const loadWishlist = () => {
    API.get("/user/wishlist")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const remove = async (id) => {
    await API.delete(`/user/wishlist/${id}`);
    loadWishlist();
  };

  const addToCart = async (productId) => {
    try {
      await API.post("/user/cart", { productId });
      alert("Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        My Wishlist
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <div
              key={i._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* PRODUCT INFO */}
              <div>

                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                  {i.title}
                </h3>
                <p className="text-gray-900 font-bold text-xl">₹{i.price}</p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => addToCart(i._id)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => remove(i._id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
