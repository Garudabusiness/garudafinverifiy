export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0052A3] to-[#00B4D8] text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About GarudaVerify</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            India's trusted partner for comprehensive financial verification services
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
              <p className="text-lg text-slate-700 mb-4">
                GarudaVerify is a leading verification company in India, specializing in loan verification, insurance investigation, vehicle inspection, and asset verification services. We serve banks, NBFCs, insurance companies, and financial institutions across the nation.
              </p>
              <p className="text-lg text-slate-700 mb-4">
                With a network of trained field agents and cutting-edge technology, we deliver accurate, geo-tagged verification reports within 24-72 hours. Our commitment to transparency, accuracy, and speed has made us the preferred verification partner for over 100+ financial institutions.
              </p>
              <p className="text-lg text-slate-700">
                We have successfully completed 1 Lakh+ verifications with 99%+ accuracy, helping our clients minimize risk and make informed lending decisions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "1L+", label: "Verifications Completed" },
                  { value: "99%+", label: "Accuracy Rate" },
                  { value: "100+", label: "Financial Partners" },
                  { value: "24-72hrs", label: "Turnaround Time" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-[#00B4D8] mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed">
                To provide fast, accurate, and reliable verification services that help financial institutions minimize risk, prevent fraud, and make confident lending decisions. We aim to set industry standards in verification accuracy and turnaround time.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-6xl mb-6">👁️</div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-700 leading-relaxed">
                To become India's most trusted and technology-driven verification company, serving every financial institution with pan-India coverage, real-time reporting, and 100% transparency in all verification processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "✅", title: "Accuracy", desc: "99%+ verification accuracy with thorough field checks" },
              { icon: "⚡", title: "Speed", desc: "24-72 hour turnaround time for all services" },
              { icon: "🔒", title: "Confidentiality", desc: "Complete data security and privacy protection" },
              { icon: "🤝", title: "Integrity", desc: "Honest reporting with geo-tagged evidence" }
            ].map((value, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose GarudaVerify</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🇮🇳",
                title: "Pan-India Coverage",
                desc: "Network of trained field agents in all major cities and towns across India"
              },
              {
                icon: "📍",
                title: "Geo-Tagged Reports",
                desc: "GPS coordinates and timestamps on all photographs for complete transparency"
              },
              {
                icon: "🔌",
                title: "API Integration",
                desc: "Seamless integration with your systems for instant data delivery"
              },
              {
                icon: "👨‍💼",
                title: "Trained Professionals",
                desc: "Experienced field agents with proper training and background verification"
              },
              {
                icon: "💻",
                title: "Digital Platform",
                desc: "User-friendly portal for case tracking and report download"
              },
              {
                icon: "📊",
                title: "Detailed Reports",
                desc: "Comprehensive PDF reports with photographs and investigator remarks"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏦", title: "Banks & NBFCs", desc: "Loan verification for lending decisions" },
              { icon: "🛡️", title: "Insurance Companies", desc: "Pre & post-policy investigation" },
              { icon: "💳", title: "FinTech Companies", desc: "Digital lending verification" },
              { icon: "🚗", title: "Vehicle Dealers", desc: "Used vehicle inspection services" },
              { icon: "⚖️", title: "Legal Agencies", desc: "Asset recovery & investigation" },
              { icon: "🏢", title: "Corporate Firms", desc: "Vendor & employee verification" }
            ].map((industry, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{industry.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{industry.title}</h3>
                <p className="text-sm text-slate-600">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gradient-to-r from-[#0052A3] to-[#00B4D8] text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-blue-100 mb-8">
                Ready to partner with India's most reliable verification company?
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1">Office Address</p>
                    <p className="text-blue-100">2/28, 2nd Floor, Opp to DLF IT Park, Mount Poonamallee Road, Ramapuram, Chennai - 600089</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:info@garudaverify.in" className="text-blue-100 hover:text-white">info@garudaverify.in</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:+919363090901" className="text-blue-100 hover:text-white">+91 93630 90901</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="inline-block">
                <a
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-xl bg-white text-[#0052A3] font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl mb-4"
                >
                  Contact Us
                </a>
                <p className="text-blue-100 text-sm">or</p>
                <a
                  href="https://wa.me/919363090901"
                  className="inline-block px-10 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-[#0052A3] transition-all mt-4"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
