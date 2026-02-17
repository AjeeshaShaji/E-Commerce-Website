import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    API.get("/user/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const calculateTotal = (items) => {
    return items.reduce(
      (acc, item) =>
        acc + (item.productId?.price || 0) * (item.quantity || 1),
      0
    );
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 🔥 Cancel order function
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await API.put(`/user/orders/${orderId}/cancel`); // your backend should handle this route
      alert("Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
          My Orders
        </h2>

        <span className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold shadow">
          Total Orders: {orders.length}
        </span>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* STATUS & DATE */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <span
                  className={`px-4 py-1 text-sm rounded-full font-semibold ${getStatusStyle(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
                <span className="text-gray-500 text-sm">
                  {o.createdAt
                    ? new Date(o.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>

              {/* ADDRESS */}
              <div className="text-gray-700 mb-4">
                <p>
                  <span className="font-semibold">Address:</span> {o.address}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {o.phone}
                </p>
              </div>

              {/* ITEMS */}
              <div className="border-t pt-3 mt-3">
                <p className="font-semibold mb-3 text-gray-800">Items:</p>

                {o.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.productId?.title || "Product"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        ₹{item.productId?.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-gray-700 font-semibold">
                      ₹{(item.productId?.price || 0) * (item.quantity || 1)}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL & CANCEL BUTTON */}
              <div className="flex justify-between items-center mt-5 pt-3 border-t flex-wrap gap-2">
                <span className="font-semibold text-gray-700 text-lg">
                  Total Amount:
                </span>
                <span className="text-green-600 font-bold text-xl">
                  ₹{o.totalAmount || calculateTotal(o.items || [])}
                </span>

                {/* Cancel button for pending orders */}
                {o.status?.toLowerCase() === "pending" && (
                  <button
                    onClick={() => cancelOrder(o._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
