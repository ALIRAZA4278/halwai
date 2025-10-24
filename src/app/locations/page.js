"use client";

import React from 'react';
import Link from 'next/link';

const locations = [
  {
    id: 1,
    name: 'North Nazimabad Branch',
    address: 'SHAHRAH-SHER SHAH SURI SERVICE RD N, BLOCK K NORTH NAZIMABAD TOWN, KARACHI CITY, SINDH 74600',
    phone: '021-111-734-628',
    mapUrl: 'https://maps.google.com/?q=SHAHRAH-SHER+SHAH+SURI+SERVICE+RD+N+BLOCK+K+NORTH+NAZIMABAD+TOWN+KARACHI'
  },
  {
    id: 2,
    name: 'Gulshan Branch',
    address: 'PLOT 123, BLOCK 14, GULSHAN-E-IQBAL, KARACHI CITY, SINDH 75300',
    phone: '021-111-734-628',
    mapUrl: 'https://maps.google.com/?q=Gulshan+e+Iqbal+Karachi'
  }
  // Add more locations as needed
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-900 text-white px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="w-full flex items-center justify-between">
          {/* Left Section - Social Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-yellow-300 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="text-white hover:text-yellow-300 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
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

          {/* Right Section - Call to Action */}
          <div className="flex items-center space-x-4">
            <button className="hidden lg:flex items-center space-x-2 border border-yellow-300 text-yellow-300 rounded-full px-4 py-2 hover:bg-yellow-300 hover:text-red-900 transition-colors">
              <span className="font-medium text-sm">CALL US 111-734-628</span>
            </button>
            <button className="bg-yellow-300 text-red-900 rounded-full px-6 py-2 font-medium hover:bg-yellow-400 transition-colors">
              <span className="text-sm">ORDER ONLINE</span>
            </button>
            <div className="relative">
              <svg className="w-6 h-6 text-white hover:text-yellow-300 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">Locations</h1>

        <div className="space-y-8">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-sm">Map Placeholder</p>
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-900 hover:text-red-700 text-sm underline mt-2 inline-block"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  {location.address}
                </h2>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-red-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href={`tel:${location.phone}`} className="text-lg font-medium hover:text-red-900 transition-colors">
                    {location.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center text-red-900 hover:text-red-700 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
