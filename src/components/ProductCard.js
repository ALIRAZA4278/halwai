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
        className="bg-[#E7BD8B] rounded-lg overflow-hidden shadow-lg flex flex-col h-full cursor-pointer hover:shadow-xl"
      >
        {/* Product Image */}
        <div className="relative h-40 md:h-44 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0">
          {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
              loading="lazy"
              width="176"
              height="176"
            />
          ) : (
            <div className="text-4xl md:text-5xl filter drop-shadow-lg">{product.image}</div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3 md:p-4 bg-gradient-to-b from-amber-50/40 to-white flex flex-col flex-grow">
          {/* Product Name */}
          <h3 className="text-base md:text-lg font-bold text-amber-700 mb-2 leading-tight line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-2">
            <span className="text-[10px] text-[#234433] font-bold uppercase tracking-wide">FROM RS. </span>
            <span className="text-[#234433] font-bold text-base md:text-lg">
              {displayPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Variants */}
          {availableVariants.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {availableVariants.map((variant, index) => (
                <button
                  key={`${product.id}-${index}`}
                  type="button"
                  onClick={(e) => handleVariantClick(e, index)}
                  className={`px-3 py-1.5 border-2 rounded-md text-[10px] md:text-xs font-bold ${
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
            className="w-full text-white py-2 md:py-2.5 rounded-full font-bold uppercase tracking-wider shadow-md text-xs md:text-sm bg-gradient-to-r from-[#E7BD8B] to-[#E7BD8B] hover:from-[#d4ab7a] hover:to-[#d4ab7a] cursor-pointer"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
