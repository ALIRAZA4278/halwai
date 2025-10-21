"use client";

import React, { useState, useRef } from 'react';
import ProductDetail from './ProductDetail';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const subcategoryRefs = useRef({});

  const categories = [
    {
      id: 1,
      name: "TRENDING",
      icon: "🏆",
      bgColor: "from-yellow-500 via-yellow-400 to-orange-400",
      subcategories: ["TRENDING HOME"]
    },
    {
      id: 2,
      name: "AMAZING SUMMER",
      icon: "🥭",
      bgColor: "from-orange-400 via-orange-300 to-yellow-300",
      subcategories: []
    },
    {
      id: 3,
      name: "SWEETS",
      icon: "🍬",
      bgColor: "from-red-700 via-red-600 to-red-500",
      subcategories: ["CLASSIC SWEETS", "BAKLAVA", "HALWA JAAT", "PREMIUM SWEETS", "PRE-ORDER"]
    },
    {
      id: 4,
      name: "DAIRY",
      icon: "🧈",
      bgColor: "from-yellow-400 via-yellow-300 to-yellow-200",
      subcategories: ["DAIRY BUTTER", "PURE GHEE"]
    },
    {
      id: 5,
      name: "BAKERY",
      icon: "🥐",
      bgColor: "from-teal-500 via-teal-400 to-teal-300",
      subcategories: ["TEA TIME", "BREAKFAST"]
    },
    {
      id: 6,
      name: "CAKES & PASTRIES",
      icon: "🎂",
      bgColor: "from-pink-700 via-pink-600 to-pink-500",
      subcategories: ["HYDERABADI", "PREMIO CAKES", "FRESH CREAM", "DIY CAKES", "PASTRIES"]
    },
    {
      id: 7,
      name: "DESSERTS",
      icon: "🍨",
      bgColor: "from-amber-100 via-amber-50 to-white",
      subcategories: ["DESSERTS"]
    },
    {
      id: 8,
      name: "GIFT BOX",
      icon: "🎁",
      bgColor: "from-orange-600 via-orange-500 to-orange-400",
      subcategories: ["PRE ORDER BOXES", "SPECIAL BOXES", "BABY GIRL BOXES", "BABY BOY BOXES"]
    },
    {
      id: 9,
      name: "PACKED ITEMS",
      icon: "📦",
      bgColor: "from-purple-600 via-purple-500 to-purple-400",
      subcategories: []
    }
  ];

  // Dummy product data - matching the honey card design
  const dummyProducts = [
    {
      id: 1,
      name: "Honey (Sidr)",
      weight: "250gm",
      price: "932",
      description: "Pure honey is a premium 100% natural honey produced by bees that collect nectar from the...",
      image: "🍯",
      tag: "TRENDING"
    },
    {
      id: 2,
      name: "Kaju Katli",
      weight: "500gm",
      price: "650",
      description: "Premium quality cashew sweets made with pure ghee and finest ingredients for authentic taste...",
      image: "💎",
      tag: null
    },
    {
      id: 3,
      name: "Gulab Jamun",
      weight: "1kg",
      price: "450",
      description: "Soft and delicious gulab jamun made with traditional recipe and soaked in sugar syrup...",
      image: "🍬",
      tag: null
    },
    {
      id: 4,
      name: "Rasgulla",
      weight: "500gm",
      price: "350",
      description: "Traditional Bengali sweet made from cottage cheese, soaked in light sugar syrup...",
      image: "⚪",
      tag: null
    }
  ];

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubcategoryClick = (subcategory) => {
    setSearchQuery(subcategory.toLowerCase());
    // Scroll to the subcategory section
    const subcategoryElement = subcategoryRefs.current[subcategory];
    if (subcategoryElement) {
      subcategoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const CategoryBanner = ({ category, title }) => (
    <div className={`relative h-48 md:h-56 rounded-lg overflow-hidden shadow-xl bg-gradient-to-r ${category.bgColor} mb-8`}>
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0c27.614 0 50 22.386 50 50s-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0zm0 10c22.091 0 40 17.909 40 40s-17.909 40-40 40S10 72.091 10 50 27.909 10 50 10z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             backgroundSize: '80px 80px',
             backgroundPosition: 'center'
           }}>
      </div>

      {/* Lotus/Decorative Icon - Left Side */}
      <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2">
        <div className="text-white/30 text-5xl md:text-7xl">❋</div>
      </div>

      {/* Lotus/Decorative Icon - Right Side */}
      <div className="absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2">
        <div className="text-white/30 text-5xl md:text-7xl">❋</div>
      </div>

      {/* Category Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <div className="mb-3">
          <div className="text-white/80 text-3xl">❋</div>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white text-center drop-shadow-lg tracking-wide">
          {title}
        </h2>
      </div>
    </div>
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  const ProductCard = ({ product }) => (
    <div
      onClick={() => handleProductClick(product)}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Product Image with Tag */}
      <div className="relative h-64 bg-white flex items-center justify-center p-6">
        {product.tag && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase shadow-md">
            {product.tag}
          </div>
        )}
        <div className="text-8xl filter drop-shadow-lg">{product.image}</div>
      </div>

      {/* Product Info */}
      <div className="p-5 text-center border-t border-gray-100">
        <h3 className="text-xl font-bold text-amber-700 mb-1 font-serif">
          {product.name} {product.weight}
        </h3>

        <div className="my-3">
          <span className="text-sm text-gray-600 font-semibold">RS. </span>
          <span className="text-2xl font-bold text-gray-800">{product.price}</span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>

        <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-full font-semibold uppercase tracking-wide hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg">
          Add
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative bg-white">
      {/* Main Category Navigation Bar */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(index)}
                className={`flex-shrink-0 flex flex-col items-center py-4 px-3 md:px-6 transition-all duration-300 border-b-4 ${
                  selectedCategory === index
                    ? 'border-yellow-400'
                    : 'border-transparent hover:border-yellow-200'
                }`}
              >
                <div className="text-3xl md:text-4xl mb-2 filter drop-shadow-lg">
                  {category.icon}
                </div>
                <span className={`text-xs md:text-sm font-semibold tracking-wide uppercase ${
                  selectedCategory === index ? 'text-yellow-400' : 'text-white'
                }`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subcategory Bar */}
      {categories[selectedCategory].subcategories.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 sticky top-0 z-10 shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-4 md:gap-8 py-4 overflow-x-auto scrollbar-hide">
              {categories[selectedCategory].subcategories.map((subcategory, index) => (
                <button
                  key={index}
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className="flex-shrink-0 text-sm md:text-base font-semibold text-red-800 hover:text-red-900 uppercase tracking-wide transition-all hover:scale-105"
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar Section */}
      <div className="bg-gradient-to-b from-orange-50 to-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search for ${categories[selectedCategory].subcategories.length > 0
                ? categories[selectedCategory].subcategories[0].toLowerCase()
                : categories[selectedCategory].name.toLowerCase()}...`}
              className="w-full px-6 py-4 pr-14 rounded-full border-2 border-red-200 focus:border-red-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-md"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-3 rounded-full hover:bg-red-800 transition-colors shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Categories with Subcategories */}
      <div className="max-w-7xl mx-auto px-4 pb-12">

        {/* Main Category Banner */}
        <CategoryBanner
          category={categories[selectedCategory]}
          title={categories[selectedCategory].name}
        />

        {/* Main Category Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Subcategories with Banners and Products */}
        {categories[selectedCategory].subcategories.length > 0 ? (
          categories[selectedCategory].subcategories.map((subcategory, index) => (
            <div
              key={index}
              ref={(el) => (subcategoryRefs.current[subcategory] = el)}
              className="mb-12 scroll-mt-24"
            >
              {/* Subcategory Banner */}
              <CategoryBanner
                category={categories[selectedCategory]}
                title={subcategory}
              />

              {/* Subcategory Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dummyProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      name: product.name,
                      tag: index === 0 && product.id === 1 ? "TRENDING" : null
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        ) : null}
      </div>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={closeProductDetail}
      />

      {/* Hide scrollbar for horizontal scroll */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Categories;
