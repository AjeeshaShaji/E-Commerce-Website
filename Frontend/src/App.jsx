import { BrowserRouter, Routes, Route } from "react-router-dom";

/* AUTH */
import EmailPage from "./components/EmailPage";
import OtpPage from "./components/otpPage";
import SignupDetails from "./components/SignupDetails";
import Login from "./components/login";
import Home from "./Home";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import ManageUsers from "./pages/admin/ManageUser";
import TrackOrders from "./pages/admin/TrackOrders";
import ViewProducts from "./pages/admin/ViewProduct";
import Dashboard from "./pages/admin/Dashboard";
import EditProduct from "./pages/admin/EditProduct";

/* USER */
import UserDashboard from "./pages/user/UserDashboard";
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/email" element={<EmailPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/signup-details" element={<SignupDetails />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="products" element={<ViewProducts />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="orders" element={<TrackOrders />} />
        </Route>

        
        {/* USER */}
        <Route  path="/user" element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }>
          <Route index element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>




      </Routes>
    </BrowserRouter>
  );
}
