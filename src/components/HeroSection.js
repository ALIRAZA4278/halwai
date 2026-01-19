"use client";

import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[75vh] sm:h-[75vh] md:h-[80vh] lg:h-[90vh] xl:h-screen w-screen overflow-hidden z-0">
      {/* Single Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/product-home.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </section>
  );
};

export default HeroSection;
