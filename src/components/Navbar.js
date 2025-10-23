"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Navbar = ({ userLocation, onLocationChange, isDetectingLocation }) => {
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
    <nav className="bg-red-800 text-white px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
      <div className="w-full flex items-center justify-between relative">
        {/* Left Section - Location and Phone */}
        <div className="hidden lg:flex items-center space-x-4 flex-1">
          {/* Location */}
          <button 
            onClick={handleLocationClick}
            className="flex items-center space-x-2 border border-white/40 rounded-full px-3 py-2 text-sm hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="text-yellow-300 font-medium text-sm leading-tight">
                {isDetectingLocation ? 'Detecting Location...' : 'Change Location'}
              </div>
              <div className="text-xs opacity-90 leading-tight">
                {isDetectingLocation ? (
                  <span className="animate-pulse">📍 Finding your location...</span>
                ) : userLocation ? 
                  (userLocation.fullAddress ? 
                    userLocation.fullAddress.length > 30 ? 
                      `${userLocation.fullAddress.substring(0, 30)}...` : 
                      userLocation.fullAddress
                    : `${userLocation.area}, ${userLocation.city}`) : 
                  'Gali Town Gujranwala'
                }
              </div>
            </div>
          </button>
          
          {/* Phone */}
          <div className="flex items-center space-x-2 border border-white/40 rounded-full px-3 py-2">
            <svg className="w-4 h-4 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <div className="text-sm font-medium whitespace-nowrap">021-111-734-628</div>
          </div>
        </div>

        {/* Mobile Phone Only */}
        <div className="lg:hidden flex items-center">
          <div className="flex items-center space-x-2 text-sm">
            <svg className="w-4 h-4 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="font-medium">021-111-734-628</span>
          </div>
        </div>

        {/* Center Section - Logo */}
        <div className="flex-1 flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <div className="text-center">
            {/* Decorative element above - hidden on mobile */}
            <div className="hidden sm:flex justify-center mb-1">
              <svg className="w-8 h-6 lg:w-10 lg:h-8 text-yellow-300" fill="currentColor" viewBox="0 0 100 60">
                {/* Decorative crown/leaf pattern */}
                <path d="M20 40 L30 20 L40 35 L50 15 L60 35 L70 20 L80 40 L50 50 Z" />
                <path d="M25 45 L35 25 L45 40 L55 20 L65 40 L75 25 L85 45 L55 55 Z" opacity="0.7" />
              </svg>
            </div>
            
            {/* Main Logo Text */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300 tracking-wide font-serif">
              halwai
            </h1>
            
            {/* Subtitle - hidden on mobile */}
            <p className="hidden sm:block text-xs lg:text-sm text-yellow-200 italic mt-1 tracking-widest font-light">
              Pure Desi Halwai
            </p>
          </div>
        </div>

        {/* Right Section - Cart and Menu */}
        <div className="flex items-center space-x-3 lg:space-x-6 flex-1 justify-end">
          {/* Shopping Cart */}
          <div className="relative">
            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white hover:text-yellow-300 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {/* Cart Badge */}
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs font-bold rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center border-2 border-white">
              0
            </span>
          </div>

          {/* Hamburger Menu */}
          <button 
            onClick={toggleSidebar}
            className="flex flex-col space-y-1 lg:space-y-1.5 p-2 hover:bg-white/10 rounded transition-colors"
          >
            <span className="block w-6 lg:w-7 h-0.5 bg-white rounded"></span>
            <span className="block w-6 lg:w-7 h-0.5 bg-white rounded"></span>
            <span className="block w-6 lg:w-7 h-0.5 bg-white rounded"></span>
          </button>
        </div>
      </div>
      
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </nav>
  );
};

export default Navbar;
