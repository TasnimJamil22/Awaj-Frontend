import { getAllUsers, toggleSuspendUser } from "@/api/usersApi";
import { useEffect, useState } from "react";
 

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  suspended: boolean;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data); // ✅ safe to call setState here
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetch(); // call the async function inside useEffect
  }, []); // empty dependency → runs once

  const handleSuspend = async (id: string) => {
    await toggleSuspendUser(id);
    fetchUsers(); // refresh user list
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-3">{user.fullName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.suspended ? "Suspended" : "Active"}</td>
              <td className="p-3">
                <button
                  onClick={() => handleSuspend(user._id)}
                  className={`px-3 py-1 rounded text-white ${
                    user.suspended ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {user.suspended ? "Unsuspend" : "Suspend"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;