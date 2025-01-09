import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../Navbarkhusus';
import { API_TOKO } from '../utils/BaseUrl';

const AdminDashboard = () => {
  const adminData = JSON.parse(localStorage.getItem('adminData')) || {};
  const idAdmin = adminData.id || null;
  const navigate = useNavigate();

  const [dessertData, setDessertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchDessertData = async () => {
      if (!idAdmin) {
        setError('ID Admin tidak ditemukan. Silakan login kembali.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_TOKO}/admin/toko/delete/${idAdmin}`);
        setDessertData(response.data);
      } catch (err) {
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchDessertData();
  }, [idAdmin]);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      setDeleting(true);
      await axios.delete(`${API_TOKO}/admin/toko/delete/${id}`);
      setDessertData(dessertData.filter((item) => item.id !== id));
    } catch (err) {
      setError('Gagal menghapus data. Silakan coba lagi.');
    } finally {
      setDeleting(false);
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/EditDashboard/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
          Dashboard Admin
        </h1>

        {loading && <p className="text-center text-gray-400">Memuat data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && dessertData.length === 0 && (
          <p className="text-center text-gray-400">Data tidak ditemukan.</p>
        )}

        {!loading && !error && dessertData.length > 0 && (
          <>
            <div className="mb-6 text-center">
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
                    <th className="py-3 px-4 text-left">Nama Kue</th>
                    <th className="py-3 px-4 text-left">Harga</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dessertData.map((dessert) => (
                    <tr key={dessert.id} className="border-b border-gray-700">
                      <td className="py-3 px-4">{dessert.namaMakanan || 'N/A'}</td>
                      <td className="py-3 px-4">
                        Rp {(dessert.harga || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleEdit(dessert.id)}
                          className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dessert.id)}
                          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                          disabled={deleting}
                        >
                          {deleting ? 'Menghapus...' : 'Hapus'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;