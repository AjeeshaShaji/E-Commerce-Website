import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmailPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();



const sendOtp = async () => {
  fetch("http://localhost:3000/api/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    navigate("/otp", { state: { email } });
  };

  return (
    <>
      <h2>Email</h2>
      <input onChange={e => setEmail(e.target.value)} />
      <button onClick={sendOtp}>Send OTP</button>
    </>
  );
}

export default EmailPage
