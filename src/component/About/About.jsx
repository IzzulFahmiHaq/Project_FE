import React from 'react';
import bahanImg from "../../assets/bahann.jpg";
import rasaImg from "../../assets/kuerasa.jpg";
import pengirimanImg from "../../assets/pengiriman.jpg";




const About = () => {
  return (
    <main className="bg-gradient-to-b from-gray-100 to-gray-300 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl font-serif font-bold text-orange-700 mb-6">
          Tentang Sweet Bakes Bakery
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Kami adalah Sweet Bakes Bakery, toko roti online yang menghadirkan berbagai pilihan kue dan pastry yang dipanggang dengan bahan berkualitas tinggi dan penuh cinta. Setiap produk kami diciptakan untuk memberikan rasa yang lezat dan pengalaman manis yang tak terlupakan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {/* Kualitas Bahan Terbaik */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300">
            <img
              src={bahanImg}
              alt="Kualitas Bahan Terbaik"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-gray-800">
                Kualitas Bahan Terbaik
              </h3>
              <p className="text-sm text-gray-500 mt-4">
                Kami hanya menggunakan bahan-bahan premium dalam setiap pembuatan kue, memastikan rasa yang sempurna dan kualitas yang terbaik pada setiap gigitan.
              </p>
            </div>
          </div>

          {/* Beragam Varian Rasa */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300">
            <img
              src={rasaImg}
              alt="Beragam Varian Rasa"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-gray-800">
                Beragam Varian Rasa
              </h3>
              <p className="text-sm text-gray-500 mt-4">
                Dari rasa klasik hingga inovatif, kami menawarkan berbagai varian rasa yang memanjakan selera dan cocok untuk semua orang.
              </p>
            </div>
          </div>

          {/* Pengiriman Cepat */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300">
            <img
              src={pengirimanImg}
              alt="Pengiriman Cepat"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-gray-800">
                Pengiriman Cepat
              </h3>
              <p className="text-sm text-gray-500 mt-4">
                Kami memastikan kue-kue kami sampai ke tangan Anda dengan cepat dan aman, langsung ke rumah Anda tanpa rasa khawatir.
              </p>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Sweet Bakes Bakery berkomitmen untuk memberikan layanan terbaik dan menciptakan pengalaman manis yang luar biasa. Jangan ragu untuk menghubungi kami jika Anda memiliki permintaan khusus atau membutuhkan bantuan. Kami selalu siap memberikan yang terbaik untuk Anda!
        </p>
      </div>
    </main>
  );
};

export default About;