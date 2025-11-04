export default function VehicleInspectionValuationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-7xl">🚗</div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">Vehicle Inspection & Valuation</h1>
              <p className="text-xl text-purple-100 mt-2">Comprehensive vehicle assessment and market valuation</p>
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
              Our vehicle inspection and valuation services provide detailed assessment of vehicle condition, ownership verification, and accurate market valuation. We serve banks, NBFCs, insurance companies, and vehicle dealers.
            </p>
            <p className="text-lg text-slate-700">
              With trained automotive inspectors and access to market databases, we deliver comprehensive reports with geo-tagged photographs and detailed technical assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Vehicle Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Pre-Purchase Inspection",
                icon: "🔍",
                desc: "Thorough inspection before buying used vehicles",
                details: [
                  "Complete exterior & interior check",
                  "Engine & mechanical assessment",
                  "Test drive evaluation",
                  "Accident history verification",
                  "Hidden defects detection"
                ]
              },
              {
                title: "Loan Collateral Verification",
                icon: "🏦",
                desc: "Vehicle verification for loan applications",
                details: [
                  "Registration document verification",
                  "Ownership validation",
                  "Current condition assessment",
                  "Market value estimation",
                  "Hypothecation status check"
                ]
              },
              {
                title: "Insurance Inspection",
                icon: "🛡️",
                desc: "Pre-insurance and claim assessment",
                details: [
                  "Pre-policy condition check",
                  "Accident damage assessment",
                  "Repair cost estimation",
                  "IDV calculation support",
                  "Total loss assessment"
                ]
              },
              {
                title: "Market Valuation",
                icon: "💰",
                desc: "Accurate current market value assessment",
                details: [
                  "Age & condition factor analysis",
                  "Market trend comparison",
                  "Regional pricing assessment",
                  "Depreciation calculation",
                  "Fair market value report"
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
                      <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Inspection Points */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive Inspection Checklist</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Exterior Inspection",
                items: [
                  "Body paint & finish",
                  "Panel gaps & alignment",
                  "Rust & corrosion",
                  "Glass & mirrors",
                  "Lights & indicators",
                  "Tires & wheels"
                ]
              },
              {
                title: "Interior Inspection",
                items: [
                  "Seats & upholstery",
                  "Dashboard & controls",
                  "Air conditioning",
                  "Entertainment system",
                  "Safety features",
                  "Odometer reading"
                ]
              },
              {
                title: "Mechanical Inspection",
                items: [
                  "Engine condition",
                  "Transmission",
                  "Suspension & steering",
                  "Braking system",
                  "Exhaust system",
                  "Fluid levels"
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-purple-900">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start text-sm text-slate-700">
                      <svg className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Documentation Verified */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Documents Verified</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📄", title: "Registration Certificate (RC)", desc: "Original & validity check" },
              { icon: "🆔", title: "Insurance Policy", desc: "Active coverage verification" },
              { icon: "💳", title: "PUC Certificate", desc: "Pollution under control" },
              { icon: "📋", title: "Service History", desc: "Maintenance records" },
              { icon: "🔐", title: "NOC/Hypothecation", desc: "Loan clearance status" },
              { icon: "📝", title: "Ownership Transfer", desc: "Previous owner details" },
              { icon: "⚖️", title: "Legal Records", desc: "Accident/theft history" },
              { icon: "🎫", title: "Tax & Permits", desc: "Road tax payment status" }
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

      {/* Process */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Inspection Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Schedule", desc: "Inspection appointment booked" },
              { step: "2", title: "Field Visit", desc: "Inspector visits vehicle location" },
              { step: "3", title: "Inspection", desc: "100+ point detailed check" },
              { step: "4", title: "Valuation", desc: "Market value assessment" },
              { step: "5", title: "Report", desc: "Detailed report with photos" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "👨‍🔧", title: "Expert Inspectors", desc: "Certified automotive professionals" },
              { icon: "📍", title: "Geo-Tagged Photos", desc: "Time-stamped evidence documentation" },
              { icon: "⏱️", title: "24-48 Hour TAT", desc: "Quick turnaround time" },
              { icon: "📊", title: "Detailed Reports", desc: "Comprehensive PDF reports" },
              { icon: "🇮🇳", title: "Pan-India Service", desc: "Coverage in all major cities" },
              { icon: "💻", title: "Digital Delivery", desc: "API & portal access" }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl text-center shadow-sm">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Vehicle Inspection?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Get accurate vehicle assessment and valuation reports
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Book Inspection
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-xl border-2 border-purple-600 text-purple-600 font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
