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
      backgroundImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&crop=center",
      gradient: "from-red-900/70 to-orange-800/70"
    },
    {
      id: 2,
      title: "Festival Special Collection", 
      subtitle: "Perfect for Every Celebration",
      buttonText: "View Collection",
      backgroundImage: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1920&h=1080&fit=crop&crop=center",
      gradient: "from-purple-900/70 to-pink-800/70"
    },
    {
      id: 3,
      title: "Fresh Daily Delights",
      subtitle: "Made Fresh Every Morning",
      buttonText: "Shop Fresh",
      backgroundImage: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&h=1080&fit=crop&crop=center", 
      gradient: "from-green-900/70 to-teal-800/70"
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
    <section className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] overflow-hidden">
      
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
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-serif leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 sm:mb-8 text-gray-100">
              {slides[currentSlide].subtitle}
            </p>
            
            {/* CTA Button */}
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg">
              {slides[currentSlide].buttonText}
            </button>
            
            {/* Features */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
              <div className="flex items-center text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-20"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-20"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
