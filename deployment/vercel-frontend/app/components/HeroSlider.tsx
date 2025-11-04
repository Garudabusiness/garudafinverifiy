'use client';

import { useState, useEffect } from 'react';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  bgGradient: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    title: "Before You Approve,",
    subtitle: "Let Us Verify.",
    description: "Reliable verification solutions for financial institutions, insurers, and lending partners—backed by technology, accuracy, and accountability.",
    bgGradient: "from-blue-900/90 via-blue-800/85 to-cyan-900/90",
    bgImage: "url('https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=80')" // Business handshake
  },
  {
    title: "Trusted Verifications for",
    subtitle: "Loans, Insurance & Assets.",
    description: "Accuracy. Accountability. Assurance.",
    bgGradient: "from-cyan-900/90 via-blue-900/85 to-indigo-900/90",
    bgImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80')" // Business documents
  },
  {
    title: "Pan-India Coverage,",
    subtitle: "Trusted Results.",
    description: "1 Lakh+ verifications completed with 99%+ accuracy across India. Geo-tagged evidence, API delivery, and 24-72 hour turnaround.",
    bgGradient: "from-indigo-900/90 via-blue-800/85 to-cyan-900/90",
    bgImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80')" // India map/geography
  },
  {
    title: "Loan & Insurance,",
    subtitle: "Verification Experts.",
    description: "Comprehensive loan address verification, insurance claim investigation, vehicle inspection, and asset validation services.",
    bgGradient: "from-blue-900/90 via-indigo-800/85 to-blue-900/90",
    bgImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80')" // Financial planning
  },
  {
    title: "Technology-Powered,",
    subtitle: "Field-Verified Trust.",
    description: "API integration, secure cloud storage, geo-tagging, and role-based access. Real field agents delivering real evidence.",
    bgGradient: "from-cyan-900/90 via-blue-900/85 to-indigo-900/90",
    bgImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')" // Technology/digital
  },
  {
    title: "24-72 Hour Turnaround,",
    subtitle: "99%+ Accuracy Rate.",
    description: "Fast, reliable verification services powered by trained field agents across India. API-based delivery with geo-tagged photographic evidence.",
    bgGradient: "from-blue-900/90 via-cyan-800/85 to-blue-900/90",
    bgImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80')" // Data analytics
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slider Container */}
      <div className="relative min-h-[500px] md:min-h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image Layer */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: slide.bgImage }}
            />

            {/* Gradient Overlay for better text visibility */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />

            {/* Content Layer */}
            <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
              <div className="mx-auto max-w-7xl px-6 text-center">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in text-white drop-shadow-2xl">
                  {slide.title}<br />{slide.subtitle}
                </h1>
                <p className="text-lg md:text-xl text-white max-w-4xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/login"
                    className="px-8 py-4 rounded-xl bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Request a Verification
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-4 rounded-xl border-2 border-white text-white font-semibold text-base hover:bg-white hover:text-[#0052A3] transition-all backdrop-blur-sm"
                  >
                    Talk to Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-3 bg-[#00B4D8]'
                : 'w-3 h-3 bg-white/60 hover:bg-white/80'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
