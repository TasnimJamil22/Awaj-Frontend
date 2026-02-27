// Header.jsx
const Header = ({ user }) => (
  <div className="bg-gray-100 p-4 flex justify-between">
    <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
    <span>Role: {user.role}</span>
  </div>
);

export default Header;