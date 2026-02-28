import { assignDistrict, getAuthorities } from "@/api/usersApi";
import { useEffect, useState } from "react";


const AssignDistrict = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [authorities, setAuthorities] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState(""); // will store _id
    const [districts, setDistricts] = useState("");

    // Fetch all authority users
    useEffect(() => {
        getAuthorities()
            .then(setAuthorities)
            .catch((err) => console.error(err));
    }, []);

    const handleAssign = async () => {
        if (!selectedUser || !districts) return alert("Select user and districts");

        const districtsArray = districts.split(",").map((d) => d.trim());

        try {
            await assignDistrict(selectedUser, districtsArray);
            alert("Districts assigned successfully");
            setDistricts("");
            setSelectedUser("");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err.response?.data?.message || "Error assigning districts");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
            <h2 className="text-xl font-bold mb-4">Assign Districts to Authority</h2>

            <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full border p-2 rounded mb-4"
            >
                <option value="">Select Authority</option>
                {authorities.map((auth) => (
                    <option key={auth._id} value={auth._id}>
                        {auth.fullName} ({auth.email})
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Enter districts, comma separated"
                value={districts}
                onChange={(e) => setDistricts(e.target.value)}
                className="w-full border p-2 rounded mb-4"
            />

            <button
                onClick={handleAssign}
                className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-500 transition"
            >
                Assign Districts
            </button>
        </div>
    );
};

export default AssignDistrict;