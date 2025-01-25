import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';

const Hero = () => {
  return (
    // Bagian utama Hero dengan latar belakang gradien yang elegan
    <div className="bg-gradient-to-r from-blue-900 to-indigo-700">
      <div className="container mx-auto px-6 py-10 sm:py-8">
        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8">
          {/* Bagian Konten Teks */}
          <div className="text-center text-white space-y-5 px-4 sm:px-0">
            <h1
              data-aos="fade-up" // Efek animasi
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight"
            >
              Temukan Cita Rasa Baru dengan{" "}
              <span className="text-yellow-400 font-cursive text-4xl sm:text-5xl md:text-6xl">
                Sweet Bakes Bakery
              </span>
            </h1>
            <p
              data-aos="fade-up" // Efek animasi
              data-aos-delay="300"
              className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            >
              Sajikan momen bahagia dengan kue segar, dibuat dengan cinta, dan dikirim langsung ke depan pintu Anda.
            </p>

            {/* Bagian Tombol */}
            <div
              className="mt-6 flex justify-center"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <PrimaryButton
                buttonStyle="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full py-3 px-8 shadow-xl transform transition duration-300 ease-out"
              />
            </div>
          </div>

          {/* Bagian Gambar atau Konten Lainnya */}
          <div
            data-aos="fade-up" // Efek animasi fade-up dengan delay
            data-aos-delay="300"
            className="relative z-30 w-full max-w-[300px] sm:max-w-md lg:max-w-lg"
          >
            {/* Contoh gambar, Anda bisa menambahkan gambar atau elemen visual lain */}
            {/* <img src="path/to/your-image.jpg" alt="Cake" className="w-full h-full object-cover rounded-lg shadow-xl"/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
