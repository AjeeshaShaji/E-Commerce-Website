import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/admin/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Users
        </h2>

        <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold">
          Total: {users.length}
        </span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full md:w-1/3 mb-6 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Loading */}
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredUsers.map(u => (
            <div
              key={u._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {u.name}
              </h3>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {u.email}
              </p>

              {u.phone && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Phone:</span> {u.phone}
                </p>
              )}

              {u.role && (
                <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full
                  ${u.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                  }`}>
                  {u.role}
                </span>
              )}

              {u.createdAt && (
                <p className="text-xs text-gray-400 mt-3">
                  Joined: {new Date(u.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
