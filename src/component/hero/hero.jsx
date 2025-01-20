import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';

const Hero = () => {
  return (
    // Bagian utama Hero dengan latar belakang gradien
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="container mx-auto px-6 py-10 sm:py-8">
        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8">
          {/* Bagian Konten Teks */}
          <div className="space-y-5 text-white text-center px-4 sm:px-0">
            <h1
              data-aos="fade-up" // Efek animasi fade-up saat halaman dimuat
              className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight"
            >
              Savor our freshly baked cakes with a variety of flavors and top-notch{' '}
              <span className="text-yellow-300 font-cursive text-4xl sm:text-5xl md:text-6xl">
                excellence
              </span>{' '}
            </h1>
            <p
              data-aos="fade-up" // Efek animasi fade-up dengan delay
              data-aos-delay="300"
              className="text-base sm:text-lg leading-relaxed"
            >
              Relish every bite, conveniently delivered to your door, whenever and wherever you are.
            </p>

            {/* Bagian Tombol */}
            <div className="flex justify-center sm:justify-center">
              <PrimaryButton 
                buttonStyle="bg-red-500 hover:bg-red-700 text-white rounded-lg py-2 px-6" // Gaya tombol yang telah diperbarui
              />
            </div>
          </div>

          {/* Bagian Gambar */}
          {/* Tempat untuk menambahkan gambar atau konten lainnya */}
          <div
            data-aos="fade-up" // Efek animasi fade-up dengan delay
            data-aos-delay="300"
            className="relative z-30 w-full max-w-[300px] sm:max-w-md lg:max-w-lg"
          >
            {/* Misalnya, bisa ditambahkan gambar seperti ini: */}
            {/* <img src="path/to/your-image.jpg" alt="Cake" className="w-full h-full object-cover rounded-lg"/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
