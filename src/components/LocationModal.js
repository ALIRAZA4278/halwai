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
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        
        {/* Header */}
        <div className="text-center py-6 px-6 border-b border-gray-100">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <img
              src="/LOGO/halwaiiii-01.png"
              alt="Halwaiii Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          <p className="text-sm text-gray-500">Pure Desi Halwai</p>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Order Type Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-3 text-center">
              Select your order type
            </h2>
            <div className="flex justify-center">
              <div className="bg-[#234433] text-white px-6 py-2 rounded-full font-medium text-sm">
                DELIVERY
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-800 mb-3">
              Please select your location
            </h3>
            
            {/* Current Location Button */}
            <button
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="w-full mb-4 px-4 py-3 bg-[#234433] text-white rounded-lg font-medium hover:bg-[#234433]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{isLoading ? 'Getting Location...' : 'Use Current Location'}</span>
            </button>

            {locationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{locationError}</p>
              </div>
            )}

            {currentLocation && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">
                  Current location: {currentLocation.city}, {currentLocation.area}
                </p>
              </div>
            )}

            {/* Editable Address Fields */}
            <div className="space-y-3 mb-6">
              {/* City Input */}
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter your city"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#234433] transition-colors text-black"
              />

              {/* Area Input */}
              <input
                type="text"
                value={areaInput}
                onChange={(e) => setAreaInput(e.target.value)}
                placeholder="Enter your area"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#234433] transition-colors text-black"
              />

              {/* Complete Address Input */}
              <textarea
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Enter your complete address (House #, Street, Landmark)"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#234433] transition-colors resize-none text-black"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!cityInput.trim() || !areaInput.trim() || !fullAddress.trim()}
            className="w-full py-3 bg-[#234433] text-white rounded-lg font-medium hover:bg-[#234433]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;