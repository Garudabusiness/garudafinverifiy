'use client';

import { useState } from "react";

export default function NavigationHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0 mr-8">
          <img src="/logo.png" alt="GarudaVerify Logo" width="250" height="150" className="h-20 w-auto" />
        </a>

        {/* Navigation Links - Center */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium flex-1 justify-center">
          <a href="/about" className="text-slate-700 hover:text-slate-900 transition">About us</a>
          <div className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="text-slate-700 hover:text-slate-900 flex items-center gap-1 transition">
              Services
              <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50">
                <a href="/services/loan-verifications" className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600">Loan Verification</a>
                <a href="/services/insurance-verifications" className="block px-4 py-2 text-slate-700 hover:bg-green-50 hover:text-green-600">Insurance Verification</a>
                <a href="/services/vehicle-inspection-valuation" className="block px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-600">Vehicle Inspection</a>
                <a href="/services/asset-verification" className="block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600">Asset Verification</a>
                <a href="/services/vendor-hub-verification" className="block px-4 py-2 text-slate-700 hover:bg-pink-50 hover:text-pink-600">Vendor Verification</a>
                <a href="/services/documents-collection" className="block px-4 py-2 text-slate-700 hover:bg-yellow-50 hover:text-yellow-600">Document Collection</a>
              </div>
            )}
          </div>
          <a href="/blog" className="text-slate-700 hover:text-slate-900 transition">Blog</a>
          <a href="/contact" className="text-slate-700 hover:text-slate-900 transition">Contact Us</a>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-8">
          <a href="/admin-login" className="hidden lg:block text-slate-700 hover:text-slate-900 text-sm font-medium transition">
            Admin Login
          </a>
          <a href="https://wa.me/919363090901" target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-2 rounded-full bg-[#00B4D8] hover:bg-[#0096B8] text-white font-medium text-sm transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
