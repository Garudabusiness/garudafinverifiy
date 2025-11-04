import "./globals.css";
import { ReactNode } from "react";
import Image from "next/image";

export const metadata = {
  title: "GarudaVerify – India's Trusted Financial Verification Company",
  description: "Pan-India verification company offering Loan, Insurance, Vehicle, Asset & Vendor checks with API-based delivery, geo-tagged field evidence, and 24–72 hr turnaround."
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="/logo.svg" alt="GarudaVerify Logo" className="h-12 w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#about" className="text-slate-700 hover:text-slate-900">About us</a>
              <div className="relative group">
                <button className="text-slate-700 hover:text-slate-900 flex items-center gap-1">
                  Services
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <a href="#blogs" className="text-slate-700 hover:text-slate-900">Blogs</a>
              <a href="#quote" className="text-slate-700 hover:text-slate-900">Get a quote</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/login" className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-[#00B4D8] hover:bg-[#0096B8] text-white font-medium text-sm transition-colors">
                Get Started →
              </a>
              <a href="/contact" className="px-4 py-2.5 text-slate-700 hover:text-slate-900 font-medium text-sm flex items-center gap-2">
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-slate-900 text-white mt-24">
          {/* Map Section */}
          <div className="bg-slate-800 py-12">
            <div className="mx-auto max-w-7xl px-6">
              <h3 className="text-2xl font-bold mb-6 text-center">Visit Our Office</h3>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4267840524587!2d80.17707931482232!3d13.026782990830654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e0e7e8a1a1%3A0x7a7b8c8c8c8c8c8c!2sMount%20Poonamallee%20Rd%2C%20Ramapuram%2C%20Chennai%2C%20Tamil%20Nadu%20600089!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GarudaVerify Office Location"
                />
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div className="py-12">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="md:col-span-1">
                  <a href="/">
                    <img src="/logo.svg" alt="GarudaVerify" className="h-10 mb-4" style={{ filter: 'brightness(0) invert(1)' }} />
                  </a>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    India's trusted financial verification company providing reliable verification solutions across the nation.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li><a href="/" className="hover:text-[#00B4D8] transition">Home</a></li>
                    <li><a href="/about" className="hover:text-[#00B4D8] transition">About Us</a></li>
                    <li><a href="/services" className="hover:text-[#00B4D8] transition">Services</a></li>
                    <li><a href="/contact" className="hover:text-[#00B4D8] transition">Contact</a></li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-semibold text-white mb-4">Services</h4>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li><a href="/services/loan-verifications" className="hover:text-[#00B4D8] transition">Loan Verification</a></li>
                    <li><a href="/services/insurance-verifications" className="hover:text-[#00B4D8] transition">Insurance Verification</a></li>
                    <li><a href="/services/vehicle-inspection-valuation" className="hover:text-[#00B4D8] transition">Vehicle Inspection</a></li>
                    <li><a href="/services/asset-verification" className="hover:text-[#00B4D8] transition">Asset Verification</a></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                  <ul className="space-y-3 text-slate-400 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>2/28, 2nd Floor, Opp to DLF IT Park, Mount Poonamallee Road, Ramapuram, Chennai - 600089</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#00B4D8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:info@garudaverify.in" className="hover:text-[#00B4D8] transition">info@garudaverify.in</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#00B4D8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+919363090901" className="hover:text-[#00B4D8] transition">+91 93630 90901</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
                <p>© {new Date().getFullYear()} GarudaVerify. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
