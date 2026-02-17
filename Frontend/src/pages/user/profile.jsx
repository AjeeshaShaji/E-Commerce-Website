import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Profile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    API.get("/user/profile")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const update = async () => {
    try {
      await API.put("/user/profile", user);
      alert("Profile Updated");
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50  p-6 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Profile
        </h2>

        {/* VIEW MODE */}
        {!editMode && (
          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-700">Name:</span>{" "}
              {user.fullname}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Username:</span>{" "}
              {user.username}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Phone:</span>{" "}
              {user.phone}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Gender:</span>{" "}
              {user.gender}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* EDIT MODE */}
        {editMode && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={user.fullname || ""}
              onChange={(e) =>
                setUser({ ...user, fullname: e.target.value })
              }
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Username"
              value={user.username || ""}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Phone"
              value={user.phone || ""}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={user.gender || ""}
              onChange={(e) =>
                setUser({ ...user, gender: e.target.value })
              }
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <div className="flex gap-3 mt-4">
              <button
                onClick={update}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Update
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
