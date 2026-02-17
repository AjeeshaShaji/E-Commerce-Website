import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-400 border-b-2 border-indigo-400"
      : "text-gray-300 hover:text-white";

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-indigo-400 tracking-wide cursor-pointer">
         E-Commerce
        </h1>

        {/* Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">

          <Link to="/user" className={`${isActive("/user")} pb-1`}>
            Products
          </Link>

          <Link to="/user/cart" className={`${isActive("/user/cart")} pb-1`}>
            Cart
          </Link>

          <Link to="/user/wishlist" className={`${isActive("/user/wishlist")} pb-1`}>
            Wishlist
          </Link>

          <Link to="/user/orders" className={`${isActive("/user/orders")} pb-1`}>
            Orders
          </Link>

          <Link to="/user/profile" className={`${isActive("/user/profile")} pb-1`}>
            Profile
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm transition duration-200"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}
