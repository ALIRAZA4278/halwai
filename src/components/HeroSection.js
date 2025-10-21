"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "MALAI PERA",
      image: "/api/placeholder/200/150",
      position: "top-left"
    },
    {
      id: 2,
      name: "CHERRY KALAKAND",
      image: "/api/placeholder/300/200",
      position: "center-left"
    },
    {
      id: 3,
      name: "MALAI KHAJA",
      image: "/api/placeholder/250/180",
      position: "bottom-center"
    },
    {
      id: 4,
      name: "ZAFRANI PAIRAY",
      image: "/api/placeholder/200/150",
      position: "top-right"
    }
  ];

  const slides = [
    {
      id: 1,
      title: "Special mithai",
      subtitle: "AVAILABLE ONLY ON PRE-ORDER",
      products: products
    },
    {
      id: 2,
      title: "Premium Collection",
      subtitle: "HANDCRAFTED WITH LOVE",
      products: products
    },
    {
      id: 3,
      title: "Festival Special",
      subtitle: "TRADITIONAL TASTE",
      products: products
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
    <section className="relative h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-200 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center px-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Left Side - Text Content */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
            <div className="text-left">
              <h1 className="text-6xl font-bold text-red-700 mb-4 font-serif">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-red-600 font-medium tracking-wide">
                {slides[currentSlide].subtitle}
              </p>
              
              {/* CTA Button */}
              <button className="mt-8 bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-800 transition-colors shadow-lg">
                Order Now
              </button>
            </div>
          </div>

          {/* Center - Product Display */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Malai Pera - Top Left */}
            <div className="absolute top-20 left-1/3 transform -translate-x-1/2">
              <div className="relative group cursor-pointer">
                <div className="w-48 h-36 bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">🥛</span>
                      </div>
                      <span className="text-xs text-gray-600">Dummy Image</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  MALAI PERA
                </div>
              </div>
            </div>

            {/* Cherry Kalakand - Center Left */}
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
              <div className="relative group cursor-pointer">
                <div className="w-64 h-48 bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-3xl">🍒</span>
                      </div>
                      <span className="text-xs text-gray-600">Dummy Image</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  CHERRY KALAKAND
                </div>
              </div>
            </div>

            {/* Malai Khaja - Bottom Center */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="relative group cursor-pointer">
                <div className="w-56 h-40 bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-22 h-22 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">🥟</span>
                      </div>
                      <span className="text-xs text-gray-600">Dummy Image</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  MALAI KHAJA
                </div>
              </div>
            </div>

            {/* Zafrani Pairay - Top Right */}
            <div className="absolute top-20 right-1/4 transform translate-x-1/2">
              <div className="relative group cursor-pointer">
                <div className="w-48 h-36 bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">🟡</span>
                      </div>
                      <span className="text-xs text-gray-600">Dummy Image</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ZAFRANI PAIRAY
                </div>
              </div>
            </div>

            {/* Red Gift Box - Center Right */}
            <div className="absolute top-1/3 right-1/4">
              <div className="relative group cursor-pointer">
                <div className="w-40 h-32 bg-red-600 rounded-lg shadow-xl transform hover:scale-105 transition-transform flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl mb-2">🎁</div>
                    <div className="text-xs font-bold">Rehmat-e-Shereen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-red-600 w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* WhatsApp Button */}
      <div className="absolute bottom-8 right-8 z-20">
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>

      {/* Payment Icons */}
      <div className="absolute bottom-8 right-24 flex space-x-2 z-20">
        <div className="bg-white p-2 rounded shadow-md">
          <span className="text-blue-600 font-bold text-sm">VISA</span>
        </div>
        <div className="bg-white p-2 rounded shadow-md">
          <span className="text-red-600 font-bold text-sm">MC</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
