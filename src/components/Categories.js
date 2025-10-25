"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import ProductDetail from './ProductDetail';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

const Categories = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const subcategoryRefs = useRef({});

  const categories = useMemo(() => [
    {
      id: 1,
      name: "TRENDING",
      image: "/Category/8.png",
      bgColor: "from-yellow-500 via-yellow-400 to-orange-400",
      subcategories: []
    },
    {
      id: 2,
      name: "SWEETS",
      // image: "/Category/3.png",
        image: "/Category/1.png",
      bgColor: "from-red-700 via-red-600 to-red-500",
      subcategories: ["CLASSIC SWEETS", "BAKLAVA", "HALWA JAAT", "PREMIUM SWEETS", "PRE-ORDER"]
    },
    {
      id: 3,
      name: "DAIRY",
      // image: "/Category/4.png",
         image: "/Category/2.png",
      bgColor: "from-yellow-400 via-yellow-300 to-yellow-200",
      subcategories: ["DAIRY BUTTER", "PURE GHEE"]
    },
    {
      id: 4,
      name: "BAKERY",
      // image: "/Category/5.png",
        image: "/Category/3.png",
      bgColor: "from-teal-500 via-teal-400 to-teal-300",
      subcategories: ["TEA TIME", "BREAKFAST"]
    },
    {
      id: 5,
      name: "CAKES & PASTRIES",
      image: "/Category/4.png",
      bgColor: "from-pink-700 via-pink-600 to-pink-500",
      subcategories: ["HYDERABADI", "PREMIO CAKES", "FRESH CREAM", "DIY CAKES", "PASTRIES"]
    },
    {
      id: 6,
      name: "DESSERTS",
       image: "/Category/5.png",
      bgColor: "from-purple-600 via-purple-500 to-purple-400",
      subcategories: ["DESSERTS"]
    },
    {
      id: 7,
      name: "GIFT BOX",
       image: "/Category/6.png",
      bgColor: "from-orange-600 via-orange-500 to-orange-400",
      subcategories: ["PRE ORDER BOXES", "SPECIAL BOXES", "BABY GIRL BOXES", "BABY BOY BOXES"]
    },
    {
      id: 8,
      name: "PACKED ITEMS",
      image: "/Category/7.png",
      bgColor: "from-gray-600 via-gray-500 to-gray-400",
      subcategories: []
    }
  ], []);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        // Transform Supabase data to match component format
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.base_price.toString(),
          description: product.description,
          image: product.image_url,
          tag: product.tag,
          weight: product.variants && product.variants.length > 0
            ? product.variants[0].size
            : null,
          variants: product.variants || [],
          category: product.category,
          subcategory: product.subcategory
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Dummy product data - matching the card design (fallback)
  const dummyProducts = [
    {
      id: 1,
      name: "Honey (Sidr) 250gm",
      weight: null,
      price: "932",
      description: "Sidr honey is a premium, 100% natural honey produced by bees that collect nectar from the...",
      image: "🍯",
      tag: "TRENDING"
    },
    {
      id: 2,
      name: "Kulfi Falooda",
      weight: "12 Pcs",
      price: "1831",
      description: "Kulfis best described as traditional Pakistani-style ice cream. However, unlike ice...",
      image: "🍨",
      tag: "POPULAR"
    },
    {
      id: 3,
      name: "Bhel Puri (100 GM)",
      weight: null,
      price: "148",
      description: "Bhel Puri is the perfect on-the-go snack—enjoy it anytime, anywhere! It comes with two...",
      image: "🥗",
      tag: "TRENDING"
    },
    {
      id: 4,
      name: "Oat Cookies",
      weight: null,
      price: "186",
      description: "Made with premium oats, our cookies are a rich source of fiber and nutrients. Perfect for...",
      image: "🍪",
      tag: "TRENDING"
    },
    {
      id: 5,
      name: "Kaju Katli",
      weight: "500gm",
      price: "650",
      description: "Premium quality cashew sweets made with pure ghee and finest ingredients for authentic taste...",
      image: "💎",
      tag: null
    },
    {
      id: 6,
      name: "Gulab Jamun",
      weight: "1kg",
      price: "450",
      description: "Soft and delicious gulab jamun made with traditional recipe and soaked in sugar syrup...",
      image: "🍬",
      tag: null
    },
    {
      id: 7,
      name: "Rasgulla",
      weight: "500gm",
      price: "350",
      description: "Traditional Bengali sweet made from cottage cheese, soaked in light sugar syrup...",
      image: "⚪",
      tag: null
    },
    {
      id: 8,
      name: "Barfi Special",
      weight: "1kg",
      price: "850",
      description: "Delicious traditional sweet made with condensed milk and nuts, perfect for celebrations...",
      image: "🟨",
      tag: null
    }
  ];

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
    // Remove auto-scroll to top to keep user's position
  };

  const handleSubcategoryClick = (subcategory) => {
    setSearchQuery(subcategory.toLowerCase());
    // Scroll to the subcategory section
    const subcategoryElement = subcategoryRefs.current[subcategory];
    if (subcategoryElement) {
      subcategoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Typing animation effect for placeholder with rotating suggestions
  useEffect(() => {
    const suggestions = categories.map(cat => 
      cat.subcategories.length > 0 
        ? cat.subcategories[0] 
        : cat.name
    );
    
    let suggestionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;
    
    const type = () => {
      const currentSuggestion = `Search for ${suggestions[suggestionIndex].toLowerCase()}...`;
      
      if (!isDeleting) {
        // Typing
        setPlaceholderText(currentSuggestion.slice(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentSuggestion.length) {
          // Finished typing, wait before deleting
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
          return;
        }
        
        timeoutId = setTimeout(type, 80);
      } else {
        // Deleting
        setPlaceholderText(currentSuggestion.slice(0, charIndex));
        charIndex--;
        
        if (charIndex < 0) {
          // Finished deleting, move to next suggestion
          isDeleting = false;
          charIndex = 0;
          suggestionIndex = (suggestionIndex + 1) % suggestions.length;
          timeoutId = setTimeout(type, 500);
          return;
        }
        
        timeoutId = setTimeout(type, 30);
      }
    };
    
    // Start the animation
    timeoutId = setTimeout(type, 500);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [categories]);

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

  const handleAddToCart = (e, product, selectedVariant = null) => {
    e.stopPropagation(); // Prevent card click
    const variantToAdd = selectedVariant || (product.variants && product.variants.length > 0 ? product.variants[0] : null);
    addToCart(product, 1, variantToAdd);
  };

  const ProductCard = ({ product }) => {
    const [selectedVariantIndex, setSelectedVariantIndex] = React.useState(0);

    const hasVariants = product.variants && product.variants.length > 0;
    const availableVariants = hasVariants ? product.variants.filter(v => v.available !== false) : [];
    const selectedVariant = availableVariants[selectedVariantIndex];
    const displayPrice = selectedVariant ? selectedVariant.price : product.price;

    return (
      <div className="bg-white rounded-lg overflow-hidden border-4 border-transparent shadow-lg flex flex-col h-full hover:border-yellow-300 transition-all duration-300">
        {/* Product Image - Fixed Height */}
        <div
          onClick={() => handleProductClick(product)}
          className="relative h-56 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center p-6 flex-shrink-0 cursor-pointer"
        >
          {product.image && product.image.startsWith('http') ? (
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain"
            />
          ) : (
            <div className="text-6xl filter drop-shadow-lg">{product.image}</div>
          )}
        </div>

        {/* Content Section with Cream Background */}
        <div className="p-5 bg-gradient-to-b from-amber-50/40 to-white flex flex-col flex-grow">
          {/* Product Name */}
          <h3
            onClick={() => handleProductClick(product)}
            className="text-xl font-bold text-amber-700 mb-3 leading-tight line-clamp-2 min-h-[3.5rem] cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-3">
            <span className="text-xs text-red-700 font-bold uppercase tracking-wide">FROM RS. </span>
            <span className="text-red-700 font-bold text-lg">
              {displayPrice}
            </span>
          </div>

          {/* Description */}
          <p
            onClick={() => handleProductClick(product)}
            className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3 flex-grow cursor-pointer"
          >
            {product.description}
          </p>

          {/* Variants - Only show available ones */}
          {availableVariants.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {availableVariants.map((variant, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariantIndex(index);
                  }}
                  className={`px-4 py-2 border-2 rounded-md text-xs font-bold transition-all ${
                    selectedVariantIndex === index
                      ? 'border-gray-800 bg-gray-800 text-white'
                      : 'border-gray-400 text-gray-800 bg-white'
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          )}

          {/* Add Button */}
          <button
            onClick={(e) => handleAddToCart(e, product, selectedVariant)}
            className="w-full text-white py-3 rounded-full font-bold uppercase tracking-wider transition-all shadow-md text-sm"
            style={{ background: 'linear-gradient(to right, #fef399, #f9d84e)' }}
          >
            ADD
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-white min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.15] pointer-events-none z-0"
        style={{
          backgroundImage: `url("https://assets.indolj.io/upload/1757683140-web--3-.png")`,
          backgroundSize: '400px 400px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}>
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
      {/* Main Category Navigation Bar */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto scrollbar-hide py-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(index)}
                className={`group flex-shrink-0 flex flex-col items-center py-3 sm:py-4 px-4 transition-all duration-300 rounded-lg ${
                  selectedCategory === index
                    ? 'bg-white/10 scale-105'
                    : 'hover:bg-white/5 hover:scale-102'
                }`}
              >
                <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 filter drop-shadow-lg transition-transform duration-300 ${
                  selectedCategory === index ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className={`text-xs sm:text-xs md:text-sm font-semibold tracking-wide uppercase text-center transition-colors duration-300 ${
                  selectedCategory === index ? 'text-yellow-300' : 'text-white group-hover:text-yellow-100'
                }`}>
                  {category.name}
                </span>
                {selectedCategory === index && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subcategory Bar */}
      {categories[selectedCategory].subcategories.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 shadow-lg relative z-10 border-b-2 border-yellow-300">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 md:gap-8 py-4 overflow-x-auto scrollbar-hide">
              {categories[selectedCategory].subcategories.map((subcategory, index) => (
                <button
                  key={index}
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className="group flex-shrink-0 text-xs sm:text-sm md:text-base font-bold text-red-800 hover:text-white uppercase tracking-wide transition-all duration-300 hover:scale-110 px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:shadow-lg border-2 border-transparent hover:border-red-800"
                >
                  <span className="relative">
                    {subcategory}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar Section */}
      <div className="bg-gradient-to-b from-orange-50/50 to-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholderText}
              className="relative w-full px-8 sm:px-10 py-5 sm:py-6 pr-16 sm:pr-18 rounded-full border-3 border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-100 focus:outline-none text-gray-800 placeholder-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg bg-white font-medium"
            />
            <button 
              className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white p-4 sm:p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
              style={{ background: 'linear-gradient(to right, #fef399, #f9d84e)' }}
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Categories with Subcategories */}
      <div className="max-w-7xl mx-auto px-4 pb-12 relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-0 w-20 h-20 opacity-5">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-orange-300">
            <circle cx="50" cy="50" r="40"/>
          </svg>
        </div>
        <div className="absolute top-40 right-10 w-16 h-16 opacity-5">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-yellow-300">
            <circle cx="50" cy="50" r="40"/>
          </svg>
        </div>
        <div className="absolute top-96 left-20 w-24 h-24 opacity-5">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-red-300">
            <circle cx="50" cy="50" r="40"/>
          </svg>
        </div>

        {/* Main Category Banner - Only for categories without subcategories */}
        {categories[selectedCategory].subcategories.length === 0 && (
          <>
            <CategoryBanner
              category={categories[selectedCategory]}
              title={categories[selectedCategory].name}
            />

            {/* Main Category Products */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-800"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12 relative z-10 px-2">
                {(products.length > 0 ? products : dummyProducts)
                  .filter(product => {
                    const categoryName = categories[selectedCategory].name;
                    // For TRENDING, show products with TRENDING tag or category
                    if (categoryName === "TRENDING") {
                      return product.tag === "TRENDING" || product.category === "TRENDING";
                    }
                    // For all other categories, show all products with matching category
                    return product.category === categoryName;
                  })
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            )}
          </>
        )}

        {/* Subcategories with Banners and Products */}
        {categories[selectedCategory].subcategories.length > 0 ? (
          categories[selectedCategory].subcategories.map((subcategory, index) => (
            <div
              key={index}
              ref={(el) => (subcategoryRefs.current[subcategory] = el)}
              className="mb-12 scroll-mt-24 relative"
            >
              {/* Decorative Elements for each subcategory */}
              <div className="absolute -top-10 right-0 w-32 h-32 opacity-5">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-orange-200">
                  <circle cx="50" cy="50" r="40"/>
                </svg>
              </div>
              <div className="absolute top-20 -left-10 w-24 h-24 opacity-5">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-yellow-200">
                  <circle cx="50" cy="50" r="40"/>
                </svg>
              </div>

              {/* Subcategory Banner */}
              <CategoryBanner
                category={categories[selectedCategory]}
                title={subcategory}
              />

              {/* Subcategory Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 relative z-10 px-2">
                {(products.length > 0 ? products : dummyProducts)
                  .filter(product =>
                    product.subcategory === subcategory
                  )
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        ...product,
                        name: product.name,
                        tag: index === 0 && product.id === 1 ? "TRENDING" : product.tag
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
      </div>
    </section>
  );
};

export default Categories;
