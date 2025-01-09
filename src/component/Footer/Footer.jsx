import React from "react";
import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5"; // Corrected import statement
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div className="bg-cakePink text-brown mt-20">
        <div data-aos="fade-down" className="container max-w-screen-xl mx-auto bg-gradient-to-b from-cakePink to-cakeBrown rounded-t-3xl py-16">
          <h1 className="text-4xl font-bold text-yellow-500 text-center mb-12">Get In Touch - Cake Lovers</h1>

          {/* Grid section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Address Section */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <IoLocationSharp className="text-5xl text-cakeGold" />
              </div>
              <p className="text-lg">
                Sweet Street, Cake Lane <br />
                Pastry Town, Oven Park
              </p>
            </div>

            {/* Emails Section */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <MdEmail className="text-5xl text-cakeGold" />
              </div>
              <p className="text-lg">info@bakeandcake.com</p>
              <p className="text-lg">hr@bakeandcake.com</p>
            </div>

            {/* Phone Numbers Section */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <FaPhone className="text-5xl text-cakeGold" />
              </div>
              <p className="text-lg">084536278191 - Sales & Pastry Orders</p>
              <p className="text-lg">085654378213 - Hiring Queries</p>
              <p className="text-lg">081342156732 - WhatsApp for Cake Lovers</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="bg-cakeBrown text-center py-6">
          <p className="text-lg">© 2024 Bake and Cake, All rights reserved</p>
          <div className="flex justify-center gap-8 mt-4">
            <a href="#" className="text-yellow-500 hover:text-yellow-300">Privacy Policy</a>
            <a href="#" className="text-yellow-500 hover:text-yellow-300">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
