import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../Navbarkhusus";
import { API_TOKO } from "../utils/BaseUrl"; // Pastikan URL API_TOKO sudah benar
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const adminData = JSON.parse(localStorage.getItem("adminData")) || {};
  const idAdmin = adminData.id;
  const navigate = useNavigate();

  const [dessertData, setDessertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Ambil data kue
  useEffect(() => {
    const fetchDessertData = async () => {
      if (!idAdmin) {
        Swal.fire({
          icon: "error",
          title: "Akses Ditolak",
          text: "ID Admin tidak ditemukan. Silakan login kembali.",
        });
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_TOKO}/getAllByAdmin/${idAdmin}`);
        setDessertData(response.data);
      } catch (err) {
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDessertData();
  }, [idAdmin, navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      setDeleting(true);
      await axios.delete(`${API_TOKO}/delete/${id}`);
      setDessertData(dessertData.filter((item) => item.id !== id));
      Swal.fire("Berhasil", "Data berhasil dihapus.", "success");
    } catch (err) {
      Swal.fire("Gagal", "Gagal menghapus data. Silakan coba lagi.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditDashboard/${id}`);
  };

  // Handle loading or error state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-gray-100">
        <p>Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-100 mb-4">Dashboard Admin</h1>
          <p className="text-lg text-gray-300">Pengelolaan data roti untuk toko bakery anda!</p>
          <div className="mt-4 w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="mb-6 text-left">
          <Link to="/AddDashboard">
            <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Tambah Kue Baru
            </button>
          </Link>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Gambar</th>
                <th className="py-3 px-4 text-left">Nama Kue</th>
                <th className="py-3 px-4 text-left">Harga</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dessertData.map((dessert) => (
                <tr key={dessert.id} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-center">
                    <img
                      src={dessert.imageUrl ? dessert.imageUrl : "/default-image.jpg"} // Pastikan URL valid
                      alt={dessert.namaMakanan}
                      className="w-16 h-16 object-cover rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-3 px-4">{dessert.namaMakanan || "N/A"}</td>
                  <td className="py-3 px-4">Rp {(dessert.harga || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleEdit(dessert.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dessert.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 ml-2"
                      disabled={deleting}
                    >
                      {deleting ? "Menghapus..." : "Hapus"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
