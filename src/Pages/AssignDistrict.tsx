/* eslint-disable @typescript-eslint/no-explicit-any */
 import { assignDistrict, getAuthorities } from "@/api/usersApi";
import { useEffect, useRef, useState } from "react";
import { districts as districtList } from "../types/districts";
import AuthoritiesList from "./SuperAdmin/AuthoritiesList";

const AssignDistrict = () => {
  // authorities list
  const [authorities, setAuthorities] = useState<any[]>([]);

  // selected authority id
  const [selectedUser, setSelectedUser] = useState("");

  // selected districts
  const [districts, setDistricts] = useState<string[]>([]);

  // dropdown open/close
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // =============================
  // Fetch authorities
  // =============================
  useEffect(() => {
    getAuthorities()
      .then(setAuthorities)
      .catch(console.error);
  }, []);

  // =============================
  // Close dropdown when clicking outside
  // =============================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =============================
  // Toggle district selection
  // =============================
  const toggleDistrict = (district: string) => {
    setDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  };

  // =============================
  // Assign districts
  // =============================
  const handleAssign = async () => {
    if (!selectedUser || districts.length === 0) {
      return alert("Select user and districts");
    }

    try {
      await assignDistrict(selectedUser, districts);

      alert("Districts assigned successfully");

      setDistricts([]);
      setSelectedUser("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error assigning districts");
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow rounded mt-6">
      

     <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-700">
        Assign Districts to Authority
      </h2>
       {/* ================= Authority Dropdown ================= */}
      <label className="block font-medium mb-1">Select Authority</label>
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

      {/* ================= District Multi Dropdown ================= */}
      <div className="mb-4 relative" ref={dropdownRef}>
        <label className="block font-medium mb-1">
          Select Districts
        </label>

        {/* Dropdown button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border p-2 rounded cursor-pointer bg-white"
        >
          {districts.length > 0
            ? districts.join(", ")
            : "Select District(s)"}
        </div>

        {/* Dropdown list */}
        {isOpen && (
          <div className="absolute w-full border rounded bg-white mt-1 max-h-52 overflow-y-auto shadow z-10">
            {districtList.map((district) => (
              <label
                key={district}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={districts.includes(district)}
                  onChange={() => toggleDistrict(district)}
                />
                {district}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ================= Assign Button ================= */}
      <button
        onClick={handleAssign}
        className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-500 transition"
      >
        Assign Districts
      </button>
     </div>
      <div>
        <AuthoritiesList/>
      </div>
    </div>
  );
};

export default AssignDistrict;