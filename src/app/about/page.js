"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('about.jpeg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="text-[#C9A86A] text-[10px] uppercase tracking-[0.2em] mb-3 font-light flex items-center">
            <span className="block w-8 h-px bg-[#C9A86A] mr-2"></span>
            OUR STORY
            <span className="block w-8 h-px bg-[#C9A86A] ml-2"></span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
            About Halwaiii
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-4 max-w-xl">
            A legacy of taste, tradition, and trust — crafted with love for generations.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-[#1a3329] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* Image */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#C9A86A]/40"></div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#C9A86A]/40"></div>
              <img
                src="about.jpeg"
                alt="Halwaiii Traditional Sweets"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <div className="text-[#C9A86A] text-[10px] uppercase tracking-[0.15em] mb-4 font-light flex items-center">
                <span className="block w-6 h-px bg-[#C9A86A] mr-2"></span>
                WHO WE ARE
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-5 leading-tight">
                A Legacy of<br />Sweet Excellence
              </h2>

              <div className="flex items-center gap-3 mb-5">
                <span className="block w-8 h-px bg-[#C9A86A]"></span>
                <span className="text-[#C9A86A] text-lg">&#10043;</span>
                <span className="block w-8 h-px bg-[#C9A86A]"></span>
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-4">
                For generations, Halwaiii has been crafting the finest traditional sweets,
                preserving the authentic flavors that have defined celebrations across the subcontinent.
                Our recipes are treasured heirlooms, passed down through decades of master craftsmen.
              </p>

              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Every sweet we create tells a story of dedication, quality ingredients,
                and an unwavering commitment to bringing joy to every occasion.
              </p>

              <div className="border-l-2 border-[#C9A86A] pl-4">
                <p className="text-white text-sm italic font-serif leading-relaxed">
                  &ldquo;Where every bite is a celebration of heritage and flavor.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-[#f5ede1] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-12 text-center">
          <div className="text-[#C9A86A] text-[10px] uppercase tracking-[0.15em] mb-3 font-light flex items-center justify-center">
            <span className="block w-8 h-px bg-[#C9A86A] mr-2"></span>
            WHAT WE OFFER
            <span className="block w-8 h-px bg-[#C9A86A] ml-2"></span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#2d2d2d] mb-10 leading-tight">
            Crafted with Care
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Signature Mithai", desc: "Traditional sweets crafted from time-honored recipes, perfect for every celebration." },
              { title: "Fresh Cakes", desc: "Freshly baked cakes with rich flavors for birthdays, weddings, and special moments." },
              { title: "Crispy Nimco", desc: "Savory snacks and nimco made with the finest spices and ingredients." },
              { title: "Gifting Boxes", desc: "Beautifully curated boxes that bring together tradition and elegance." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 group hover:shadow-lg transition-all duration-500">
                <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#C9A86A] text-2xl">&#10043;</span>
                </div>
                <h3 className="font-serif text-[#2d2d2d] text-base md:text-lg mb-3">{item.title}</h3>
                <p className="text-[#666666] text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="bg-[#1a3329] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* Content */}
            <div>
              <div className="text-[#C9A86A] text-[10px] uppercase tracking-[0.15em] mb-4 font-light flex items-center">
                <span className="block w-6 h-px bg-[#C9A86A] mr-2"></span>
                FOUNDER&apos;S STORY
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-5 leading-tight">
                A Vision Born<br />from Passion
              </h2>

              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Our founder&apos;s journey began with a simple dream: to share the authentic taste
                of traditional sweets with the world. What started as a humble endeavor has
                blossomed into a beloved institution, known for its unwavering quality and
                dedication to the art of sweet-making.
              </p>

              <p className="text-white/80 text-sm leading-relaxed mb-6">
                With passion as the foundation and quality as the guiding principle, Halwaiii
                has grown from a small kitchen into a name that families trust for their most
                cherished celebrations.
              </p>

              <p className="text-[#C9A86A] text-sm italic font-serif">
                &ldquo;Every sweet carries a piece of our heart and heritage.&rdquo;
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#C9A86A]/40"></div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#C9A86A]/40"></div>
              <img
                src="about.jpeg"
                alt="The Founder"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-[#f5ede1] py-12 md:py-16 lg:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
          <div className="text-[#C9A86A] text-[10px] uppercase tracking-[0.15em] mb-3 font-light flex items-center justify-center">
            <span className="block w-8 h-px bg-[#C9A86A] mr-2"></span>
            OUR PROMISE
            <span className="block w-8 h-px bg-[#C9A86A] ml-2"></span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#2d2d2d] mb-6 leading-tight">
            Quality You Can Trust
          </h2>
          <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-6">
            From our signature mithai boxes that celebrate every occasion, to indulgent desserts,
            freshly baked cakes, crispy nimco, savory snacks, and even everyday favorites like
            chips & biscuits — we bring you a complete world of flavor under one roof.
          </p>
          <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-8">
            With a passion for quality and a love for tradition, we strive to serve nothing but the best.
            At Halwaiii, every bite is crafted with care, carrying forward the sweetness of our heritage
            and the joy of sharing.
          </p>
          <a
            href="/products"
            className="group relative inline-block border-2 border-[#C9A86A] text-[#C9A86A] px-8 py-2.5 text-sm tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg"
          >
            <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-500">Explore Our Products</span>
            <div className="absolute inset-0 bg-[#C9A86A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold">
              Explore Our Products
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
