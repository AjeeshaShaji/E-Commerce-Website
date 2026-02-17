import { useEffect, useState } from "react"; // ✅ FIXED
import API from "../../services/api";
import EditProduct from "./EditProduct";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();
  const [editProduct, setEditProduct] = useState(null); // now works

  useEffect(() => {
    API.get("/admin/dashboard");
  }, []);

  const navStyle =
    "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col justify-between shadow-xl">

        <div>
          <h2 className="text-2xl font-bold mb-10 text-indigo-400 tracking-wide">
            Admin Panel
          </h2>

          <nav className="space-y-3">
            <NavLink to="/admin/dashboard" end className={({ isActive }) =>
              `${navStyle} ${isActive
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }>
              Dashboard
            </NavLink>

            <NavLink to="/admin/dashboard/product" className={({ isActive }) =>
              `${navStyle} ${isActive
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }>
              Add Product
            </NavLink>

            <NavLink to="/admin/dashboard/products" className={({ isActive }) =>
              `${navStyle} ${isActive
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }>
              View Products
            </NavLink>

            <NavLink to="/admin/dashboard/users" className={({ isActive }) =>
              `${navStyle} ${isActive
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }>
              Manage Users
            </NavLink>

            <NavLink to="/admin/dashboard/orders" className={({ isActive }) =>
              `${navStyle} ${isActive
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }>
              Track Orders
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 transition duration-200 text-white py-2 rounded-xl font-semibold shadow-md"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        <div className="bg-white rounded-3xl shadow-md p-8 min-h-[80vh]">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default AdminDashboard;
