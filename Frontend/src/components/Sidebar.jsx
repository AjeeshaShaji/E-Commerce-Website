import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ width: 200, background: "#111", color: "white", height: "100vh" }}>
      <h3>User</h3>

      <Link to="/user">Products</Link><br />
      <Link to="/user/cart">Cart</Link><br />
      <Link to="/user/wishlist">Wishlist</Link><br />
      <Link to="/user/orders">Orders</Link><br />
      <Link to="/user/profile">Profile</Link><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}
