import { useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  //  Safe email extraction
  const email = location.state?.email;

  //  If no email → redirect back
  if (!email) {
    navigate("/email");
    return null;
  }

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/verify-otp", {
        email,
        otp,
      });

      alert("OTP verified");

      // go to signup details page
      navigate("/signup-details", { state: { email } });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Enter OTP
        </h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded-lg mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </div>

    </div>
  );
}

export default OtpPage;
