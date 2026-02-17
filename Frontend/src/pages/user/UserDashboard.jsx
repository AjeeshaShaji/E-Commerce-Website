import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-md p-5 min-h-[80vh]">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
