import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDessert = () => {
  // Mengambil ID dari parameter URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Data kue yang sudah ditentukan sebelumnya (mock data)
  const [dessertData, setDessertData] = useState([
    { id: 1, name: 'Kue Pernikahan', price: 250000, sold: 150, rating: 4.5 },
    { id: 2, name: 'Kue Ulang Tahun', price: 150000, sold: 200, rating: 4.0 },
    { id: 3, name: 'Kue Kasih Sayang', price: 180000, sold: 120, rating: 4.7 },
    { id: 4, name: 'Kue Romantis', price: 220000, sold: 180, rating: 4.3 },
  ]);

  // State untuk menyimpan data form (kue yang sedang diedit)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    sold: '',
    rating: '',
  });

  // Mengambil data kue berdasarkan ID dari URL dan mengisi form
  useEffect(() => {
    // Mencari kue berdasarkan ID
    const dessert = dessertData.find(d => d.id === parseInt(id));
    if (dessert) {
      // Jika kue ditemukan, set formData dengan data kue tersebut
      setFormData({
        id: dessert.id,
        name: dessert.name,
        price: dessert.price,
        sold: dessert.sold,
        rating: dessert.rating,
      });
    } else {
      // Jika kue tidak ditemukan, redirect ke halaman utama
      navigate('/');
    }
  }, [id, dessertData, navigate]);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update nilai berdasarkan nama input
    }));
  };

  // Fungsi untuk menyimpan data yang telah diedit
  const handleSave = () => {
    // Simulasi penyimpanan data (misalnya API call)
    console.log('Updated Dessert Data:', formData);
    navigate('/');  // Setelah simpan, redirect ke halaman utama
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 dark:text-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold text-center mb-6">Edit Dessert</h3>

        {/* Input untuk nama kue */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nama Kue"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        
        {/* Input untuk harga kue */}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Harga"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        
        {/* Input untuk jumlah kue yang terjual */}
        <input
          type="number"
          name="sold"
          value={formData.sold}
          onChange={handleInputChange}
          placeholder="Terjual"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        
        {/* Input untuk rating kue */}
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          placeholder="Rating"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />

        {/* Tombol untuk menyimpan perubahan dan membatalkan */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark"
          >
            Save
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-400 ml-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDessert;
