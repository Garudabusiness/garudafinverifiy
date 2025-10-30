import HeroSlider from './components/HeroSlider';

export default function Page() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* Trust Factors Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why GarudaVerify?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: "✅", title: "Trusted Name", subtitle: "in loan & insurance" },
            { icon: "🇮🇳", title: "Pan-India", subtitle: "trained field agents" },
            { icon: "📍", title: "Geo-tagged", subtitle: "photos & timestamps" },
            { icon: "⚡", title: "API-based", subtitle: "instant data delivery" },
            { icon: "⏱️", title: "24–72 hrs", subtitle: "Fast TAT" },
            { icon: "99%", title: "Verified", subtitle: "1L+ checks accuracy" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
              <div className="text-xs text-slate-600">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Verification Services */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Core Verification Services</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Comprehensive verification solutions powered by technology and field expertise
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Loan Verification Services",
                desc: "For home, personal, and vehicle loans",
                icon: "🏦",
                color: "bg-blue-50 hover:bg-blue-100",
                link: "/services/loan-verifications"
              },
              {
                title: "Insurance Verification Services",
                desc: "Pre & post policy investigation",
                icon: "🛡️",
                color: "bg-green-50 hover:bg-green-100",
                link: "/services/insurance-verifications"
              },
              {
                title: "Vehicle Inspection & Valuation",
                desc: "Condition, ownership & market value",
                icon: "🚗",
                color: "bg-purple-50 hover:bg-purple-100",
                link: "/services/vehicle-inspection-valuation"
              },
              {
                title: "Asset Verification",
                desc: "Ownership, location & usage validation",
                icon: "🏢",
                color: "bg-orange-50 hover:bg-orange-100",
                link: "/services/asset-verification"
              },
              {
                title: "Vendor / HUB Verification",
                desc: "Identity, licenses & capability checks",
                icon: "🏭",
                color: "bg-pink-50 hover:bg-pink-100",
                link: "/services/vendor-hub-verification"
              },
              {
                title: "Document Collection",
                desc: "Secure, OTP-based doorstep pickup",
                icon: "📄",
                color: "bg-yellow-50 hover:bg-yellow-100",
                link: "/services/documents-collection"
              }
            ].map((service, idx) => (
              <a
                key={idx}
                href={service.link}
                className={`${service.color} p-8 rounded-2xl transition-all cursor-pointer group block`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{service.desc}</p>
                <span className="text-[#00B4D8] font-medium text-sm group-hover:underline">Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Industries We Serve</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[
              "Banks & NBFCs",
              "Insurance Companies",
              "FinTech & Lending Startups",
              "Vehicle Dealers & Showrooms",
              "Legal & Recovery Agencies"
            ].map((industry, idx) => (
              <div
                key={idx}
                className="px-6 py-3 bg-white border-2 border-slate-200 rounded-full font-medium text-slate-900 hover:border-[#00B4D8] hover:bg-blue-50 transition-all cursor-pointer"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Technology That Powers Trust</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Our platform combines speed, security, and accuracy
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🔌", title: "API Integration", desc: "Seamless data delivery" },
              { icon: "☁️", title: "Secure Cloud", desc: "Encrypted storage" },
              { icon: "📍", title: "Geo-Tagging", desc: "Time-stamped evidence" },
              { icon: "👥", title: "Role-Based Access", desc: "Admin, Client, Field" }
            ].map((tech, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{tech.title}</h3>
                <p className="text-sm text-slate-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results/Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "24–72 hrs", label: "Typical TAT" },
              { value: "Pan-India", label: "Coverage" },
              { value: "99%+", label: "Verified Accuracy" },
              { value: "1 Lakh+", label: "Checks Completed" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#00B4D8] mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Client Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "Reliable field verification partner with 100% compliance.",
                author: "Risk Head",
                company: "NBFC"
              },
              {
                quote: "Helped reduce insurance claim frauds significantly.",
                author: "Claims Manager",
                company: "Insurance Company"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="text-6xl text-[#00B4D8] mb-4">"</div>
                <p className="text-lg text-slate-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Verify with Confidence?</h2>
          <p className="text-lg text-slate-600 mb-10">
            Join hundreds of financial institutions that trust GarudaVerify for their verification needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Request a Verification Today
            </a>
            <a
              href="/services"
              className="px-10 py-4 rounded-xl border-2 border-[#0052A3] text-[#0052A3] font-semibold text-lg hover:bg-[#0052A3] hover:text-white transition-all"
            >
              Explore Services
            </a>
          </div>
          <div className="mt-8 text-sm text-slate-600">
            <a href="/about" className="hover:text-[#00B4D8] mx-2">About Us</a> ·
            <a href="/services" className="hover:text-[#00B4D8] mx-2">Services</a> ·
            <a href="/contact" className="hover:text-[#00B4D8] mx-2">Contact</a>
          </div>
        </div>
      </section>
    </div>
  );
}
