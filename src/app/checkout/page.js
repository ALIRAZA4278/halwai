'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, cartItemCount, clearCart } = useCart();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, router]);

  // Form state
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Delivery Address
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',

    // Order Details
    deliveryDate: '',
    deliveryTime: '',
    orderNotes: '',

    // Payment Method
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Contact validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Address validation
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    // Delivery details
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
    if (!formData.deliveryTime) newErrors.deliveryTime = 'Delivery time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        items: cartItems,
        subtotal: cartTotal,
        deliveryCharges: cartTotal >= 500 ? 0 : 50,
        total: cartTotal >= 500 ? cartTotal : cartTotal + 50,
        orderDate: new Date().toISOString(),
      };

      // Here you would typically send the order to your backend
      console.log('Order Data:', orderData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      alert('Order placed successfully! Thank you for your order.');
      router.push('/');

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate delivery charges
  const deliveryCharges = cartTotal >= 500 ? 0 : 50;
  const finalTotal = cartTotal + deliveryCharges;

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (cartItems.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navbar />

      <main className="flex-grow pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-[#234433] transition-colors"
              >
                Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-[#234433] font-semibold">Checkout</span>
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#234433] via-[#234433] to-[#234433] mb-2">
              Complete Your Order
            </h1>
            <p className="text-gray-600">Fill in your details to place your order</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-[#E7BD8B]">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#234433]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Contact Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name <span className="text-[#234433]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                          errors.firstName ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="error-message mt-1 text-sm text-[#234433]">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name <span className="text-[#234433]">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                          errors.lastName ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="error-message mt-1 text-sm text-[#234433]">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-[#234433]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                          errors.email ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="error-message mt-1 text-sm text-[#234433]">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-[#234433]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                          errors.phone ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                        }`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <p className="error-message mt-1 text-sm text-[#234433]">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-[#E7BD8B]">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#234433]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Delivery Address
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address <span className="text-[#234433]">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                          errors.address ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                        }`}
                        placeholder="House no., Building name, Street"
                      />
                      {errors.address && <p className="error-message mt-1 text-sm text-[#234433]">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apartment, Suite, etc. (Optional)
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400"
                        placeholder="Apartment, suite, floor"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City <span className="text-[#234433]">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                            errors.city ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                          }`}
                          placeholder="City"
                        />
                        {errors.city && <p className="error-message mt-1 text-sm text-[#234433]">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          State <span className="text-[#234433]">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                            errors.state ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                          }`}
                          placeholder="State"
                        />
                        {errors.state && <p className="error-message mt-1 text-sm text-[#234433]">{errors.state}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Pincode <span className="text-[#234433]">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400 ${
                            errors.pincode ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                          }`}
                          placeholder="6-digit pincode"
                          maxLength="6"
                        />
                        {errors.pincode && <p className="error-message mt-1 text-sm text-[#234433]">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-[#E7BD8B]">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#234433]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Delivery Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Date <span className="text-[#234433]">*</span>
                      </label>
                      <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        min={minDate}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 ${
                          errors.deliveryDate ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                        }`}
                      />
                      {errors.deliveryDate && <p className="error-message mt-1 text-sm text-[#234433]">{errors.deliveryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Time <span className="text-[#234433]">*</span>
                      </label>
                      <select
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#234433] outline-none transition-all text-gray-800 ${
                          errors.deliveryTime ? 'border-[#234433]' : 'border-gray-200 focus:border-[#234433]'
                        }`}
                      >
                        <option value="">Select time slot</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                        <option value="evening">Evening (3 PM - 6 PM)</option>
                        <option value="night">Night (6 PM - 9 PM)</option>
                      </select>
                      {errors.deliveryTime && <p className="error-message mt-1 text-sm text-[#234433]">{errors.deliveryTime}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none resize-none transition-all text-gray-800 placeholder-gray-400"
                      placeholder="Any special instructions for your order?"
                    ></textarea>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-[#E7BD8B]">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#234433]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#234433] transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-[#234433] focus:ring-[#234433]"
                      />
                      <div className="flex-grow">
                        <div className="font-semibold text-gray-800">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when you receive your order</div>
                      </div>
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </label>

                    <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#234433] transition-all opacity-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        disabled
                        className="w-5 h-5 text-[#234433] focus:ring-[#234433]"
                      />
                      <div className="flex-grow">
                        <div className="font-semibold text-gray-800">Online Payment</div>
                        <div className="text-sm text-gray-600">UPI, Cards, Net Banking (Coming Soon)</div>
                      </div>
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-amber-50 to-[#FDF4E3] rounded-2xl shadow-xl p-6 border-2 border-[#E7BD8B]">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <svg className="w-6 h-6 text-[#234433]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.itemId} className="bg-white rounded-lg p-3 flex gap-3 border border-[#FDF4E3]">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {item.product.image && item.product.image.startsWith('http') ? (
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-3xl">{item.product.image || '🍰'}</span>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-semibold text-sm text-gray-800 truncate">{item.product.name}</h3>
                            {item.selectedVariant && (
                              <p className="text-xs text-gray-600">{item.selectedVariant.size}</p>
                            )}
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                              <span className="font-bold text-[#234433]">₹{item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t-2 border-[#E7BD8B] pt-4 space-y-3">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal ({cartItemCount} items)</span>
                        <span className="font-semibold">₹{cartTotal}</span>
                      </div>

                      <div className="flex justify-between text-gray-700">
                        <span>Delivery Charges</span>
                        {deliveryCharges === 0 ? (
                          <span className="font-semibold text-green-600">FREE</span>
                        ) : (
                          <span className="font-semibold">₹{deliveryCharges}</span>
                        )}
                      </div>

                      {cartTotal < 500 && (
                        <div className="bg-[#FDF4E3] border border-[#E7BD8B] rounded-lg p-2 text-xs text-gray-700">
                          Add ₹{500 - cartTotal} more for FREE delivery!
                        </div>
                      )}

                      <div className="border-t-2 border-[#E7BD8B] pt-3 flex justify-between text-lg font-bold">
                        <span className="text-gray-800">Total Amount</span>
                        <span className="text-[#234433]">₹{finalTotal}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full mt-6 bg-gradient-to-r from-[#234433] to-[#234433] text-white py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all shadow-lg hover:from-[#234433]/90 hover:to-[#234433]/90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Place Order'
                      )}
                    </button>

                    {/* Security Badge */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Secure Checkout
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
