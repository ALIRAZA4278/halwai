"use client";

import React, { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-red-700 text-white transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-white hover:text-yellow-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-6 py-4 space-y-4">
          
          {/* Our Locations Button */}
          <button className="w-full bg-white text-red-700 py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Our Locations
          </button>

          {/* Feedback Button */}
          <button className="w-full bg-white text-red-700 py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Feedback
          </button>

          {/* Contact Us Button */}
          <button className="w-full bg-white text-red-700 py-4 px-6 rounded-lg font-medium text-left hover:bg-gray-100 transition-colors shadow-sm">
            Contact Us
          </button>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-4">
            <span className="text-white font-medium">Dark Mode</span>
            <div className="relative">
              <input
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="sr-only"
              />
              <label
                htmlFor="darkModeToggle"
                className={`flex items-center cursor-pointer w-14 h-7 rounded-full p-1 transition-colors duration-300 ${
                  darkMode ? 'bg-yellow-400' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    darkMode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-white/80">
            <span>Powered by</span>
            <div className="bg-white text-red-700 px-2 py-1 rounded text-xs font-bold">
              TechAI
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
