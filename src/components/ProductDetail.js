"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const ProductDetail = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const previousProductId = useRef(null);

  // Reset state only when product changes
  useEffect(() => {
    if (isOpen && product?.id !== previousProductId.current) {
      // Use preSelectedVariantIndex if provided, otherwise default to 0
      setSelectedSize(product?.preSelectedVariantIndex ?? 0);
      setQuantity(1);
      setSpecialInstructions('');
      previousProductId.current = product?.id;
    } else if (isOpen && product?.preSelectedVariantIndex !== undefined) {
      // Update selected size if preSelectedVariantIndex changes for the same product
      setSelectedSize(product.preSelectedVariantIndex);
    }
  }, [isOpen, product?.id, product?.preSelectedVariantIndex]);

  if (!isOpen || !product) return null;

  // Get variants from product (from database)
  const hasVariants = product.variants && product.variants.length > 0;
  const sizeOptions = hasVariants ? product.variants : [];

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Calculate price based on selected variant or base price
  const currentPrice = hasVariants
    ? parseFloat(sizeOptions[selectedSize]?.price || product.price)
    : parseFloat(product.price);

  const totalPrice = (currentPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    const selectedVariant = hasVariants ? sizeOptions[selectedSize] : null;
    addToCart(product, quantity, selectedVariant, specialInstructions);
    onClose(); // Close modal after adding to cart
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-white/30 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-x-0 bottom-0 top-[70px] sm:top-[80px] lg:top-[90px] z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl my-auto max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-100px)] overflow-hidden relative border-2 sm:border-4 border-yellow-600">

          {/* Close and Share Buttons */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2 z-10">
            <button className="bg-red-700 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-red-800 transition-colors shadow-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="bg-red-700 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-red-800 transition-colors shadow-lg"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Container */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-100px)] overflow-y-auto">

            {/* Left Side - Product Image */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center border-b-2 lg:border-b-0 lg:border-r-4 border-yellow-600">
              <div className="w-full max-w-[200px] sm:max-w-sm md:max-w-md lg:max-w-lg">
                {product.image && product.image.startsWith('http') ? (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] text-center filter drop-shadow-lg">
                    {product.image || '🍰'}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="bg-gradient-to-b from-amber-50 to-white p-3 sm:p-4 md:p-6 lg:p-8">

              {/* Product Title */}
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-amber-700 mb-2 sm:mb-3 md:mb-4">
                {product.name}
              </h2>

              {/* Base Price */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <span className="text-xs sm:text-sm text-gray-600 font-semibold">RS. </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{product.price}</span>
              </div>

              {/* Product Description */}
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-6">
                {product.description}
              </p>

              {/* Size Options - Only show if product has variants */}
              {hasVariants && (
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm md:text-base">
                    Select Size
                  </label>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {sizeOptions.map((option, index) => (
                      <button
                        key={`size-${index}-${option.size}`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedSize(index);
                        }}
                        className={`flex-1 min-w-[100px] px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all ${
                          selectedSize === index
                            ? 'bg-gradient-to-r from-red-800 to-red-900 text-white border-2 border-red-900 shadow-lg scale-105'
                            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-bold">{option.size}</div>
                          <div className="text-xs opacity-90">Rs. {option.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <label className="block text-gray-700 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Please enter instructions about this item"
                  className="w-full text-black px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-red-400 focus:outline-none resize-none text-xs sm:text-sm md:text-base"
                  rows="2"
                ></textarea>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-100 rounded-full w-fit mx-auto sm:mx-0">
                  <button
                    onClick={decrementQuantity}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors bg-gray-300 rounded-full"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 sm:w-10 md:w-12 text-center font-bold text-gray-800 text-xs sm:text-sm md:text-base">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white hover:bg-red-800 transition-colors bg-red-700 rounded-full"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-red-700 to-red-800 text-white py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-xs sm:text-sm md:text-lg hover:from-red-800 hover:to-red-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-between px-3 sm:px-4 md:px-6"
                >
                  <span className="text-xs sm:text-sm md:text-base">Rs. {totalPrice}</span>
                  <span className="flex items-center gap-1 sm:gap-2">
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
