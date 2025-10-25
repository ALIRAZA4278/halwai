"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-red-900 to-red-800 text-white px-6 py-2 rounded-full">
              <span className="text-sm font-semibold uppercase tracking-wider">Find Us</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent mb-4">
            Our Locations
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Visit any of our branches to experience the finest Pakistani sweets and delicacies.
          </p>
        </div>

        <div className="space-y-8">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-yellow-300 transform hover:scale-[1.02] transition-all duration-300">
              {/* Map Placeholder */}
              <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="inline-block bg-white rounded-full p-6 shadow-lg mb-4">
                      <svg className="w-16 h-16 text-red-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-4 font-medium">Location Map</p>
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                      style={{ background: 'linear-gradient(to right, #fef399, #f9d84e)' }}
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-red-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Address</h3>
                    <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
                      {location.address}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <svg className="w-6 h-6 text-red-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Call Us</p>
                    <a 
                      href={`tel:${location.phone}`} 
                      className="text-2xl font-bold text-red-900 hover:text-red-700 transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Opening Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
                <p className="text-gray-600 font-semibold mb-2">Monday - Saturday</p>
                <p className="text-2xl font-bold text-red-900">9:00 AM - 11:00 PM</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
                <p className="text-gray-600 font-semibold mb-2">Sunday</p>
                <p className="text-2xl font-bold text-red-900">10:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
