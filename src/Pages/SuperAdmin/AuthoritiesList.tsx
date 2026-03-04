import { useEffect, useState } from "react";
 
import type { Authority } from "@/types/authority";
import { getAuthorities } from "@/api/usersApi";
 

const AuthoritiesList = () => {
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const data = await getAuthorities(); // should return Authority[]
        setAuthorities(data);
      } catch (err) {
        console.error("Failed to fetch authorities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorities();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading authorities...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-700">Authorities</h2>

      {authorities.length === 0 ? (
        <p className="text-gray-500">No authorities found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-orange-300 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Main District</th>
                <th className="py-3 px-4 text-left">Assigned Districts</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {authorities.map((auth) => (
                <tr
                  key={auth._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{auth.fullName}</td>
                  <td className="py-2 px-4">{auth.email}</td>
                  <td className="py-2 px-4">{auth.phone}</td>
                  <td className="py-2 px-4">{auth.district}</td>
                  <td className="py-2 px-4">
                    {auth.assignedDistricts.join(", ")}
                  </td>
                  <td className="py-2 px-4">
                    {auth.suspended ? (
                      <span className="text-red-500 font-semibold">Suspended</span>
                    ) : (
                      <span className="text-green-500 font-semibold">Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuthoritiesList;