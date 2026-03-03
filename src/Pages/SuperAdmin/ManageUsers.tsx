/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllUsers, toggleSuspendUser } from "@/api/usersApi";
import ConfirmModal from "@/components/ConfirmModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  suspended: boolean;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data); // ✅ safe to call setState here
        console.log("this is users", data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetch(); // call the async function inside useEffect
  }, []); // empty dependency → runs once


  const handleSuspendClick = (id: string) => {
    setSelectedUserId(id);
    setModalOpen(true); // open modal
  };

  const confirmSuspend = async () => {
    if (!selectedUserId) return;
    try {
      await toggleSuspendUser(selectedUserId);
      fetchUsers();

    } catch (err) {
      console.error("Failed to suspend user", err);
    } finally {
      setModalOpen(false);
      setSelectedUserId(null);
    }
  };

  // const handleSuspend = async (id: string) => {
  //   await toggleSuspendUser(id);
  //   fetchUsers(); // refresh user list
  // };

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



                {/* Modal */}
                {/* <ConfirmModal
                  isOpen={modalOpen}
                  message={user && user?.suspended === false ? "Are you sure you want to suspend this user?" : "Confirm unsuspend?"}
                  onConfirm={confirmSuspend}
                  onCancel={() => setModalOpen(false)}
                /> */}
                <ConfirmModal
                  isOpen={modalOpen}
                  message={
                    selectedUser?.suspended
                      ? `Are you sure you want to unsuspend?`
                      : `Are you sure you want to suspend ?`
                  }
                  onConfirm={async () => {
                    if (!selectedUser) return;

                    // Call API to toggle suspend
                    await toggleSuspendUser(selectedUser._id);

                    // Optionally update local state
                    fetchUsers();

                    setModalOpen(false);
                    setSelectedUser(null);
                  }}
                  onCancel={() => {
                    setModalOpen(false);
                    setSelectedUser(null);
                  }}
                />

                {/* <button
                  onClick={() => handleSuspendClick(user._id)}
                  className={`px-3 py-1 rounded text-white ${
                    user.suspended ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {user.suspended ? "Unsuspend" : "Suspend"}
                </button> */}
                <button
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user); // store the user in state
                    setModalOpen(true);    // open modal
                  }}
                  className={`px-4 py-2 rounded font-semibold ${user.suspended
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-red-500 text-white hover:bg-red-600"
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