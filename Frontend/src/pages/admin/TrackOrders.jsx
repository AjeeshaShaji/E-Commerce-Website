import { useEffect, useState } from "react";
import API from "../../services/api";

export default function TrackOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    API.get("/admin/orders")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateStatus = async (id, status) => {
    await API.put(`/admin/order/${id}`, { status });
    fetchOrders();
  };

  const getStatusStyle = (status) => {
    switch (status) {
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

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Orders
        </h2>

        <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold">
          Total: {orders.length}
        </span>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : (

        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="min-w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {orders.map(o => (
                <tr key={o._id} className="border-b hover:bg-gray-50">

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {o.userId?.name || "User"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-indigo-600">
                    ₹{o.totalAmount}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(o.status)}`}>
                      {o.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      className="border border-gray-300 rounded-lg p-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

      )}

    </div>
  );
}
