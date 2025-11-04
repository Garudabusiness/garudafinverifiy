'use client';

import { useState, useEffect, useRef } from 'react';

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
    bgGradient: "from-blue-900/70 via-blue-800/65 to-cyan-900/70",
    bgImage: "url('https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=80')"
  },
  {
    title: "Trusted Verifications for",
    subtitle: "Loans, Insurance & Assets.",
    description: "Accuracy. Accountability. Assurance.",
    bgGradient: "from-cyan-900/70 via-blue-900/65 to-indigo-900/70",
    bgImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80')"
  },
  {
    title: "Pan-India Coverage,",
    subtitle: "Trusted Results.",
    description: "1 Lakh+ verifications completed with 99%+ accuracy across India. Geo-tagged evidence, API delivery, and 24-72 hour turnaround.",
    bgGradient: "from-indigo-900/70 via-blue-800/65 to-cyan-900/70",
    bgImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80')"
  },
  {
    title: "Loan & Insurance,",
    subtitle: "Verification Experts.",
    description: "Comprehensive loan address verification, insurance claim investigation, vehicle inspection, and asset validation services.",
    bgGradient: "from-blue-900/70 via-indigo-800/65 to-blue-900/70",
    bgImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80')"
  },
  {
    title: "Technology-Powered,",
    subtitle: "Field-Verified Trust.",
    description: "API integration, secure cloud storage, geo-tagging, and role-based access. Real field agents delivering real evidence.",
    bgGradient: "from-cyan-900/70 via-blue-900/65 to-indigo-900/70",
    bgImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')"
  },
  {
    title: "24-72 Hour Turnaround,",
    subtitle: "99%+ Accuracy Rate.",
    description: "Fast, reliable verification services powered by trained field agents across India. API-based delivery with geo-tagged photographic evidence.",
    bgGradient: "from-blue-900/70 via-cyan-800/65 to-blue-900/70",
    bgImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80')"
  }
];

const SLIDE_INTERVAL = 5000; // 5 seconds
const RESUME_DELAY = 10000; // 10 seconds

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resumeRef = useRef<NodeJS.Timeout | null>(null);

  // Main auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    // Clear any pending resume timeout
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
      resumeRef.current = null;
    }

    // Start the auto-play interval
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isAutoPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, []);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const resumeAutoPlay = () => {
    // Clear any pending resume timeout
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
      resumeRef.current = null;
    }
    setIsAutoPlaying(true);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseAutoPlay();
    
    // Resume auto-play after delay
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
    }
    resumeRef.current = setTimeout(resumeAutoPlay, RESUME_DELAY);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
    
    // Resume auto-play after delay
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
    }
    resumeRef.current = setTimeout(resumeAutoPlay, RESUME_DELAY);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
    
    // Resume auto-play after delay
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
    }
    resumeRef.current = setTimeout(resumeAutoPlay, RESUME_DELAY);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-900">
      {/* Slider Container */}
      <div className="relative w-full min-h-[500px] md:min-h-[600px]">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: slide.bgImage,
                  backgroundAttachment: 'fixed'
                }}
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.bgGradient}`} />

              {/* Content */}
              <div className="relative w-full h-full min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                <div className="mx-auto max-w-7xl px-6 text-center">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-2xl animate-fade-in">
                    {slide.title}<br />{slide.subtitle}
                  </h1>
                  <p className="text-lg md:text-xl text-white max-w-4xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="https://wa.me/919363090901"
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
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 h-3 bg-[#00B4D8]'
                : 'w-3 h-3 bg-white/60 hover:bg-white/80'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => isAutoPlaying ? pauseAutoPlay() : resumeAutoPlay()}
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