import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_TOKO } from '../utils/BaseUrl';

const EditDashboard = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate(); // Hook for navigation

  const [namaMakanan, setNamaMakanan] = useState(''); // State for dessert name
  const [harga, setHarga] = useState(''); // State for price
  const [imageUrl, setImageUrl] = useState(''); // State for image URL
  const [image, setImage] = useState(null); // State for image file
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch dessert data based on ID
  useEffect(() => {
    const fetchDessertData = async () => {
      try {
        const response = await axios.get(`${API_TOKO}/getById/${id}`);
        setNamaMakanan(response.data.namaMakanan); // Fill state with dessert name
        setHarga(response.data.harga); // Fill state with price
        setImageUrl(response.data.imageUrl); // Fill state with image URL
      } catch (err) {
        setError('Gagal memuat data. Silakan coba lagi.');
      }
    };

    fetchDessertData();
  }, [id]);

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Validation: Ensure all fields are filled
    if (!namaMakanan || !harga) {
      setError('Semua field harus diisi!');
      return;
    }

    setLoading(true); // Set loading to true before sending request
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData')); // Get admin data from localStorage
      const idAdmin = adminData ? adminData.id : null; // Get admin ID

      const updatedDessert = {
        namaMakanan,
        harga: parseFloat(harga),
        imageUrl: imageUrl, // Include the image URL for the dessert
      };

      // Send PUT request to update dessert data
      await axios.put(`${API_TOKO}/editByAdmin/${id}?idAdmin=${idAdmin}`, updatedDessert);

      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (err) {
      setError('Gagal mengupdate data. Silakan coba lagi.');
    } finally {
      setLoading(false); // Set loading to false after process is complete
    }
  };

  // Handle image upload
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
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Edit Data Kue</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>} {/* Display error if any */}

        <form
          onSubmit={handleSubmit} // Handle form submission
          className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {/* Input for dessert name */}
          <div className="mb-4">
            <label htmlFor="namaMakanan" className="block text-lg font-semibold mb-2">
              Nama Kue
            </label>
            <input
              type="text"
              id="namaMakanan"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              value={namaMakanan}
              onChange={(e) => setNamaMakanan(e.target.value)} // Update state when input changes
            />
          </div>

          {/* Input for price */}
          <div className="mb-4">
            <label htmlFor="harga" className="block text-lg font-semibold mb-2">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              value={harga}
              onChange={(e) => setHarga(e.target.value)} // Update state when input changes
            />
          </div>

          {/* Input for image upload */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-lg font-semibold mb-2"
            >
              Gambar Kue
            </label>
            <input
              type="file"
              id="image"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              onChange={handleImageChange} // Handle image file change
            />
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Dessert"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Buttons for submitting and canceling */}
          <div className="mb-4 flex justify-between">
            {/* Cancel button on the left */}
            <button
              type="button"
              className="bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-500"
              onClick={() => navigate('/dashboard')} // Navigate back to dashboard
            >
              Batal
            </button>

            {/* Submit button on the right */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500"
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Memproses...' : 'Simpan'} {/* Changed to 'Simpan' */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDashboard;
