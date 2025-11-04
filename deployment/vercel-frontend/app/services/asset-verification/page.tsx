export default function AssetVerificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-7xl">🏢</div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">Asset Verification Services</h1>
              <p className="text-xl text-orange-100 mt-2">Ownership, location & usage validation</p>
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
              Our asset verification services help financial institutions validate the existence, ownership, and condition of physical assets pledged as collateral for loans. We provide comprehensive on-site inspection with geo-tagged evidence.
            </p>
            <p className="text-lg text-slate-700">
              From residential and commercial properties to machinery and equipment, we offer thorough verification services to minimize lending risk and ensure asset authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Asset Verification */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Assets We Verify</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Property Verification",
                icon: "🏘️",
                desc: "Residential and commercial property validation",
                details: [
                  "Physical existence confirmation",
                  "Location & address verification",
                  "Construction status assessment",
                  "Occupancy verification",
                  "Legal documentation check"
                ]
              },
              {
                title: "Machinery & Equipment",
                icon: "⚙️",
                desc: "Industrial machinery and equipment verification",
                details: [
                  "Physical condition assessment",
                  "Serial number verification",
                  "Operational status check",
                  "Maintenance records review",
                  "Market value estimation"
                ]
              },
              {
                title: "Stock & Inventory",
                icon: "📦",
                desc: "Business stock and inventory verification",
                details: [
                  "Physical stock count",
                  "Storage condition check",
                  "Quality assessment",
                  "Turnover analysis",
                  "Valuation support"
                ]
              },
              {
                title: "Agricultural Assets",
                icon: "🌾",
                desc: "Farm land and agricultural equipment verification",
                details: [
                  "Land boundary verification",
                  "Cultivation status check",
                  "Water source validation",
                  "Equipment assessment",
                  "Produce verification"
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
                      <svg className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Property Verification Details */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Property Verification Details</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Physical Inspection",
                items: [
                  "Location verification with GPS",
                  "Property dimensions",
                  "Construction quality",
                  "Current condition",
                  "Surrounding area",
                  "Access & connectivity"
                ]
              },
              {
                title: "Ownership Validation",
                items: [
                  "Title deed verification",
                  "Ownership history",
                  "Encumbrance check",
                  "Legal disputes",
                  "Tax payment status",
                  "Municipal records"
                ]
              },
              {
                title: "Usage Assessment",
                items: [
                  "Current occupancy",
                  "Residential/Commercial use",
                  "Rental status",
                  "Modifications done",
                  "Compliance with norms",
                  "Future potential"
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-orange-900">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start text-sm text-slate-700">
                      <svg className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Verified */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Documents We Verify</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📄", title: "Title Deeds", desc: "Ownership documents" },
              { icon: "🏛️", title: "Municipal Records", desc: "Property tax receipts" },
              { icon: "⚖️", title: "Legal Clearances", desc: "NOC & approvals" },
              { icon: "📋", title: "Encumbrance Certificate", desc: "Charge verification" },
              { icon: "🗺️", title: "Survey Documents", desc: "Land records" },
              { icon: "🏗️", title: "Construction Permits", desc: "Building approvals" },
              { icon: "💡", title: "Utility Bills", desc: "Electricity/Water" },
              { icon: "📝", title: "Insurance Policies", desc: "Asset coverage" }
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
              { step: "1", title: "Case Assignment", desc: "Verification request received" },
              { step: "2", title: "Site Visit", desc: "Field agent visits asset location" },
              { step: "3", title: "Inspection", desc: "Detailed physical & document check" },
              { step: "4", title: "Validation", desc: "Cross-verification with records" },
              { step: "5", title: "Report", desc: "Comprehensive report with photos" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: "Accurate Reports", desc: "99%+ verification accuracy" },
              { icon: "📍", title: "Geo-Tagged Evidence", desc: "GPS & time-stamped photos" },
              { icon: "⏱️", title: "Quick TAT", desc: "24-72 hour turnaround" },
              { icon: "👨‍💼", title: "Expert Team", desc: "Trained field investigators" },
              { icon: "🇮🇳", title: "Pan-India", desc: "Coverage across all states" },
              { icon: "💻", title: "Digital Delivery", desc: "API & portal access" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl text-center shadow-sm">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏦", title: "Loan Collateral", desc: "Asset backing for loans" },
              { icon: "🔄", title: "Asset Recovery", desc: "Repossession support" },
              { icon: "📊", title: "Portfolio Review", desc: "Existing loan book audit" },
              { icon: "⚖️", title: "Legal Disputes", desc: "Evidence for proceedings" }
            ].map((useCase, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl text-center shadow-sm">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Asset Verification?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Validate your collateral assets with our comprehensive verification services
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Request Verification
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-xl border-2 border-orange-600 text-orange-600 font-semibold text-lg hover:bg-orange-600 hover:text-white transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
