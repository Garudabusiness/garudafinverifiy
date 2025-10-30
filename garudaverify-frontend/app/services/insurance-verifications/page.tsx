export default function InsuranceVerificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-7xl">🛡️</div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">Insurance Verification Services</h1>
              <p className="text-xl text-green-100 mt-2">Pre & post-policy investigation for fraud prevention</p>
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
              Our insurance verification services help insurance companies minimize fraud and validate claims through comprehensive field investigations. We conduct thorough pre-policy and post-policy verifications to ensure accuracy and authenticity.
            </p>
            <p className="text-lg text-slate-700">
              With expertise in health, life, motor, and general insurance investigations, we provide detailed reports with evidence to support your decision-making process.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Verifications */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Insurance Verifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Pre-Policy Investigation",
                icon: "🔍",
                desc: "Verify applicant details before policy issuance",
                details: [
                  "Identity verification",
                  "Address confirmation",
                  "Health history validation",
                  "Occupation verification",
                  "Lifestyle assessment"
                ]
              },
              {
                title: "Post-Policy Investigation",
                icon: "📋",
                desc: "Review policy details after issuance for fraud detection",
                details: [
                  "Document authenticity check",
                  "Information consistency review",
                  "Policy holder verification",
                  "Beneficiary validation",
                  "Fraud pattern detection"
                ]
              },
              {
                title: "Claim Investigation",
                icon: "⚖️",
                desc: "Comprehensive investigation of insurance claims",
                details: [
                  "Incident verification",
                  "Witness statements",
                  "Medical record validation",
                  "Scene investigation",
                  "Loss assessment"
                ]
              },
              {
                title: "Health & Life Insurance",
                icon: "❤️",
                desc: "Specialized verification for health and life policies",
                details: [
                  "Medical history verification",
                  "Hospital records check",
                  "Treatment validation",
                  "Pre-existing condition check",
                  "Lifestyle habits assessment"
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

      {/* Motor Insurance Verification */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Motor Insurance Verification</h2>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Pre-Inspection</h3>
                <ul className="space-y-3">
                  {[
                    "Vehicle condition assessment",
                    "Registration verification",
                    "Ownership validation",
                    "Previous damage check",
                    "Modification detection"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Claim Investigation</h3>
                <ul className="space-y-3">
                  {[
                    "Accident scene verification",
                    "Damage assessment",
                    "FIR & police report review",
                    "Third-party validation",
                    "Repair estimate verification"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Investigation Process */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Investigation Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Case Assignment", desc: "Investigation request received" },
              { step: "2", title: "Field Investigation", desc: "On-site verification & evidence collection" },
              { step: "3", title: "Documentation", desc: "Photographs, statements & records" },
              { step: "4", title: "Analysis", desc: "Fraud pattern detection & risk assessment" },
              { step: "5", title: "Report", desc: "Detailed investigation report delivered" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔒", title: "Fraud Prevention", desc: "Reduce fraudulent claims by 60-70%" },
              { icon: "⏱️", title: "Quick TAT", desc: "Investigation reports within 48-72 hours" },
              { icon: "📊", title: "Detailed Reports", desc: "Comprehensive evidence-based documentation" },
              { icon: "🎯", title: "Accuracy", desc: "99%+ verification accuracy rate" },
              { icon: "🇮🇳", title: "Pan-India", desc: "Coverage across all major cities" },
              { icon: "💼", title: "Experienced Team", desc: "Ex-law enforcement investigators" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Protect Your Insurance Business</h2>
          <p className="text-lg text-slate-600 mb-8">
            Partner with us for reliable insurance verification and investigation services
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="px-10 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Start Investigation
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-xl border-2 border-green-600 text-green-600 font-semibold text-lg hover:bg-green-600 hover:text-white transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
