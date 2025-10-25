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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
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

        {/* Back to Home Link - Removed */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
