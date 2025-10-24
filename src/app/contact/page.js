"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-red-900 text-white px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="w-full flex items-center justify-between">
          {/* Left Section - Location and Phone */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center space-x-2 border border-white/40 rounded-full px-3 py-2 text-sm hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="text-yellow-300 font-medium text-sm">Change Location</div>
                <div className="text-xs opacity-90">Adda Zama Gujranwala</div>
              </div>
            </button>

            <div className="flex items-center space-x-2 border border-white/40 rounded-full px-3 py-2">
              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm font-medium">021-111-734-628</span>
            </div>
          </div>

          {/* Center Section - Logo */}
          <Link href="/" className="flex-1 flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <div className="text-center">
              <div className="hidden sm:flex justify-center mb-1">
                <svg className="w-8 h-6 lg:w-10 lg:h-8 text-yellow-300" fill="currentColor" viewBox="0 0 100 60">
                  <path d="M20 40 L30 20 L40 35 L50 15 L60 35 L70 20 L80 40 L50 50 Z" />
                  <path d="M25 45 L35 25 L45 40 L55 20 L65 40 L75 25 L85 45 L55 55 Z" opacity="0.7" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300 tracking-wide font-serif">
                halwai
              </h1>
              <p className="hidden sm:block text-xs lg:text-sm text-yellow-200 italic mt-1 tracking-widest font-light">
                Pure Desi Halwai
              </p>
            </div>
          </Link>

          {/* Right Section - Menu */}
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-yellow-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600">Please fill the form and our team will be in touch with you as soon as possible.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <span className="text-sm font-medium">Continue Shopping</span>
        </button>
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 mb-6">
            <button className="hover:opacity-80">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
            </button>
            <button className="hover:opacity-80">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
