export default function LoanVerificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-7xl">🏦</div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">Loan Verification Services</h1>
              <p className="text-xl text-blue-100 mt-2">Comprehensive Field Verification for Personal, Business, Home, and Property Loans</p>
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
              Our Loan Verification Services support banks, NBFCs, and financial institutions in minimizing default risk by conducting accurate on-field verification of borrowers.
            </p>
            <p className="text-lg text-slate-700">
              Each verification report includes geo-tagged photos, time-stamped visits, and verified documents — ensuring complete authenticity, transparency, and compliance with lending standards.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Verifications */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Loan Verifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Personal Loan Verification",
                icon: "🧍‍♂️",
                desc: "Ensure borrower authenticity and repayment credibility before loan approval.",
                details: [
                  "Residence verification and neighborhood check",
                  "Employment and income confirmation",
                  "Lifestyle and financial stability assessment",
                  "Photo and geo-tagged proof submission"
                ]
              },
              {
                title: "Business Loan Verification",
                icon: "🏢",
                desc: "Verify the existence, credibility, and operational capacity of business borrowers.",
                details: [
                  "Business premise inspection and location verification",
                  "License and registration validation",
                  "Asset and inventory verification",
                  "Financial and operational activity review",
                  "Geo-tagged on-site photographs"
                ]
              },
              {
                title: "Home Loan Verification",
                icon: "🏠",
                desc: "Authenticate property ownership and residential details to avoid fraudulent claims.",
                details: [
                  "Property ownership and occupancy check",
                  "Address and neighborhood verification",
                  "Valuation and infrastructure review",
                  "Borrower-residence mapping with geo-tag evidence"
                ]
              },
              {
                title: "Property Loan Verification",
                icon: "🏘️",
                desc: "Validate property documents and verify the pledged property's physical existence.",
                details: [
                  "Site visit and photo verification of property",
                  "Ownership and encumbrance validation",
                  "Property condition and locality check",
                  "Correlation of documents with actual location"
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
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Deliverables */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Deliverables</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "✅", title: "Geo-tagged, time-stamped reports" },
              { icon: "✅", title: "Photographic and documentary evidence" },
              { icon: "✅", title: "Verified borrower data across loan categories" },
              { icon: "✅", title: "100% field-based, transparent process" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Verify Your Loan Applicants?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Get started with reliable loan verification services today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Request Verification
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
