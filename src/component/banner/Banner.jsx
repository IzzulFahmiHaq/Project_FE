import React, { useState } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';

// Import gambar produk
import DessertOreo from "../../assets/kuee.jpg";
import DessertBoxRedVelvet from "../../assets/mags.jpg";
import Pudding from "../../assets/png/rotti.png";
import Coklat from "../../assets/Cokklat.jpg";

const Banner = () => {
  // State untuk menyimpan data pencarian, produk yang dipilih, jumlah, dan metode pembayaran
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');

  // Daftar produk yang tersedia
  const products = [
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
  ];

  // Fungsi untuk menangani input pencarian
  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
  };

  // Fungsi untuk menampilkan bintang rating produk
  const renderStars = (rating) => (
    <div className="flex justify-center items-center gap-1 mt-2">
      {Array.from({ length: rating }, (_, index) => (
        <FaStar key={index} className="text-yellow-400 text-xl" />
      ))}
    </div>
  );

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl font-serif font-bold text-orange-700 mb-6">
          Sweet Bakes Bakery
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Indulge in our freshly baked treats, from pastries to cakes, all made with love.
        </p>

        {/* Bagian Pencarian */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <input
            type="text"
            placeholder="Cari roti yang Anda inginkan..."
            className="py-3 px-6 text-lg rounded-full bg-white text-black border-gray-300 w-80 shadow-md"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={() => handleSearch({ target: { value: searchTerm } })}
            className="inline-flex items-center py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-500 rounded-full hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            <FaSearch className="text-xl mr-2" /> Cari
          </button>
        </div>

        {/* Menampilkan Produk */}
        {selectedProduct ? (
          <div className="flex justify-center gap-8">
            {/* Modal untuk Produk yang Dipilih */}
            <div className="bg-gray-100 shadow-lg rounded-2xl p-8 max-w-lg">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-serif font-semibold text-gray-800">
                {selectedProduct.name}
              </h3>
              {renderStars(selectedProduct.rating)}
              <p className="text-sm text-gray-500 mt-4">{selectedProduct.description}</p>
              <p className="text-lg font-bold text-orange-600 mt-4">
                Rp {selectedProduct.price.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-100 shadow-xl rounded-2xl p-8 max-w-sm w-full">
              {/* Input Jumlah */}
              <div className="text-left mb-4">
                <label className="block text-left text-gray-700 mb-2">Jumlah</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="py-2 px-4 text-lg rounded-full border-gray-300 w-full mb-4"
                  min="1"
                />
              </div>

              {/* Pilihan Metode Pembayaran */}
              <div className="text-left mb-4">
                <label className="block text-left text-gray-700 mb-2">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="py-2 px-4 text-lg rounded-full border-gray-300 w-full"
                >
                  <option value="bankTransfer">Transfer Bank</option>
                  <option value="ewallet">E-Wallet</option>
                  <option value="creditCard">Kartu Kredit</option>
                </select>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="py-2 px-4 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 hover:shadow-md transition duration-300"
                >
                  Kembali
                </button>
                <button
                  className="py-2 px-6 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full hover:shadow-lg hover:scale-105 transition duration-300"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(searchTerm === '' ? products : products.filter(product =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()))).map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 shadow-xl rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-serif font-semibold text-gray-800">{product.name}</h3>
                  {renderStars(product.rating)}
                  <p className="text-sm text-gray-500 mt-4">{product.description}</p>
                  <p className="text-lg font-bold text-orange-600 mt-4">Rp {product.price.toLocaleString()}</p>
                  <div className="mt-4 flex justify-between gap-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="py-2 px-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full hover:shadow-lg transition duration-300 w-full"
                    >
                      Lihat Produk
                    </button>
                    <button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 w-full">
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Banner;
