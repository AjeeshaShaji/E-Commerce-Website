import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ username:"", password:"" });

  const login = () => {
    if (cred.username === "Admin" && cred.password === "Admin12") {
      navigate("/admin-dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 shadow w-96 space-y-4">

        <input
          placeholder="Username"
          className="input"
          onChange={e => setCred({...cred, username:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={e => setCred({...cred, password:e.target.value})}
        />

        <button onClick={login} className="btn w-full">Login</button>

      </div>
    </div>
  );
}
