import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Products Overview",
      path: "/admin/dashboard/products",
      description: "View total products, categories & list",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Users Overview",
      path: "/admin/dashboard/users",
      description: "View total registered users",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Orders Overview",
      path: "/admin/dashboard/orders",
      description: "View total, shipped & delivered orders",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h2>

      <p className="text-gray-500 mt-2">
        Welcome back! Here’s a quick overview of your system.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-lg cursor-pointer transform hover:-translate-y-2 hover:scale-105 transition duration-300`}
          >
            <h3 className="text-xl font-semibold mb-3">
              {card.title}
            </h3>

            <p className="text-sm opacity-90">
              {card.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
