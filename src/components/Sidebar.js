"use client";

import React from 'react';
import Link from 'next/link';

const Sidebar = ({ isOpen, onClose }) => {

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-white/30 z-[110]"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#234433] text-white transform transition-transform duration-300 ease-in-out z-[120] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white hover:text-[#E7BD8B] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center px-6 mb-6">
          <img
            src="/LOGO/halwaiiii-01.png"
            alt="Halwaiii Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Menu Items */}
        <div className="px-6 py-4 space-y-4">

          {/* Home Button */}
          <Link href="/" onClick={onClose} className="block w-full bg-white text-[#234433] py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Home
          </Link>

          {/* About Us Button */}
          <Link href="/about" onClick={onClose} className="block w-full bg-white text-[#234433] py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            About Us
          </Link>

          {/* Products Button */}
          <Link href="/products" onClick={onClose} className="block w-full bg-white text-[#234433] py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Products
          </Link>

          {/* Our Locations Button */}
          <Link href="/locations" onClick={onClose} className="block w-full bg-white text-[#234433] py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Our Locations
          </Link>

          {/* Feedback Button */}
          <Link href="/feedback" onClick={onClose} className="block w-full bg-white text-[#234433] py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Feedback
          </Link>

          {/* Contact Us Button */}
          <Link href="/contact" onClick={onClose} className="block w-full bg-white text-[#234433] py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Contact Us
          </Link>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-white/80">
            <span>Powered by</span>
            <div className="bg-white text-[#234433] px-2 py-1 rounded text-xs font-bold">
              The Socialhawks
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
