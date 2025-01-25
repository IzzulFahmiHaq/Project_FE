import React, { useState } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import { BiSolidMoon, BiSolidSun } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

// Import gambar produk
import DessertOreo from "../../assets/kuee.jpg";
import DessertBoxRedVelvet from "../../assets/mags.jpg";
import Pudding from "../../assets/png/rotti.png";
import Coklat from "../../assets/Cokklat.jpg";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  const products = [
    {
      id: 1,
      name: "Cookies Coklat",
      description: "Cookies lembut dengan potongan coklat di setiap gigitannya.",
      price: 22000,
      image: DessertOreo,
      rating: 4,
    },
    {
      id: 2,
      name: "Red Velvet",
      description: "Kue red velvet yang lembut dengan lapisan krim keju.",
      price: 35000,
      image: DessertBoxRedVelvet,
      rating: 5,
    },
    {
      id: 3,
      name: "Puding Coklat",
      description: "Puding coklat lembut dengan topping krim segar.",
      price: 27000,
      image: Pudding,
      rating: 4,
    },
    {
      id: 4,
      name: "Cake Coklat",
      description: "Kue coklat yang lembut dan lezat untuk dinikmati kapan saja.",
      price: 7000,
      image: Coklat,
      rating: 3,
    },
  ];

  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin log out?");
    if (isConfirmed) {
      window.location.href = "/Register"; // Redirect to login or register page
    }
  };

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const renderStars = (rating) => (
    <div className="flex justify-center items-center gap-1 mt-2">
      {Array.from({ length: rating }, (_, index) => (
        <FaStar key={index} className="text-yellow-400 text-xl" />
      ))}
    </div>
  );

  return (
    <main className="bg-[#FFF8E1] pb-16">
      {/* Navbar */}
      <div className={`${
        darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-yellow-400 to-orange-500'
      } shadow-md fixed w-full top-0 left-0 z-50`}>
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="text-2xl font-serif font-extrabold tracking-wide text-white">
              Sweet Bakes
            </div>

            {/* Navigation Menu */}
            <ul className="flex gap-6 items-center">
              <li>
                <a
                  href="/"
                  className="text-white text-lg hover:text-yellow-300 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/banner"
                  className="text-white text-lg hover:text-yellow-300 transition duration-300"
                >
                  Produk
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white text-lg hover:text-yellow-300 transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="text-white text-lg hover:text-yellow-300 transition duration-300"
                >
                  {darkMode ? <BiSolidSun /> : <BiSolidMoon />}
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white text-lg hover:text-yellow-300 transition duration-300"
                >
                  <FiLogOut className="mr-2 text-xl" /> Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Konten Banner */}
      <div className="container mx-auto text-center pt-24">
        <h1 className="text-6xl font-serif font-bold text-orange-700 mb-6">
          Sweet Bakes Bakery
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Nikmati beragam sajian manis kami, dari kue hingga roti, semuanya dibuat dengan cinta.
        </p>

        {/* Bagian Pencarian */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <input
            type="text"
            placeholder="Cari roti atau kue favorit Anda..."
            className="py-3 px-6 text-lg rounded-full bg-white text-black border-gray-300 w-80 shadow-md"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={() => handleSearch({ target: { value: searchTerm } })}
            className="inline-flex items-center py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            <FaSearch className="text-xl mr-2" /> Cari
          </button>
        </div>

        {/* Menampilkan Produk */}
        {selectedProduct ? (
          <div className="flex justify-center gap-8">
            {/* Modal untuk Produk yang Dipilih */}
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg">
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

            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full">
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
                  Pesan
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
                className="bg-white shadow-xl rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">
                    {product.name}
                  </h3>
                  {renderStars(product.rating)}
                  <p className="text-sm text-gray-500 mt-4">{product.description}</p>
                  <p className="text-lg font-bold text-orange-600 mt-4">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-4 inline-block py-2 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition duration-300"
                  >
                    Lihat Detail
                  </button>
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
