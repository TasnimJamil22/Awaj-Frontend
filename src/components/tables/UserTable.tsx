interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => (
  <table className="min-w-full bg-white border">
    <thead className="bg-gray-200">
      <tr>
        <th className="py-2 px-4 border">Name</th>
        <th className="py-2 px-4 border">Email</th>
        <th className="py-2 px-4 border">Role</th>
        <th className="py-2 px-4 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(u => (
        <tr key={u.id}>
          <td className="py-2 px-4 border">{u.name}</td>
          <td className="py-2 px-4 border">{u.email}</td>
          <td className="py-2 px-4 border">{u.role}</td>
          <td className="py-2 px-4 border space-x-2">
            <button className="bg-blue-500 text-white px-2" onClick={() => onEdit(u.id)}>Edit</button>
            <button className="bg-red-500 text-white px-2" onClick={() => onDelete(u.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;