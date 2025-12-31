"use client";

import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Premium Pakistani Sweets",
      subtitle: "Handcrafted with Love & Tradition",
      buttonText: "Order Now",
      backgroundImage: "/HERO BANNERS/1.jpg",
      mobileBackgroundImage: "/HERO BANNERS/1 mo.jpg",
      gradient: "from-transparent to-transparent"
    },
    {
      id: 2,
      title: "Festival Special Collection",
      subtitle: "Perfect for Every Celebration",
      buttonText: "View Collection",
      backgroundImage: "/HERO BANNERS/2.jpg",
      mobileBackgroundImage: "/HERO BANNERS/2 mob.jpg",
      gradient: "from-transparent to-transparent"
    },
    {
      id: 3,
      title: "Fresh Daily Delights",
      subtitle: "Made Fresh Every Morning",
      buttonText: "Shop Fresh",
      backgroundImage: "/HERO BANNERS/3.jpg",
      mobileBackgroundImage: "/HERO BANNERS/3 mob.jpg",
      gradient: "from-transparent to-transparent"
    }
  ];

  // Preload images
  useEffect(() => {
    const imagesToPreload = [];
    slides.forEach(slide => {
      const img1 = new Image();
      img1.src = slide.backgroundImage;
      imagesToPreload.push(img1);

      const img2 = new Image();
      img2.src = slide.mobileBackgroundImage;
      imagesToPreload.push(img2);
    });

    Promise.all(
      imagesToPreload.map(img => {
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!imagesLoaded) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, imagesLoaded]);


  return (
    <section className="relative h-[70vh] md:h-[75vh] lg:h-[85vh] w-full overflow-hidden">

      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-[#234433] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#E7BD8B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#FDF4E3] text-lg">Loading...</p>
          </div>
        </div>
      )}

      {/* Background Images with Slider */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image - Desktop */}
            <div
              className="hidden md:block absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('${slide.backgroundImage}')`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Background Image - Mobile */}
            <div
              className="block md:hidden absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('${slide.mobileBackgroundImage}')`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Gradient Overlay - Lighter for full opacity images */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            {/* Content removed to show banners clearly */}
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
