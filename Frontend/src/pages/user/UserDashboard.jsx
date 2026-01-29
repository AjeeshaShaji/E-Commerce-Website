import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

export default function UserDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userProfile"));

  return (
    <div className="min-h-screen flex">

      {/* LEFT SECTION – 40% */}
      <div className="w-[40%] bg-gray-100 p-6 flex flex-col items-center">

        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/120"
          alt="profile"
          onClick={() => navigate("/profile")}
          className="w-32 h-32 rounded-full cursor-pointer border-4 border-blue-500"
        />

        {/* User Details */}
        <div className="mt-6 text-center space-y-2">
          <p><b>Full Name:</b> {user?.fullName || "Not set"}</p>
          <p><b>Gender:</b> {user?.gender || "Not set"}</p>
          <p><b>Phone:</b> {user?.phone || "Not set"}</p>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/")}
          className="mt-auto bg-red-500 text-white px-6 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* RIGHT SECTION – 60% */}
      <div className="w-[60%] p-6">

        {/* Navbar */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => navigate("/orders")} className="btn">Orders</button>
          <button onClick={() => navigate("/favorites")} className="btn">Favorites</button>
          <button onClick={() => navigate("/cart")} className="btn">Cart</button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4,5,6].map(p => (
            <ProductCard key={p} />
          ))}
        </div>
      </div>

    </div>
  );
}
