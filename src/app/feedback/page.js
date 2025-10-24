"use client";

import React, { useState } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-pink-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl sm:text-5xl font-bold text-red-900 mb-2">Special Boxes</h1>
              <p className="text-xl sm:text-2xl text-pink-600 italic">for every <span className="font-bold">occasion</span></p>
            </div>
          </div>
          {/* Decorative sweet boxes - You can add actual images here */}
          <div className="absolute top-4 left-4 opacity-50">
            <div className="w-20 h-20 bg-orange-200 rounded-lg"></div>
          </div>
          <div className="absolute bottom-4 right-4 opacity-50">
            <div className="w-20 h-20 bg-orange-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback relating to:</h2>

          {/* Feedback Type Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFeedbackType('takeaway')}
              className={`px-6 py-2 rounded-full border-2 font-medium transition-colors ${
                feedbackType === 'takeaway'
                  ? 'bg-red-900 text-white border-red-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-900'
              }`}
            >
              Takeaway
            </button>
            <button
              onClick={() => setFeedbackType('dine-in')}
              className={`px-6 py-2 rounded-full border-2 font-medium transition-colors ${
                feedbackType === 'dine-in'
                  ? 'bg-red-900 text-white border-red-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-900'
              }`}
            >
              Dine-in
            </button>
            <button
              onClick={() => setFeedbackType('delivery')}
              className={`px-6 py-2 rounded-full border-2 font-medium transition-colors ${
                feedbackType === 'delivery'
                  ? 'bg-red-900 text-white border-red-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-900'
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <select
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              >
                <option value="">Select...</option>
                <option value="guest">Guest</option>
                <option value="registered">Registered Customer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Phone</label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Code (if available)</label>
              <input
                type="text"
                name="orderCode"
                value={formData.orderCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Visit</label>
              <input
                type="date"
                name="dateOfVisit"
                value={formData.dateOfVisit}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Description</label>
              <input
                type="text"
                name="complaintDescription"
                value={formData.complaintDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              (require receipt or proof of visit / sale)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-red-800 transition-colors cursor-pointer bg-gray-50">
              <input
                type="file"
                name="receipt"
                onChange={handleChange}
                accept="image/*,.pdf"
                className="hidden"
                id="receipt-upload"
              />
              <label htmlFor="receipt-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                  <div className="text-gray-600 font-medium">Click to upload</div>
                </div>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">Max. file size: 10 MB. Max. files: 1.</p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-red-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-red-900 hover:text-red-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
