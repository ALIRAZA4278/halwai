"use client";

import React, { useState } from 'react';

const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  // Simple local state - each card manages its own variant
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const hasVariants = product.variants && product.variants.length > 0;
  const availableVariants = hasVariants ? product.variants.filter(v => v.available !== false) : [];
  const selectedVariant = availableVariants[selectedVariantIndex];
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleVariantClick = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedVariantIndex(index);
  };

  const handleCardClick = () => {
    onProductClick(product, selectedVariantIndex);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant);
  };

  return (
    <div className="relative">
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full cursor-pointer hover:shadow-xl"
      >
        {/* Product Image */}
        <div className="relative h-56 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center p-6 flex-shrink-0">
          {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full"
              loading="lazy"
              width="224"
              height="224"
            />
          ) : (
            <div className="text-6xl filter drop-shadow-lg">{product.image}</div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 bg-gradient-to-b from-amber-50/40 to-white flex flex-col flex-grow">
          {/* Product Name */}
          <h3 className="text-xl font-bold text-amber-700 mb-3 leading-tight line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-3">
            <span className="text-xs text-[#234433] font-bold uppercase tracking-wide">FROM RS. </span>
            <span className="text-[#234433] font-bold text-lg">
              {displayPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3 flex-grow">
            {product.description}
          </p>

          {/* Variants */}
          {availableVariants.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {availableVariants.map((variant, index) => (
                <button
                  key={`${product.id}-${index}`}
                  type="button"
                  onClick={(e) => handleVariantClick(e, index)}
                  className={`px-4 py-2 border-2 rounded-md text-xs font-bold ${
                    selectedVariantIndex === index
                      ? 'border-gray-800 bg-gray-800 text-white shadow-md'
                      : 'border-gray-400 text-gray-800 bg-white hover:border-gray-500'
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          )}

          {/* Add Button */}
          <button
            onClick={handleAddClick}
            className="w-full text-white py-3 rounded-full font-bold uppercase tracking-wider shadow-md text-sm bg-gradient-to-r from-[#E7BD8B] to-[#E7BD8B] hover:from-[#d4ab7a] hover:to-[#d4ab7a] cursor-pointer"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
