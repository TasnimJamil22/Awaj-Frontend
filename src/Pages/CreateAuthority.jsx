import React, { useState } from "react";
import API from "../services/api";

const CreateAuthority = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/admin/create-authority", {
                fullName,
                email,
                password,
                phone,
                district,
                upazila,
            });
            alert("Authority user created!");
            setFullName(""); setEmail(""); setPassword(""); setPhone(""); setDistrict(""); setUpazila("");
        } catch (err) {
            alert(err.response?.data?.message || "Error creating authority");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Authority</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border p-3 rounded-lg" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-3 rounded-lg" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-3 rounded-lg" required />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-3 rounded-lg" />
                <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full border p-3 rounded-lg" />
                <input type="text" placeholder="Upazila" value={upazila} onChange={(e) => setUpazila(e.target.value)} className="w-full border p-3 rounded-lg" />
                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">Create Authority</button>
            </form>
        </div>
    );
};

export default CreateAuthority;