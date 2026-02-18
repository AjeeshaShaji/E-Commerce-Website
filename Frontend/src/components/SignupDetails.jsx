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

  const [error, setError] = useState({
    phone: "",
    fullname: "",
    gender: "",
    username: "",
    password: ""
  });

  if (!email) {
    navigate("/email");
    return null;
  }

  // Validation functions
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateNotEmpty = (value) => value.trim() !== "";

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    // Real-time validation
    switch (field) {
      case "phone":
        setError({
          ...error,
          phone: validatePhone(value)
            ? ""
            : "Phone must be 10 digits only"
        });
        break;
      case "fullname":
      case "username":
      case "password":
        setError({
          ...error,
          [field]: validateNotEmpty(value) ? "" : `${field} is required`
        });
        break;
      case "gender":
        setError({
          ...error,
          gender: value ? "" : "Please select gender"
        });
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (
      validateNotEmpty(form.fullname) &&
      validatePhone(form.phone) &&
      form.gender &&
      validateNotEmpty(form.username) &&
      validateNotEmpty(form.password)
    );
  };

  const signup = async () => {
    if (!isFormValid()) {
      alert("Please fill all fields correctly before signing up");
      return;
    }

    try {
      await API.post("/signup", { email, ...form });
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
          value={form.fullname}
          onChange={(e) => handleChange("fullname", e.target.value)}
        />
        {error.fullname && (
          <p className="text-red-500 text-sm">{error.fullname}</p>
        )}

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          maxLength={10}
          className="w-full p-2 border rounded"
          value={form.phone}
          onChange={(e) =>
            handleChange("phone", e.target.value.replace(/\D/, ""))
          }
        />
        {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}

        {/* Gender */}
        <select
          className="w-full p-2 border rounded"
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {error.gender && <p className="text-red-500 text-sm">{error.gender}</p>}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        {error.username && (
          <p className="text-red-500 text-sm">{error.username}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {error.password && (
          <p className="text-red-500 text-sm">{error.password}</p>
        )}

        {/* Signup Button */}
        <button
          onClick={signup}
          disabled={!isFormValid()}
          className={`w-full py-2 rounded-lg text-white transition ${
            isFormValid()
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
