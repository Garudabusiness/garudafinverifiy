export default function VendorHubVerificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-400 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-7xl">🏭</div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">Vendor / HUB Verification</h1>
              <p className="text-xl text-pink-100 mt-2">Identity, licenses & capability assessment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-slate-700 mb-4">
              Our vendor and hub verification services help businesses validate the authenticity, capability, and compliance of their vendors, suppliers, and service partners. We conduct comprehensive on-site inspections to ensure your vendor network is trustworthy and capable.
            </p>
            <p className="text-lg text-slate-700">
              From identity verification to license validation and infrastructure assessment, we provide detailed reports to help you make informed partnership decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Verification */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Verification Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Identity Verification",
                icon: "🆔",
                desc: "Validate vendor/business owner identity and background",
                details: [
                  "Owner identity verification",
                  "Company registration check",
                  "PAN & GST validation",
                  "Director/Partner verification",
                  "Background screening"
                ]
              },
              {
                title: "Business Verification",
                icon: "🏢",
                desc: "Confirm business existence and operations",
                details: [
                  "Office/facility inspection",
                  "Business signage verification",
                  "Employee count validation",
                  "Operations assessment",
                  "Business activity confirmation"
                ]
              },
              {
                title: "License & Compliance",
                icon: "📜",
                desc: "Verify all necessary licenses and certifications",
                details: [
                  "Trade license verification",
                  "Industry-specific permits",
                  "ISO certifications",
                  "Quality standards",
                  "Regulatory compliance"
                ]
              },
              {
                title: "Capability Assessment",
                icon: "⚙️",
                desc: "Evaluate vendor capacity and infrastructure",
                details: [
                  "Production capacity check",
                  "Equipment assessment",
                  "Technology evaluation",
                  "Quality control systems",
                  "Delivery capability"
                ]
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 mb-6">{item.desc}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start text-sm text-slate-700">
                      <svg className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hub Verification */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Delivery Hub Verification</h2>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl">
            <p className="text-lg text-slate-700 mb-6 text-center">
              Specialized verification for logistics and delivery hubs
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Infrastructure Check</h3>
                <ul className="space-y-3">
                  {[
                    "Warehouse/storage facility",
                    "Loading/unloading capacity",
                    "Security arrangements",
                    "Storage conditions",
                    "Safety compliance"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Operations</h3>
                <ul className="space-y-3">
                  {[
                    "Staff strength verification",
                    "Working hours validation",
                    "Delivery fleet check",
                    "Technology systems",
                    "Process documentation"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Documentation</h3>
                <ul className="space-y-3">
                  {[
                    "Business registration",
                    "Rental/lease agreement",
                    "Insurance policies",
                    "Employee records",
                    "Financial documents"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Verified */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Documents We Verify</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📋", title: "Company Registration", desc: "ROC/MCA documents" },
              { icon: "💼", title: "GST Certificate", desc: "GST registration" },
              { icon: "🆔", title: "PAN Card", desc: "Business PAN" },
              { icon: "📜", title: "Trade License", desc: "Municipal license" },
              { icon: "🏭", title: "Factory License", desc: "Industrial permits" },
              { icon: "🔐", title: "ISO Certificates", desc: "Quality certifications" },
              { icon: "📄", title: "Financial Records", desc: "Bank statements" },
              { icon: "🤝", title: "Partnership Deed", desc: "Legal agreements" }
            ].map((doc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{doc.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">{doc.title}</h3>
                <p className="text-xs text-slate-600">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Verification Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Request", desc: "Vendor details received" },
              { step: "2", title: "Site Visit", desc: "Field inspection scheduled" },
              { step: "3", title: "Verification", desc: "Documents & infrastructure check" },
              { step: "4", title: "Assessment", desc: "Capability evaluation" },
              { step: "5", title: "Report", desc: "Comprehensive report delivered" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📦", title: "E-commerce Vendors", desc: "Seller verification" },
              { icon: "🚚", title: "Logistics Partners", desc: "Hub & fleet verification" },
              { icon: "🏭", title: "Suppliers", desc: "Manufacturing capability" },
              { icon: "🔧", title: "Service Providers", desc: "Capability assessment" }
            ].map((useCase, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl text-center shadow-sm">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔍", title: "Risk Mitigation", desc: "Reduce vendor-related risks" },
              { icon: "📍", title: "Geo-Tagged Evidence", desc: "Documented field visits" },
              { icon: "⏱️", title: "Quick TAT", desc: "24-72 hour turnaround" },
              { icon: "✅", title: "Comprehensive", desc: "360-degree verification" },
              { icon: "🇮🇳", title: "Pan-India", desc: "Coverage nationwide" },
              { icon: "💻", title: "Digital Reports", desc: "API & portal delivery" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl text-center shadow-sm">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Verify Your Vendors Today</h2>
          <p className="text-lg text-slate-600 mb-8">
            Ensure your vendor network is trustworthy and capable
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Request Verification
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-xl border-2 border-pink-600 text-pink-600 font-semibold text-lg hover:bg-pink-600 hover:text-white transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
