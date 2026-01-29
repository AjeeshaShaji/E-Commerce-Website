import { BrowserRouter, Routes, Route } from "react-router-dom";

/* AUTH PAGES */
import EmailPage from "./components/EmailPage";
import OtpPage from "./components/otpPage";
import SignupDetails from "./components/SignupDetails";
import Login from "./components/login";

/* USER PAGES */
import UserDashboard from "./pages/user/userDashboard";
import UserProfile from "./pages/user/profile";
import Orders from "./pages/user/orders";
import Favorites from "./pages/user/favorites";
import Cart from "./pages/user/cart";

/* ADMIN PAGES */
import AdminLogin from "./components/adminlogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/addproduct";
import OrdersList from "./pages/admin/orderlist";
import ManageUsers from "./pages/admin/manageuser";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        {/* AUTH */}
        <Route path="/email" element={<EmailPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/signup-details" element={<SignupDetails />} />
        <Route path="/login" element={<Login />} />

        {/* USER */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/orders" element={<Orders />} />
        <Route path="/user/favorites" element={<Favorites />} />
        <Route path="/user/cart" element={<Cart />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/orders" element={<OrdersList />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>
    </BrowserRouter>
  );
}
