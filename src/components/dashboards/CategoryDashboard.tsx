 import { useEffect, useState } from "react";
import axios from "axios";

type Complaint = {
  id: string;
  category: string;
  date: string; // "YYYY-MM-DD"
  description?: string;
};

type CategoryCounts = {
  [key: string]: number;
};

export default function CategoryDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [startDate, setStartDate] = useState<string>("2026-03-01");
  const [endDate, setEndDate] = useState<string>("2026-03-03");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch complaints from API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Complaint[]>("/api/getComplaints"); // your API endpoint
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints by date range and count categories
  const getCategoryCountsByDateRange = (
    complaints: Complaint[],
    startDate: string,
    endDate: string
  ): CategoryCounts => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = complaints.filter(c => {
      const cDate = new Date(c.date);
      return cDate >= start && cDate <= end;
    });

    const counts: CategoryCounts = filtered.reduce((acc: CategoryCounts, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {});

    return counts;
  };

  const categoryCounts = getCategoryCountsByDateRange(complaints, startDate, endDate);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Complaints by Category</h2>

      {/* Date range inputs */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading complaints...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <div
              key={cat}
              className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center"
            >
              <span className="text-lg font-semibold text-gray-800">{cat}</span>
              <span className="text-2xl font-bold text-blue-600 mt-2">{count}</span>
            </div>
          ))}

          {Object.keys(categoryCounts).length === 0 && (
            <p className="text-gray-500 col-span-full text-center mt-4">
              No complaints in this date range.
            </p>
          )}
        </div>
      )}
    </div>
  );
}