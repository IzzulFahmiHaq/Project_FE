import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ADMIN } from "../utils/BaseUrl"; // Ensure the correct import path for API_ADMIN

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    try {
      // Sending a POST request to register
      const response = await axios.post(`${API_ADMIN}/register`, {
        name,
        email,
        password,
      });

      // Show success alert
      alert("Registrasi berhasil! Silakan login.");
      navigate("/akunlogin"); // Navigate to login page after successful registration
    } catch (error) {
      // Default error message if no custom message is received
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan."; 
      alert(`Gagal registrasi: ${errorMessage}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      {/* Registration form */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Register</h2>
        <form onSubmit={handleRegister}>
          {/* Name input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Register button */}
          <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
>
  Register
</button>

        </form>

        {/* Link to login page */}
        <p className="mt-4 text-center text-gray-400">
          Sudah punya akun?{" "}
          <button
            className="text-blue-400 underline"
            onClick={() => navigate("/akunlogin")} // Navigate to login page
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
