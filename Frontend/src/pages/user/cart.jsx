import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const loadCart = () => {
    API.get("/user/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = (id) => {
    API.delete(`/user/cart/${id}`).then(() => loadCart());
  };

  const handlePlaceOrderClick = () => setShowForm(true);

  const confirmOrder = () => {
    if (!address || !phone) return alert("Please fill all details");

    API.post("/user/order", { address, phone })
      .then(() => {
        alert("Order placed successfully");
        setShowForm(false);
        setAddress("");
        setPhone("");
        loadCart();
      })
      .catch((err) => console.log(err));
  };

  const calculateTotal = () =>
    cart.reduce(
      (acc, item) => acc + (item.productId?.price || 0),
      0
    );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        My Cart
      </h1>

      {/* CART ITEMS */}
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-4 flex justify-between items-center hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.productId?.title}
                </h2>
                <p className="text-gray-700 font-medium">
                  ₹{item.productId?.price}
                </p>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL AMOUNT */}
          <div className="flex justify-between items-center bg-white rounded-2xl shadow-lg p-4 mt-4">
            <span className="text-lg font-semibold text-gray-800">
              Total:
            </span>
            <span className="text-xl font-bold text-green-600">
              ₹{calculateTotal()}
            </span>
          </div>

          {/* PLACE ORDER BUTTON */}
          {!showForm && (
            <div className="text-center mt-6">
              <button
                onClick={handlePlaceOrderClick}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Place Order
              </button>
            </div>
          )}

          {/* DELIVERY FORM */}
          {showForm && (
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Delivery Details
              </h2>
              <input
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={confirmOrder}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
