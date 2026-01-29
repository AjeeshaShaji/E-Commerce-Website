import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    gender: "",
    phone: ""
  });

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    navigate("/user-dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 shadow w-96 space-y-4">

        <input
          placeholder="Full Name"
          className="input"
          onChange={e => setProfile({...profile, fullName: e.target.value})}
        />

        <input
          placeholder="Gender"
          className="input"
          onChange={e => setProfile({...profile, gender: e.target.value})}
        />

        <input
          placeholder="Phone"
          className="input"
          onChange={e => setProfile({...profile, phone: e.target.value})}
        />

        <button onClick={saveProfile} className="btn w-full">
          Save Profile
        </button>

      </div>
    </div>
  );
}
