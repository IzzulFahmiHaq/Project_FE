import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_TOKO } from '../utils/BaseUrl'; // Correct API URL for your store

const AddDashboard = () => {
  const navigate = useNavigate(); // For navigation
  const [namaMakanan, setName] = useState(''); // State for dessert name
  const [price, setPrice] = useState(''); // State for price
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state for submit process
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [imageUrl, setImageUrl] = useState(''); // State to store the image URL after uploading

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    // Validation
    if (!namaMakanan || !price || isNaN(price) || parseFloat(price) <= 0) {
      setError('Nama dan harga kue harus diisi dengan harga yang valid!');
      return;
    }

    setLoading(true); // Set loading to true when submitting the form
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData')); // Retrieve admin data from localStorage
      const idAdmin = adminData ? adminData.id : null;

      if (!idAdmin) {
        setError('ID Admin tidak ditemukan. Silakan login kembali.');
        setLoading(false);
        return;
      }

      // Payload to send to the backend
      const newDessert = {
        namaMakanan: namaMakanan,
        harga: parseFloat(price),
        imageUrl: imageUrl,  // Include image URL
      };

      // Send POST request to API
      const response = await axios.post(
        `${API_TOKO}/tambah/${idAdmin}`,
        newDessert
      );

      // Redirect to the dashboard if successful
      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Gagal menambah kue. Silakan coba lagi.');
      }
    } catch (error) {
      setError('Terjadi kesalahan, gagal menambah kue. Silakan coba lagi.');
      console.error('Error:', error); // Log error for debugging
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Send the image to the backend for uploading
      axios.post(`${API_TOKO}/uploadFoto`, formData)
        .then((response) => {
          setImage(file);
          setImageUrl(response.data); // Store the image URL from the response
        })
        .catch((err) => {
          setError('Gagal mengunggah gambar. Silakan coba lagi.');
          console.error('Error:', err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-100 text-center mb-8">Tambah Kue Baru</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>} {/* Display error message if any */}

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
              onChange={(e) => setName(e.target.value)} // Update the dessert name
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
              onChange={(e) => setPrice(e.target.value)} // Update the price
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-lg font-semibold text-gray-100 mb-2"
            >
              Gambar Kue
            </label>
            <input
              type="file"
              id="image"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
              onChange={handleImageChange} // Handle image upload
            />
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500"
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Memuat...' : 'Tambah Kue'} {/* Display loading text if submitting */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDashboard;
