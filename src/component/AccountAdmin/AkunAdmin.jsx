import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_ADMIN } from "../utils/BaseUrl"; // Pastikan API_ADMIN sesuai

const LoginAdmin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
  
    try {
      const response = await axios.post(`${API_ADMIN}/login`, { email, password });
      if (response.data?.token && response.data?.data) {
        const { token, data } = response.data;
  
        localStorage.setItem("authToken", token);
        localStorage.setItem("adminData", JSON.stringify(data));
  
        Swal.fire({
          icon: "success",
          title: "Login berhasil!",
          text: "Anda akan diarahkan ke Dashboard.",
          timer: 1500,
        });
  
        navigate("/dashboard");
      } else {
        throw new Error("Data tidak valid dari server.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan. Mohon coba lagi.",
        timer: 1500,
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login Admin</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Belum punya akun?{" "}
          <button
            className="text-blue-400 underline"
            onClick={() => navigate("/register")}
          >
            Daftar
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
