import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="container mx-auto px-6 py-10 sm:py-8">
        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8">
          {/* text-content section */}
          <div className="space-y-5 text-white text-center px-4 sm:px-0">
            <h1
              data-aos="fade-up"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight"
            >
              Savor our freshly baked cakes with a variety of flavors and top-notch{' '}
              <span className="text-yellow-300 font-cursive text-4xl sm:text-5xl md:text-6xl">
                excellence
              </span>{' '}
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-base sm:text-lg leading-relaxed"
            >
              Relish every bite, conveniently delivered to your door, whenever and wherever you are.
            </p>

            {/* button section */}
            <div className="flex justify-center sm:justify-center">
              <PrimaryButton 
                buttonStyle="bg-red-500 hover:bg-red-700 text-white rounded-lg py-2 px-6" // Updated button style
              />
            </div>
          </div>

          {/* image section */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="relative z-30 w-full max-w-[300px] sm:max-w-md lg:max-w-lg"
          >
            {/* Add your image or other content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
