export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              GarudaVerify (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Types of Data Collected:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information (&quot;Personal Data&quot;) including but not limited to:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
              <li>
                <strong>Usage Data:</strong> We may also collect information how the Service is accessed and used (&quot;Usage Data&quot;). This may include information such as your computer&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.
              </li>
              <li>
                <strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Data</h2>
            <p>GarudaVerify uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Links to Other Sites</h2>
            <p>
              Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
            <p className="mt-4">
              We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;effective date&quot; at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p className="mt-4">
              <strong>GarudaVerify</strong><br />
              2/28, 2nd Floor, Opp to DLF IT Park<br />
              Mount Poonamallee Road, Ramapuram<br />
              Chennai - 600089, India<br />
              Email: <a href="mailto:info@garudaverify.in" className="text-blue-600 hover:underline">info@garudaverify.in</a><br />
              Phone: <a href="tel:+919363090901" className="text-blue-600 hover:underline">+91 93630 90901</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Protection Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>The right to access – You have the right to request copies of your personal data</li>
              <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate</li>
              <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions</li>
              <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data</li>
              <li>The right to object to processing – You have the right to object to our processing of your personal data</li>
              <li>The right to data portability – You have the right to request that we transfer the data we have collected to another organization</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
