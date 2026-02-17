import { useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignupDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    gender: "",
    username: "",
    password: ""
  });

  if (!email) {
    navigate("/email");
    return null;
  }

  const signup = async () => {
    try {
      await API.post("/signup", {
        email,
        ...form
      });

      alert("Signup successful");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-3">

        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Complete Signup
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        {/* Gender */}
        <select
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button */}
        <button
          onClick={signup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Signup
        </button>

      </div>

    </div>
  );
}
