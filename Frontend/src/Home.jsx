import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">
          E-Commerce
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/email")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
        
        {/* Left */}
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Shop Smart, <br /> Shop Fast 🛍️
          </h2>

          <p className="mt-4 text-gray-600">
            Discover the best products at unbeatable prices. 
            Manage your orders, track shipments, and enjoy a seamless shopping experience.
          </p>

          <div className="mt-6 space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/email")}
              className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="mt-10 md:mt-0">
          <img
            src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
            alt="shopping"
            className="w-[400px]"
          />
        </div>

      </section>

      {/* Features */}
      <section className="px-10 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="p-6 shadow-md rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your products delivered quickly at your doorstep.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Enjoy competitive prices and amazing discounts.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Safe and secure payment options for all users.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>© 2026 E-Commerce. All rights reserved.</p>
      </footer>

    </div>
  );
}
