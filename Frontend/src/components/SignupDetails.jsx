import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignupDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await axios.post("http://localhost:3000/api/auth/signup", {
      email: state.email,
      username,
      password
    });
    alert("Signup successful");
    navigate("/login");
  };

  return (
    <>
      <h2>Signup</h2>
      <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Signup</button>
    </>
  );
}
