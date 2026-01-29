import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

 const verifyOtp = async () => {
  try {
    await axios.post("http://localhost:3000/api/auth/verify-otp", {
      email: state.email,
      otp
    });

    navigate("/signup-details", { state });
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Invalid OTP or server error");
  }
};


  return (
    <>
      <h2>OTP</h2>
      <input onChange={e => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify</button>
    </>
  );
}
