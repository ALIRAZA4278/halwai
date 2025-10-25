"use client";

import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Premium Pakistani Sweets",
      subtitle: "Handcrafted with Love & Tradition",
      buttonText: "Order Now",
      backgroundImage: "/HERO BANNERS/1.jpg",
      gradient: "from-transparent to-transparent"
    },
    {
      id: 2,
      title: "Festival Special Collection", 
      subtitle: "Perfect for Every Celebration",
      buttonText: "View Collection",
      backgroundImage: "/HERO BANNERS/2.jpg",
      gradient: "from-transparent to-transparent"
    },
    {
      id: 3,
      title: "Fresh Daily Delights",
      subtitle: "Made Fresh Every Morning",
      buttonText: "Shop Fresh",
      backgroundImage: "/HERO BANNERS/3.jpg", 
      gradient: "from-transparent to-transparent"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[75vh] sm:h-[80vh] lg:h-[85vh] overflow-hidden">
      
      {/* Background Images with Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.backgroundImage}')`
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

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 sm:p-4 rounded-full transition-all z-20 backdrop-blur-sm"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 sm:p-4 rounded-full transition-all z-20 backdrop-blur-sm"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2.5 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
