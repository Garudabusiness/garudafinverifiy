export default function DocumentsCollectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-7xl">📄</div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">Document Collection Services</h1>
              <p className="text-xl text-yellow-100 mt-2">Secure, OTP-based doorstep pickup & delivery</p>
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
              Our document collection service provides secure, OTP-based pickup and delivery of important documents from customers to financial institutions. We ensure safe handling, real-time tracking, and timely delivery with complete accountability.
            </p>
            <p className="text-lg text-slate-700">
              Perfect for banks, NBFCs, and insurance companies that need to collect loan documents, KYC papers, claim forms, or any other important paperwork from customers without requiring them to visit your office.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Request", desc: "Collection request created", icon: "📝" },
              { step: "2", title: "OTP Generated", desc: "Unique OTP sent to customer", icon: "🔐" },
              { step: "3", title: "Field Visit", desc: "Agent visits customer location", icon: "🚶" },
              { step: "4", title: "OTP Verification", desc: "Customer shares OTP for pickup", icon: "✅" },
              { step: "5", title: "Delivery", desc: "Documents delivered to you", icon: "📦" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-yellow-500 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm font-semibold text-yellow-600 mb-1">Step {item.step}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔐",
                title: "OTP-Based Security",
                desc: "Unique OTP for each collection ensures only authorized person receives documents"
              },
              {
                icon: "📍",
                title: "Real-Time Tracking",
                desc: "Track your document collection status in real-time on our portal"
              },
              {
                icon: "📸",
                title: "Photo Documentation",
                desc: "Geo-tagged photos of pickup and delivery for complete transparency"
              },
              {
                icon: "⏱️",
                title: "Same-Day Service",
                desc: "Same-day collection and delivery available in major cities"
              },
              {
                icon: "🔒",
                title: "Secure Handling",
                desc: "Tamper-proof packaging and trained personnel for document safety"
              },
              {
                icon: "📱",
                title: "Digital Receipt",
                desc: "Instant digital receipt with timestamp and location details"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Documents */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Documents We Collect</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Loan Documents",
                icon: "💼",
                items: [
                  "Application forms",
                  "Income proof (salary slips, ITR)",
                  "Identity proof (Aadhaar, PAN)",
                  "Address proof",
                  "Bank statements",
                  "Property documents"
                ]
              },
              {
                title: "Insurance Documents",
                icon: "🛡️",
                items: [
                  "Proposal forms",
                  "Medical reports",
                  "ID & address proof",
                  "Claim forms",
                  "Policy documents",
                  "Premium receipts"
                ]
              },
              {
                title: "KYC Documents",
                icon: "🆔",
                items: [
                  "PAN card",
                  "Aadhaar card",
                  "Passport",
                  "Voter ID",
                  "Driving license",
                  "Utility bills"
                ]
              },
              {
                title: "Business Documents",
                icon: "🏢",
                items: [
                  "GST certificates",
                  "Registration documents",
                  "Financial statements",
                  "Partnership deeds",
                  "Trade licenses",
                  "Bank certificates"
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start text-sm text-slate-700">
                      <svg className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

      {/* Security Measures */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Security Measures</h2>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Before Pickup",
                  items: [
                    "OTP sent to customer mobile",
                    "Agent background verified",
                    "Photo ID provided to customer",
                    "Time slot confirmation"
                  ]
                },
                {
                  title: "During Pickup",
                  items: [
                    "OTP verification mandatory",
                    "Customer signs acknowledgment",
                    "Geo-tagged photographs",
                    "Tamper-proof packaging"
                  ]
                },
                {
                  title: "After Pickup",
                  items: [
                    "Real-time status updates",
                    "Secure transportation",
                    "Chain of custody maintained",
                    "Delivery confirmation with photos"
                  ]
                }
              ].map((stage, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold mb-4 text-slate-900">{stage.title}</h3>
                  <ul className="space-y-3">
                    {stage.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-slate-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Service Areas */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Service Turnaround</h2>
              <div className="space-y-4">
                {[
                  { type: "Same-Day", desc: "Within city limits (metro cities)", time: "4-8 hours" },
                  { type: "Next-Day", desc: "Tier-1 & Tier-2 cities", time: "24 hours" },
                  { type: "Standard", desc: "Tier-3 cities & towns", time: "48-72 hours" }
                ].map((service, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900">{service.type}</h3>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {service.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Coverage Areas</h2>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <ul className="space-y-3">
                  {[
                    "All major metro cities",
                    "250+ Tier-1 cities",
                    "500+ Tier-2 cities",
                    "1000+ Tier-3 towns",
                    "Rural areas (selected locations)",
                    "Pan-India coverage available"
                  ].map((area, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <svg className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Service</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "😊", title: "Customer Convenience", desc: "No need to visit office" },
              { icon: "💰", title: "Cost Effective", desc: "Competitive pricing" },
              { icon: "⚡", title: "Fast Service", desc: "Same-day pickup available" },
              { icon: "🔒", title: "100% Safe", desc: "Secure handling guaranteed" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl text-center shadow-sm">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Document Collection?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Schedule a secure document pickup today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Schedule Pickup
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-xl border-2 border-yellow-600 text-yellow-600 font-semibold text-lg hover:bg-yellow-600 hover:text-white transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
