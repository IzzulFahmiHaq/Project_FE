import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import gambar produk
import DessertOreo from "../../assets/kuee.jpg";
import DessertBoxRedVelvet from "../../assets/mags.jpg";
import Pudding from "../../assets/png/rotti.png";
import Coklat from "../../assets/Cokklat.jpg";

const EditDessert = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Daftar produk awal
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Chocolate Chip Cook",
      description: "Deliciously soft and chewy cookies with chocolate chips.",
      price: 22000,
      image: DessertOreo,
      rating: 4,
    },
    {
      id: 2,
      name: "Red Velvet",
      description: "Rich and moist red velvet cake with cream cheese frosting.",
      price: 35000,
      image: DessertBoxRedVelvet,
      rating: 5,
    },
    {
      id: 3,
      name: "Chocolate",
      description: "Smooth and creamy chocolate pudding topped with whipped cream.",
      price: 27000,
      image: Pudding,
      rating: 4,
    },
    {
      id: 4,
      name: "Choco cake",
      description: "Refreshing iced lemon tea to complement your dessert.",
      price: 7000,
      image: Coklat,
      rating: 3,
    },
  ]);

  // State untuk form data
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    rating: "",
  });

  // Mengambil produk berdasarkan ID
  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        rating: product.rating,
      });
    } else {
      navigate("/");
    }
  }, [id, products, navigate]);

  // Fungsi untuk menangani input perubahan
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk menyimpan perubahan
  const handleSave = () => {
    const updatedProducts = products.map((product) =>
      product.id === parseInt(id) ? { ...product, ...formData } : product
    );
    setProducts(updatedProducts);
    console.log("Updated Product Data:", formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 dark:text-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold text-center mb-6">Edit Produk</h3>

        {/* Input untuk nama produk */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nama Produk"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />

        {/* Input untuk deskripsi produk */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Deskripsi Produk"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />

        {/* Input untuk harga produk */}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Harga Produk"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />

        {/* Input untuk rating produk */}
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          placeholder="Rating Produk"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          min="1"
          max="5"
        />

        {/* Tombol Aksi */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark"
          >
            Simpan
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-400 ml-4"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDessert;
