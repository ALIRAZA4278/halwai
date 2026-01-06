"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';
import { useCart } from '@/context/CartContext';

const Navbar = ({ userLocation, onLocationChange, isDetectingLocation }) => {
  const { cartItemCount, setIsCartOpen } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLocationClick = () => {
    if (onLocationChange) {
      onLocationChange();
    }
  };
  return (
    <nav className={`bg-gradient-to-r from-[#234433] via-[#234433] to-[#234433] text-white fixed top-0 left-0 right-0 w-full z-[100] border-b border-[#E7BD8B] transition-all duration-300 ${isScrolled ? 'py-0.5 shadow-2xl backdrop-blur-md' : 'shadow-lg'}`}>
      {/* Top Bar - Desktop Only - Hidden when scrolled */}
      <div className={`hidden lg:block bg-[#234433]/50 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-6 py-1">
          <div className="flex items-center justify-between text-[10px]">
            {/* Left Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <svg className="w-3 h-3 text-[#E7BD8B]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-[#FDF4E3] font-medium">021-111-734-628</span>
              </div>
              <div className="h-2.5 w-px bg-[#E7BD8B]/30"></div>
              <div className="flex items-center space-x-1.5">
                <svg className="w-3 h-3 text-[#E7BD8B]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-[#FDF4E3]">info@halwai.com</span>
              </div>
            </div>

            {/* Right Social Links */}
            <div className="flex items-center space-x-3">
              <span className="text-[#FDF4E3]/80">Follow us:</span>
              <div className="flex items-center space-x-2">
                <a href="#" className="hover:text-[#E7BD8B] transition-colors">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-[#E7BD8B] transition-colors">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-[#E7BD8B] transition-colors">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-1.5 lg:py-2'}`}>
        <div className="flex items-center justify-between">

          {/* Left - Location Button (Desktop) - Empty on Mobile */}
          <div className="flex-1">
            {/* Desktop Location Button */}
            <button
              onClick={handleLocationClick}
              className="hidden lg:flex group items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full px-2.5 py-1.5 transition-all duration-300 border border-white/20 hover:border-[#E7BD8B]/50"
            >
              <div className="bg-[#E7BD8B] rounded-full p-1">
                <svg className="w-3 h-3 text-[#234433]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[#E7BD8B] font-semibold text-[10px] uppercase tracking-wide">
                  {isDetectingLocation ? 'Detecting...' : 'Deliver to'}
                </div>
                <div className="text-white text-xs font-medium leading-tight max-w-[180px] truncate">
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
              <svg className="w-4 h-4 text-[#E7BD8B] group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="transform hover:scale-105 transition-transform duration-300">
              {/* Logo Image - Smaller when scrolled */}
              <img
                src="/LOGO/halwaiiii-01.png"
                alt="Halwaiii Logo"
                className={`w-auto object-contain cursor-pointer transition-all duration-300 ${
                  isScrolled ? 'h-7 sm:h-8 md:h-9 lg:h-10' : 'h-8 sm:h-10 md:h-11 lg:h-12'
                }`}
              />
            </Link>
          </div>

          {/* Right - Cart & Menu */}
          <div className="flex-1 flex items-center justify-end space-x-1.5 sm:space-x-2 lg:space-x-3">

            {/* Phone (Mobile Only) */}
            <a href="tel:021111734628" className="lg:hidden">
              <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/20 transition-all">
                <svg className="w-4 h-4 text-[#E7BD8B]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </a>

            {/* Search Icon (Desktop) */}
            <button className="hidden lg:block bg-white/10 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/20 transition-all group">
              <svg className="w-3.5 h-3.5 text-white group-hover:text-[#E7BD8B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white/10 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/20 transition-all group"
            >
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:text-[#E7BD8B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-[#E7BD8B] to-[#E7BD8B] text-[#234433] text-[9px] sm:text-[10px] font-bold rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center border border-white shadow-lg animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Menu Button - Both Mobile & Desktop */}
            <button
              onClick={toggleSidebar}
              className="bg-white/10 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/20 transition-all group"
            >
              <div className="flex flex-col space-y-0.5 w-4.5 h-4.5 items-center justify-center">
                <span className="block w-4 h-0.5 bg-white group-hover:bg-[#E7BD8B] rounded transition-colors"></span>
                <span className="block w-4 h-0.5 bg-white group-hover:bg-[#E7BD8B] rounded transition-colors"></span>
                <span className="block w-4 h-0.5 bg-white group-hover:bg-[#E7BD8B] rounded transition-colors"></span>
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
