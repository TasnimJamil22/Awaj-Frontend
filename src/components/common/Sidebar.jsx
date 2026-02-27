// Sidebar.jsx
const Sidebar = ({ user }) => {
  const menu = {
    citizen: ["Submit Complaint", "My Complaints", "Profile"],
    authority: ["Assigned Complaints", "Reports"],
    superadmin: ["Users", "Roles", "Statistics", "Logs"],
  };
  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        {menu[user.role].map((item) => (
          <li key={item} className="mb-2">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

