"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useCart } from '@/context/CartContext';

const Navbar = ({ userLocation, onLocationChange, isDetectingLocation }) => {
  const { cartItemCount, setIsCartOpen } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLocationClick = () => {
    if (onLocationChange) {
      onLocationChange();
    }
  };
  return (
    <nav className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white shadow-2xl sticky top-0 z-50 border-b-2 border-yellow-300">
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-red-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-1.5">
          <div className="flex items-center justify-between text-xs">
            {/* Left Info */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-yellow-100 font-medium">021-111-734-628</span>
              </div>
              <div className="h-3 w-px bg-yellow-300/30"></div>
              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-yellow-100">info@halwai.com</span>
              </div>
            </div>
            
            {/* Right Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-yellow-100/80">Follow us:</span>
              <div className="flex items-center space-x-3">
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 lg:py-3">
        <div className="flex items-center justify-between">
          
          {/* Left - Location Button (Desktop) */}
          <div className="hidden lg:block flex-1">
            <button 
              onClick={handleLocationClick}
              className="group flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full px-3.5 py-2 transition-all duration-300 border border-white/20 hover:border-yellow-300/50"
            >
              <div className="bg-yellow-300 rounded-full p-1.5">
                <svg className="w-3.5 h-3.5 text-red-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-yellow-300 font-semibold text-xs uppercase tracking-wide">
                  {isDetectingLocation ? 'Detecting...' : 'Deliver to'}
                </div>
                <div className="text-white text-sm font-medium leading-tight max-w-[200px] truncate">
                  {isDetectingLocation ? (
                    <span className="animate-pulse">Finding location...</span>
                  ) : userLocation ? 
                    (userLocation.fullAddress ? 
                      userLocation.fullAddress.length > 25 ? 
                        `${userLocation.fullAddress.substring(0, 25)}...` : 
                        userLocation.fullAddress
                      : `${userLocation.area}, ${userLocation.city}`) : 
                    'Gali Town, Gujranwala'
                  }
                </div>
              </div>
              <svg className="w-4 h-4 text-yellow-300 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center lg:justify-center">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              {/* Decorative Top */}
              <div className="hidden sm:flex justify-center mb-0.5">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-yellow-200 rounded-full"></div>
                  <svg className="w-8 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 100 60">
                    <path d="M20 40 L30 20 L40 35 L50 15 L60 35 L70 20 L80 40 L50 50 Z" />
                  </svg>
                  <div className="w-1 h-1 bg-yellow-200 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Logo Text */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider font-serif">
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
                  halwai
                </span>
              </h1>
              
              {/* Subtitle */}
              <div className="hidden sm:flex items-center justify-center space-x-2 mt-0.5">
                <div className="h-px w-6 bg-gradient-to-r from-transparent to-yellow-300"></div>
                <p className="text-[10px] lg:text-xs text-yellow-100 italic tracking-[0.3em] font-light uppercase">
                  Pure Desi Halwai
                </p>
                <div className="h-px w-6 bg-gradient-to-l from-transparent to-yellow-300"></div>
              </div>
            </div>
          </div>

          {/* Right - Cart & Menu */}
          <div className="flex-1 flex items-center justify-end space-x-3 lg:space-x-4">
            
            {/* Phone (Mobile Only) */}
            <a href="tel:021111734628" className="lg:hidden">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all">
                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </a>

            {/* Search Icon (Desktop) */}
            <button className="hidden lg:block bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all group">
              <svg className="w-4 h-4 text-white group-hover:text-yellow-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all group"
            >
              <svg className="w-5 h-5 lg:w-5 lg:h-5 text-white group-hover:text-yellow-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-300 text-red-900 text-xs font-bold rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Menu Button */}
            <button 
              onClick={toggleSidebar}
              className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all group"
            >
              <div className="flex flex-col space-y-1 w-5 h-5 items-center justify-center">
                <span className="block w-4 h-0.5 bg-white group-hover:bg-yellow-300 rounded transition-colors"></span>
                <span className="block w-4 h-0.5 bg-white group-hover:bg-yellow-300 rounded transition-colors"></span>
                <span className="block w-4 h-0.5 bg-white group-hover:bg-yellow-300 rounded transition-colors"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </nav>
  );
};

export default Navbar;
