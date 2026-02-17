import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send OTP");
        return;
      }

      alert("OTP sent successfully");

      // go to otp page with email
      navigate("/otp", { state: { email } });

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Enter Email
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOtp}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

      </div>

    </div>
  );
}

export default EmailPage;
