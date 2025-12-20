"use client";

import { useState, useEffect } from 'react';
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import LocationModal from "@/components/LocationModal";
import Cart from "@/components/Cart";

export default function Products() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  useEffect(() => {
    // Check if user has already selected location
    const savedLocation = localStorage.getItem('userLocation');
    if (!savedLocation) {
      // Automatically get location after page loads
      const timer = setTimeout(() => {
        autoDetectLocation();
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setUserLocation(JSON.parse(savedLocation));
    }
  }, []);

  const autoDetectLocation = () => {
    if (!navigator.geolocation) {
      // If geolocation is not supported, show modal
      setShowLocationModal(true);
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding using a free API (nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            let city = data.address.city || data.address.town || data.address.county;
            let area = data.address.suburb || data.address.neighbourhood || data.address.road;
            const fullAddress = data.display_name || '';

            // If we can't get proper city/area, use Pakistan as a fallback with major cities
            if (!city || !area) {
              // Check if it's in Pakistan and set appropriate defaults
              const country = data.address.country;
              if (country && country.toLowerCase().includes('pakistan')) {
                city = 'Karachi'; // Default to Karachi as it's the largest city
                area = 'Gulshan-e-Iqbal';
              } else {
                city = 'Gujranwala';
                area = 'Gali Town';
              }
            }

            const locationData = {
              orderType: 'DELIVERY',
              city: city,
              area: area,
              fullAddress: fullAddress,
              currentLocation: { city, area, latitude, longitude, fullAddress },
              autoDetected: true
            };

            // Automatically save and set the location
            localStorage.setItem('userLocation', JSON.stringify(locationData));
            setUserLocation(locationData);
            setIsDetectingLocation(false);
          } else {
            // If reverse geocoding fails, show modal
            setIsDetectingLocation(false);
            setShowLocationModal(true);
          }
        } catch (error) {
          // If API fails, show modal
          setIsDetectingLocation(false);
          setShowLocationModal(true);
        }
      },
      (error) => {
        // If geolocation fails, show modal
        setIsDetectingLocation(false);
        setShowLocationModal(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleLocationSelect = (locationData) => {
    localStorage.setItem('userLocation', JSON.stringify(locationData));
    setUserLocation(locationData);
    setShowLocationModal(false);
  };

  const handleModalClose = () => {
    setShowLocationModal(false);
  };

  const handleLocationChange = () => {
    setShowLocationModal(true);
  };

  return (
    <>
      <Navbar
        userLocation={userLocation}
        onLocationChange={handleLocationChange}
        isDetectingLocation={isDetectingLocation}
      />
      <div className="pt-[80px] lg:pt-[100px]">
      <HeroSection />
      <Categories />
      <Footer />
      </div>

      {/* Cart Sidebar */}
      <Cart />

      {/* Location Detection Loading */}
      {isDetectingLocation && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#E7BD8B] to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-8 h-8 text-white animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Detecting Your Location</h3>
              <p className="text-sm text-gray-600">Please wait while we find your current location...</p>
              <div className="mt-4">
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <LocationModal
        isOpen={showLocationModal}
        onClose={handleModalClose}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
}
