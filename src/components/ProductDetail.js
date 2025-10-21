"use client";

import React, { useState } from 'react';

const ProductDetail = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen || !product) return null;

  // Size options with prices
  const sizeOptions = [
    { weight: '250GM', price: '317.79' },
    { weight: '500gm', price: '635.59' },
    { weight: '1 Kg', price: '1271.19' }
  ];

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const totalPrice = (parseFloat(sizeOptions[selectedSize].price) * quantity).toFixed(2);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative border-4 border-yellow-600">

          {/* Close and Share Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-800 transition-colors shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-800 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Container */}
          <div className="grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto">

            {/* Left Side - Product Image */}
            <div className="bg-white p-8 flex items-center justify-center border-r-4 border-yellow-600">
              <div className="w-full max-w-sm">
                <img
                  src="/api/placeholder/400/400"
                  alt={product.name}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="bg-gradient-to-b from-amber-50 to-white p-8">

              {/* Product Title */}
              <h2 className="text-3xl font-serif font-bold text-amber-700 mb-4">
                {product.name || 'Three Milk Cake'}
              </h2>

              {/* Base Price */}
              <div className="mb-6">
                <span className="text-sm text-gray-600 font-semibold">RS. </span>
                <span className="text-3xl font-bold text-gray-800">318</span>
              </div>

              {/* Product Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                A rich, moist dessert soaked in three kinds of milk and topped with whipped cream. Pure indulgence in every bite!
              </p>

              {/* Size Options */}
              <div className="mb-6">
                <div className="space-y-3">
                  {sizeOptions.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-red-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="size"
                          checked={selectedSize === index}
                          onChange={() => setSelectedSize(index)}
                          className="w-5 h-5 text-red-700 focus:ring-red-500"
                        />
                        <span className="text-gray-700 font-medium">{option.weight}</span>
                      </div>
                      <span className="text-gray-800 font-semibold">Rs. {option.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Please enter instructions about this item"
                  className="w-full text-black px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-400 focus:outline-none resize-none"
                  rows="4"
                ></textarea>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-100 rounded-full">
                  <button
                    onClick={decrementQuantity}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors bg-gray-300 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-12 h-12 flex items-center justify-center text-white hover:bg-red-800 transition-colors bg-red-700 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="flex-1 bg-gradient-to-r from-red-700 to-red-800 text-white py-4 rounded-lg font-bold text-lg hover:from-red-800 hover:to-red-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-between px-6">
                  <span>Rs. {totalPrice}</span>
                  <span className="flex items-center gap-2">
                    Add to Cart
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
