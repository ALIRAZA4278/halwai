"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-white/30 z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-lg font-bold">My Cart ({cartItemCount})</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-red-900 hover:bg-red-950 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-220px)]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.itemId} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded flex items-center justify-center flex-shrink-0">
                      {item.product.image && item.product.image.startsWith('http') ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      ) : (
                        <div className="text-3xl">{item.product.image}</div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {item.product.name}
                      </h3>
                      {item.selectedVariant && (
                        <p className="text-xs text-gray-600 mt-1">
                          {item.selectedVariant.size}
                        </p>
                      )}
                      {item.specialInstructions && (
                        <p className="text-xs text-gray-500 mt-1 italic truncate">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-red-600 font-bold text-sm">
                          Rs. {item.price}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.itemId)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1 border border-gray-300">
                      <button
                        onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-white bg-red-700 rounded-full hover:bg-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <span className="font-bold text-gray-800">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full text-red-600 text-sm font-medium hover:text-red-700"
            >
              Clear Cart
            </button>

            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-gray-800">Total:</span>
              <span className="text-red-600">Rs. {cartTotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3 rounded-lg font-bold hover:from-red-800 hover:to-red-900 transition-all shadow-lg flex items-center justify-center gap-2">
              <span>Proceed to Checkout</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
