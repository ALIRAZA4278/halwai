"use client";

import React, { useState, useEffect } from 'react';

const LocationModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [selectedOrderType, setSelectedOrderType] = useState('DELIVERY');
  const [cityInput, setCityInput] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get current location using geolocation API
  const getCurrentLocation = () => {
    setIsLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

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
            const city = data.address.city || data.address.town || data.address.county || 'Unknown';
            const area = data.address.suburb || data.address.neighbourhood || data.address.road || 'Unknown';
            const displayName = data.display_name || '';
            
            // Create a more user-friendly address format
            const houseNumber = data.address.house_number || '';
            const street = data.address.road || '';
            const suburb = data.address.suburb || data.address.neighbourhood || '';
            
            let formattedAddress = '';
            if (houseNumber && street) {
              formattedAddress = `${houseNumber} ${street}`;
              if (suburb && suburb !== area) {
                formattedAddress += `, ${suburb}`;
              }
            } else if (displayName) {
              // Use first part of display name if house/street not available
              const addressParts = displayName.split(',');
              formattedAddress = addressParts.slice(0, 3).join(', ');
            }
            
            setCurrentLocation({ city, area, latitude, longitude, fullAddress: formattedAddress || displayName });
            setCityInput(city);
            setAreaInput(area);
            setFullAddress(formattedAddress || displayName);
          }
        } catch (error) {
          setLocationError('Failed to get location details.');
        }
        
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied by user.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = () => {
    if (cityInput.trim() && areaInput.trim() && fullAddress.trim()) {
      onLocationSelect({
        orderType: selectedOrderType,
        city: cityInput.trim(),
        area: areaInput.trim(),
        fullAddress: fullAddress.trim(),
        currentLocation: currentLocation
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-1.5 sm:p-2 overflow-y-auto">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-[94%] xs:w-[88%] sm:w-[80%] md:max-w-md max-h-[94vh] overflow-y-auto my-auto relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-1 sm:p-1.5 transition-colors group"
          aria-label="Close modal"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center py-1.5 sm:py-2 px-2.5 sm:px-3 border-b border-gray-100">
          {/* Logo */}
          <div className="mb-0.5 sm:mb-1 flex justify-center">
            <img
              src="/LOGO/halwaiiii-01.png"
              alt="Halwaiii Logo"
              className="h-6 xs:h-7 sm:h-8 w-auto object-contain"
            />
          </div>

          <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500">Pure Desi Halwai</p>
        </div>

        {/* Content */}
        <div className="p-2 xs:p-2.5 sm:p-3">

          {/* Order Type Selection */}
          <div className="mb-2 sm:mb-2.5">
            <h2 className="text-[10px] xs:text-[11px] sm:text-xs font-medium text-gray-800 mb-0.5 sm:mb-1 text-center">
              Select your order type
            </h2>
            <div className="flex justify-center">
              <div className="bg-[#234433] text-white px-2.5 xs:px-3 sm:px-4 py-0.5 rounded-full font-medium text-[9px] xs:text-[10px] sm:text-xs">
                DELIVERY
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-2 sm:mb-2.5">
            <h3 className="text-[9px] xs:text-[10px] sm:text-[11px] font-medium text-gray-800 mb-1 sm:mb-1.5">
              Please select your location
            </h3>

            {/* Current Location Button */}
            <button
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="w-full mb-1.5 sm:mb-2 px-2 xs:px-2.5 sm:px-3 py-1.5 bg-[#234433] text-white rounded-md text-[9px] xs:text-[10px] sm:text-[11px] font-medium hover:bg-[#234433]/90 active:bg-[#234433]/95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
            >
              <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{isLoading ? 'Getting Location...' : 'Use Current Location'}</span>
            </button>

            {locationError && (
              <div className="mb-1.5 p-1.5 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-[8px] xs:text-[9px] leading-tight">{locationError}</p>
              </div>
            )}

            {currentLocation && (
              <div className="mb-1.5 p-1.5 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700 text-[8px] xs:text-[9px] leading-tight">
                  Current location: {currentLocation.city}, {currentLocation.area}
                </p>
              </div>
            )}

            {/* Editable Address Fields */}
            <div className="space-y-1.5 mb-2">
              {/* City Input */}
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter your city"
                className="w-full px-2 xs:px-2.5 py-1.5 text-[9px] xs:text-[10px] sm:text-[11px] border border-gray-300 rounded-md focus:outline-none focus:border-[#234433] focus:ring-1 focus:ring-[#234433]/20 transition-all text-black placeholder:text-gray-400"
              />

              {/* Area Input */}
              <input
                type="text"
                value={areaInput}
                onChange={(e) => setAreaInput(e.target.value)}
                placeholder="Enter your area"
                className="w-full px-2 xs:px-2.5 py-1.5 text-[9px] xs:text-[10px] sm:text-[11px] border border-gray-300 rounded-md focus:outline-none focus:border-[#234433] focus:ring-1 focus:ring-[#234433]/20 transition-all text-black placeholder:text-gray-400"
              />

              {/* Complete Address Input */}
              <textarea
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Enter your complete address (House #, Street, Landmark)"
                rows="2"
                className="w-full px-2 xs:px-2.5 py-1.5 text-[9px] xs:text-[10px] sm:text-[11px] border border-gray-300 rounded-md focus:outline-none focus:border-[#234433] focus:ring-1 focus:ring-[#234433]/20 transition-all resize-none text-black placeholder:text-gray-400 leading-tight"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!cityInput.trim() || !areaInput.trim() || !fullAddress.trim()}
            className="w-full py-1.5 sm:py-2 text-[9px] xs:text-[10px] sm:text-[11px] bg-[#234433] text-white rounded-md font-medium hover:bg-[#234433]/90 active:bg-[#234433]/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;