export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0052A3] to-[#00B4D8] text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Verification Services</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Comprehensive verification solutions tailored for financial institutions across India
          </p>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Loan Verification Services",
                desc: "Comprehensive verification for home, personal, and vehicle loans including residence, employment, and business checks.",
                icon: "🏦",
                color: "bg-blue-50 hover:bg-blue-100",
                link: "/services/loan-verifications",
                features: [
                  "Residence Verification",
                  "Employment Verification",
                  "Business Verification",
                  "Reference Checks"
                ]
              },
              {
                title: "Insurance Verification Services",
                desc: "Pre-policy and post-policy investigations to minimize fraud and validate claims.",
                icon: "🛡️",
                color: "bg-green-50 hover:bg-green-100",
                link: "/services/insurance-verifications",
                features: [
                  "Pre-Policy Investigation",
                  "Post-Policy Investigation",
                  "Claim Investigation",
                  "Health & Life Insurance"
                ]
              },
              {
                title: "Vehicle Inspection & Valuation",
                desc: "Detailed vehicle condition assessment, ownership verification, and market valuation.",
                icon: "🚗",
                color: "bg-purple-50 hover:bg-purple-100",
                link: "/services/vehicle-inspection-valuation",
                features: [
                  "Physical Inspection",
                  "Document Verification",
                  "Market Valuation",
                  "Registration Check"
                ]
              },
              {
                title: "Asset Verification",
                desc: "Validate ownership, location, and usage of properties and assets.",
                icon: "🏢",
                color: "bg-orange-50 hover:bg-orange-100",
                link: "/services/asset-verification",
                features: [
                  "Property Verification",
                  "Ownership Validation",
                  "Location Assessment",
                  "Usage Verification"
                ]
              },
              {
                title: "Vendor / HUB Verification",
                desc: "Identity verification, license checks, and capability assessment for vendors.",
                icon: "🏭",
                color: "bg-pink-50 hover:bg-pink-100",
                link: "/services/vendor-hub-verification",
                features: [
                  "Identity Verification",
                  "License Validation",
                  "Infrastructure Check",
                  "Capability Assessment"
                ]
              },
              {
                title: "Document Collection",
                desc: "Secure, OTP-based doorstep document pickup and delivery service.",
                icon: "📄",
                color: "bg-yellow-50 hover:bg-yellow-100",
                link: "/services/documents-collection",
                features: [
                  "OTP-based Pickup",
                  "Secure Delivery",
                  "Real-time Tracking",
                  "Digital Record"
                ]
              }
            ].map((service, idx) => (
              <a
                key={idx}
                href={service.link}
                className={`${service.color} p-8 rounded-2xl transition-all shadow-sm hover:shadow-lg group block`}
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.desc}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-sm text-slate-700">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="text-[#00B4D8] font-semibold text-sm group-hover:underline">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose GarudaVerify?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "⚡", title: "Fast Turnaround", desc: "24-72 hour delivery" },
              { icon: "🇮🇳", title: "Pan-India Coverage", desc: "Trained field agents" },
              { icon: "📍", title: "Geo-Tagged Reports", desc: "Time-stamped evidence" },
              { icon: "🔌", title: "API Integration", desc: "Seamless data delivery" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Contact us today to discuss your verification needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-xl border-2 border-[#0052A3] text-[#0052A3] font-semibold text-lg hover:bg-[#0052A3] hover:text-white transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
