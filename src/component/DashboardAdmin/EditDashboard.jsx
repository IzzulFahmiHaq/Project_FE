import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_TOKO } from '../utils/BaseUrl';

const EditDashboard = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate(); // Hook untuk navigasi

  const [namaMakanan, setNamaMakanan] = useState(''); // State untuk nama makanan
  const [harga, setHarga] = useState(''); // State untuk harga
  const [error, setError] = useState(''); // State untuk error
  const [loading, setLoading] = useState(false); // State untuk status loading

  // Mengambil data kue berdasarkan ID
  useEffect(() => {
    const fetchDessertData = async () => {
      try {
        // Mengambil data kue dari API berdasarkan ID
        const response = await axios.get(`${API_TOKO}/getById/${id}`);
        setNamaMakanan(response.data.namaMakanan); // Mengisi state dengan nama makanan
        setHarga(response.data.harga); // Mengisi state dengan harga
      } catch (err) {
        setError('Gagal memuat data. Silakan coba lagi.'); // Menangani error jika gagal mengambil data
      }
    };

    fetchDessertData(); // Panggil fungsi untuk mengambil data kue
  }, [id]); // Hanya akan dipanggil ulang jika ID berubah

  // Menangani pengiriman form untuk edit data
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit

    // Validasi: Pastikan semua field terisi
    if (!namaMakanan || !harga) {
      setError('Semua field harus diisi!');
      return;
    }

    setLoading(true); // Set loading ke true sebelum mengirim request
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData')); // Ambil data admin dari localStorage
      const idAdmin = adminData ? adminData.id : null; // Ambil ID admin

      const updatedDessert = {
        namaMakanan, // Nama kue yang diperbarui
        harga: parseFloat(harga), // Harga yang diperbarui
      };

      // Mengirim request PUT untuk mengupdate data kue
      await axios.put(`${API_TOKO}/editByAdmin/${id}?idAdmin=${idAdmin}`, updatedDessert);

      navigate('/dashboard'); // Redirect ke dashboard setelah berhasil mengedit
    } catch (err) {
      setError('Gagal mengupdate data. Silakan coba lagi.'); // Menangani error jika gagal mengupdate data
    } finally {
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Edit Data Kue</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>} {/* Menampilkan error jika ada */}

        <form
          onSubmit={handleSubmit} // Mengirim form ketika disubmit
          className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {/* Input untuk Nama Kue */}
          <div className="mb-4">
            <label htmlFor="namaMakanan" className="block text-lg font-semibold mb-2">
              Nama Kue
            </label>
            <input
              type="text"
              id="namaMakanan"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              value={namaMakanan}
              onChange={(e) => setNamaMakanan(e.target.value)} // Update state ketika input berubah
            />
          </div>

          {/* Input untuk Harga */}
          <div className="mb-4">
            <label htmlFor="harga" className="block text-lg font-semibold mb-2">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              value={harga}
              onChange={(e) => setHarga(e.target.value)} // Update state ketika input berubah
            />
          </div>

          {/* Tombol untuk submit form */}
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500"
              disabled={loading} // Disable tombol saat loading
            >
              {loading ? 'Memproses...' : 'Simpan Perubahan'} {/* Ubah teks tombol saat loading */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDashboard;
