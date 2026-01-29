import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">

      {/* LEFT – 40% */}
      <div className="w-[40%] bg-gray-100 p-6 flex flex-col gap-4">

        <button onClick={() => navigate("/admin/add-product")} className="btn">
          Add Product
        </button>

        <button onClick={() => navigate("/admin/orders")} className="btn">
          Track Orders
        </button>

        <button onClick={() => navigate("/admin/users")} className="btn">
          Manage Users
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-auto bg-red-500 text-white py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* RIGHT – 60% */}
      <div className="w-[60%] p-6 grid grid-cols-2 gap-4">

        <div className="card">Products Overview</div>
        <div className="card">Users Overview</div>
        <div className="card">Orders Overview</div>

      </div>
    </div>
  );
}
