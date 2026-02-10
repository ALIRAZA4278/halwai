"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('takeaway');
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    orderCode: '',
    branch: '',
    dateOfVisit: '',
    complaintDescription: '',
    receipt: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { feedbackType, ...formData });
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-[#234433] to-[#234433] text-white px-6 py-2 rounded-full">
              <span className="text-sm font-semibold uppercase tracking-wider">We Value Your Feedback</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#234433] to-[#234433] bg-clip-text text-transparent mb-4">
            Share Your Experience
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Help us improve our service by sharing your feedback and experience with us.
          </p>
        </div>

        {/* Feedback Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-[#E7BD8B]">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback relating to:</h2>

            {/* Feedback Type Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setFeedbackType('takeaway')}
                className={`px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  feedbackType === 'takeaway'
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={feedbackType === 'takeaway' ? { background: 'linear-gradient(to right, #E7BD8B, #E7BD8B)' } : {}}
              >
                🛍️ Takeaway
              </button>
              <button
                onClick={() => setFeedbackType('dine-in')}
                className={`px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  feedbackType === 'dine-in'
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={feedbackType === 'dine-in' ? { background: 'linear-gradient(to right, #E7BD8B, #E7BD8B)' } : {}}
              >
                🍽️ Dine-in
              </button>
              <button
                onClick={() => setFeedbackType('delivery')}
                className={`px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  feedbackType === 'delivery'
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={feedbackType === 'delivery' ? { background: 'linear-gradient(to right, #E7BD8B, #E7BD8B)' } : {}}
              >
                🚚 Delivery
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
                <select
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none transition-all text-gray-800"
                >
                  <option value="">Select...</option>
                  <option value="guest">Guest</option>
                  <option value="registered">Registered Customer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Phone</label>
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="+92 300 1234567"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Order Code (if available)</label>
                <input
                  type="text"
                  name="orderCode"
                  placeholder="Enter order code"
                  value={formData.orderCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                <input
                  type="text"
                  name="branch"
                  placeholder="Select branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Visit</label>
                <input
                  type="date"
                  name="dateOfVisit"
                  value={formData.dateOfVisit}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none transition-all text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Complaint Description</label>
                <input
                  type="text"
                  name="complaintDescription"
                  placeholder="Brief description"
                  value={formData.complaintDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#234433] focus:border-[#234433] outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Receipt or Proof
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#E7BD8B] transition-colors cursor-pointer bg-gradient-to-b from-gray-50 to-white">
                <input
                  type="file"
                  name="receipt"
                  onChange={handleChange}
                  accept="image/*,.pdf"
                  className="hidden"
                  id="receipt-upload"
                />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="bg-[#FDF4E3] p-4 rounded-full">
                      <svg className="w-10 h-10 text-[#E7BD8B]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 font-semibold">Click to upload receipt</div>
                    <p className="text-sm text-gray-500">Max file size: 10 MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
                style={{ background: 'linear-gradient(to right, #E7BD8B, #E7BD8B)' }}
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
