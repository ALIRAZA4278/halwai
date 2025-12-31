"use client";

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationModal from "@/components/LocationModal";
import Cart from "@/components/Cart";

export default function Home() {
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
      setShowLocationModal(true);
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            let city = data.address.city || data.address.town || data.address.county;
            let area = data.address.suburb || data.address.neighbourhood || data.address.road;
            const fullAddress = data.display_name || '';

            if (!city || !area) {
              const country = data.address.country;
              if (country && country.toLowerCase().includes('pakistan')) {
                city = 'Karachi';
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

            localStorage.setItem('userLocation', JSON.stringify(locationData));
            setUserLocation(locationData);
            setIsDetectingLocation(false);
          } else {
            setIsDetectingLocation(false);
            setShowLocationModal(true);
          }
        } catch (error) {
          setIsDetectingLocation(false);
          setShowLocationModal(true);
        }
      },
      (error) => {
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
      <div>

      {/* Hero Landing Section */}
      <section className="relative h-[80vh] w-full overflow-hidden mt-[50px] lg:mt-[60px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1722644077205-21281668e8b9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Logo */}
          <div className="mb-4 md:mb-5 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/LOGO/halwaiiii-01.png"
              alt="Halwaiii Logo"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Tagline */}
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-white text-center mb-1 max-w-5xl leading-tight tracking-wide">
            Where Heritage Meets
          </h2>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-white text-center mb-5 max-w-5xl leading-tight tracking-wide">
            Indulgence
          </h2>

          {/* CTA Button */}
          <a
            href="/products"
            className="group relative border-2 border-white text-white px-6 md:px-8 py-2 md:py-2.5 text-sm md:text-base font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Explore the Collection</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2 tracking-widest">SCROLL</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Decorative Sparkles */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#E7BD8B] rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-3 h-3 bg-[#E7BD8B] rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-[#E7BD8B] rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 right-40 w-3 h-3 bg-[#E7BD8B] rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
      </section>

      {/* Story Section */}
      <section className="bg-[#1a3329] py-8 md:py-10 lg:py-12 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="bg-[#f5ede1] overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0 items-stretch">

              {/* Left - Image */}
              <div className="relative h-[250px] sm:h-[280px] md:h-[320px] lg:h-[350px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1672632426010-6fda4358bb6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRlc2klMjBTd2VldHN8ZW58MHx8MHx8fDA%3D"
                  alt="The Story of Halwai"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                    THE STORY OF HALWAI
                  </h3>
                </div>
              </div>

              {/* Right - Content */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                <div className="text-[#C9A86A] text-[10px] uppercase tracking-[0.15em] mb-3 font-light flex items-center justify-center">
                  <span className="block w-8 h-px bg-[#C9A86A] mr-2"></span>
                  THE SYIDAI OF HALWAI
                  <span className="block w-8 h-px bg-[#C9A86A] ml-2"></span>
                </div>

                <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-[#2d2d2d] mb-3 leading-tight text-center">
                  The Art of<br />Sweetmaking
                </h2>

                <p className="text-[#666666] text-xs md:text-sm leading-relaxed mb-4 text-center max-w-lg mx-auto">
                  Halwai is more than a name: It&apos;s a craft passed down through generations.<br />
                  We blend time-honored tradition with a touch of modern finesse, creating<br />
                  moments that linger beyond taste.
                </p>

                <div className="text-center">
                  <a
                    href="/about"
                    className="group relative inline-block border-2 border-[#C9A86A] text-[#C9A86A] px-6 md:px-8 py-2 md:py-2.5 text-xs md:text-sm tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg"
                  >
                    <span className="relative z-10">Discover Our Story</span>
                    <div className="absolute inset-0 bg-[#C9A86A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold">
                      Discover Our Story
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Signature Creations Section */}
      <section className="bg-[#1a3329] pt-8 md:pt-10 lg:pt-12 pb-0 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

          {/* Section Heading */}
          <h2 className="text-[#C9A86A] text-center text-sm md:text-base lg:text-lg uppercase tracking-[0.3em] mb-6 md:mb-8 font-light">
            SIGNATURE CREATIONS
          </h2>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-6">

            {/* Left - Large Featured Item */}
            <div className="relative overflow-hidden ">
              <div className="relative h-[280px] md:h-[320px] lg:h-[360px] flex items-center justify-center">
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1691030657761-cca2ec5e97e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGRlc2klMjBTd2VldHN8ZW58MHx8MHx8fDA%3D')`,
                    opacity: 0.9
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content Centered */}
                <div className="relative z-10 text-center px-3 sm:px-4 w-full max-w-2xl">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mb-1.5 sm:mb-2 leading-tight">
                    Gictarus Curentics
                  </h3>
                  <p className="text-white text-base sm:text-lg md:text-xl font-serif mb-2 sm:mb-3 leading-tight font-light">
                    Sweetness, Wrapped<br />in Grace
                  </p>
                  <p className="text-white/95 text-[10px] sm:text-xs md:text-xs mb-3 sm:mb-4 mx-auto leading-relaxed">
                    From weddings to heartfelt gestures. Our<br />
                    gifting boxes bring together tradition an<br />
                    elegance.
                  </p>
                  <button className="group relative border-2 border-white text-white px-5 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-wider overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <span className="relative z-10">Explore Gifting</span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[#1a3329] opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold">
                      Explore Gifting
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Grid of 4 Items */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">

              {/* Item 1 - Kesar Pak */}
              <div className="text-center">
                <div className="relative h-[110px] md:h-[125px] lg:h-[140px] mb-2 overflow-hidden bg-black">
                  <img
                    src="https://5.imimg.com/data5/ECOM/Default/2024/6/430579060/LZ/RH/ZT/36070396/kesarpaak-500x500.jpg"
                    alt="Kesar Pak"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-[#C9A86A] text-sm md:text-base font-serif mb-0.5">
                  Kesar Pak
                </h4>
                <p className="text-white/70 text-[10px] font-light">
                  The Bawal Indulgence
                </p>
              </div>

              {/* Item 2 - Pista Roll */}
              <div className="text-center">
                <div className="relative h-[110px] md:h-[125px] lg:h-[140px] mb-2 overflow-hidden bg-black">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.qFcOb6Uc6mlnnvIf1kp52wHaHa?pid=Api&P=0&h=220"
                    alt="Pista Roll"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-[#C9A86A] text-sm md:text-base font-serif mb-0.5">
                  Pista Roll
                </h4>
                <p className="text-white/70 text-[10px] font-light">
                  A Heritage Favorite
                </p>
              </div>

              {/* Item 3 - Gulab Jamun */}
              <div className="text-center">
                <div className="relative h-[110px] md:h-[125px] lg:h-[140px] mb-2 overflow-hidden bg-black">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.8gpEn9J9ZwsYk2NAGqKSkQHaHa?pid=Api&P=0&h=220"
                    alt="Gulab Jamun"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-[#C9A86A] text-sm md:text-base font-serif mb-0.5">
                  Gulab Jamun
                </h4>
                <p className="text-white/70 text-[10px] font-light">
                  Classic Delight
                </p>
              </div>

              {/* Item 4 - Motichoor Ladoo */}
              <div className="text-center">
                <div className="relative h-[110px] md:h-[125px] lg:h-[140px] mb-2 overflow-hidden bg-black">
                  <img
                    src="https://tse4.mm.bing.net/th/id/OIP.JKeMEgXuj2MwAMUYAykHCAHaHa?pid=Api&P=0&h=220"
                    alt="Motichoor Ladoo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-[#C9A86A] text-sm md:text-base font-serif mb-0.5">
                  Motichoor Ladoo
                </h4>
                <p className="text-white/70 text-[10px] font-light">
                  Rich and Flavorful
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Essence of Celebration Section */}
      <section className="bg-[#1a3329] py-8 md:py-10 lg:py-12 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="bg-[#f5ede1] overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 items-stretch">

              {/* Left - Image */}
              <div className="relative h-[200px] sm:h-[230px] md:h-[270px] lg:h-[300px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80"
                  alt="The Essence of Celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Right - Content */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-[#2d2d2d] mb-3 leading-tight text-center">
                  The Essence of<br />Celebration
                </h2>

                <p className="text-[#666666] text-xs md:text-sm leading-relaxed mb-4 text-center max-w-lg mx-auto">
                  Every occasion deserves a story<br />
                  as sweet as its memories.
                </p>

                <div className="text-center">
                  <a
                    href="/products"
                    className="group relative inline-block border-2 border-[#C9A86A] text-[#C9A86A] px-6 md:px-8 py-2 md:py-2.5 text-xs md:text-sm tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg"
                  >
                    <span className="relative z-10">Explore Collection</span>
                    <div className="absolute inset-0 bg-[#C9A86A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold">
                      Explore Collection
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />

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
      </div>

      <LocationModal
        isOpen={showLocationModal}
        onClose={handleModalClose}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
}
