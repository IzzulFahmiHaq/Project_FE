import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PrimaryButton = () => {
  const [buttonText, setButtonText] = useState("Pilih Rencana Makanan Anda");

  // Mengatur warna gradien tombol sesuai teks
  const getButtonColor = () => {
    if (buttonText === "Pilih Rencana Makanan Anda") {
      return "bg-gradient-to-r from-orange-500 to-orange-600";
    } else if (buttonText === "Jelajahi Lebih Lanjut") {
      return "bg-gradient-to-r from-green-500 to-green-400";
    }
    return "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  return (
    <div className="flex items-center justify-center">
      <Link to="/banner">
        <button
          className={`${getButtonColor()} text-white flex items-center justify-center px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition duration-300 ease-out`}
          onClick={() => setButtonText("Jelajahi Lebih Lanjut")}
        >
          <span className="mr-3 text-lg font-semibold">{buttonText}</span>
          <FaArrowRight className="transform transition-transform duration-200 text-white text-xl" />
        </button>
      </Link>
    </div>
  );
};

export default PrimaryButton;
