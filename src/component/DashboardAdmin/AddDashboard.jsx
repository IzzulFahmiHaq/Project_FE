import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_TOKO } from '../utils/BaseUrl'; // URL API untuk toko

const AddDashboard = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [namaMakanan, setName] = useState(''); // State untuk nama makanan
  const [price, setPrice] = useState(''); // State untuk harga
  const [error, setError] = useState(''); // State untuk pesan error
  const [loading, setLoading] = useState(false); // State untuk status loading

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form default action

    // Validasi input
    if (!namaMakanan || !price) {
      setError('Nama dan harga kue harus diisi!');
      return;
    }

    setLoading(true); // Set loading ke true ketika memulai proses pengiriman data
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData')); // Mengambil data admin dari localStorage
      const idAdmin = adminData ? adminData.id : null;

      if (!idAdmin) {
        setError('ID Admin tidak ditemukan. Silakan login kembali.');
        setLoading(false);
        return;
      }

      // Payload yang akan dikirim ke backend
      const newDessert = {
        namaMakanan: namaMakanan,
        harga: parseFloat(price),
      };

      // Mengirim request POST ke API untuk menambahkan kue baru
      const response = await axios.post(
        `${API_TOKO}/tambah/${idAdmin}`,
        newDessert
      );

      // Jika berhasil, redirect ke halaman dashboard
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      // Menangani error jika request gagal
      setError('Gagal menambah kue. Silakan coba lagi.');
    } finally {
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-100 text-center mb-8">Tambah Kue Baru</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>} {/* Menampilkan pesan error jika ada */}

        {/* Form untuk menambahkan kue */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-100 mb-2"
            >
              Nama Kue
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
              value={namaMakanan}
              onChange={(e) => setName(e.target.value)} // Mengupdate nama makanan
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-lg font-semibold text-gray-100 mb-2"
            >
              Harga
            </label>
            <input
              type="number"
              id="price"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
              value={price}
              onChange={(e) => setPrice(e.target.value)} // Mengupdate harga
            />
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500"
              disabled={loading} // Tombol dinonaktifkan saat loading
            >
              {loading ? 'Memuat...' : 'Tambah Kue'} {/* Teks tombol bergantung pada status loading */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDashboard;
