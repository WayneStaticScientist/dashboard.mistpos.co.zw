const PrivacyPolicy = () => {
  const lastUpdated = "January 14, 2026";

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for MistPOS</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          MistPOS ("we," "our," or "us") is committed to protecting the privacy
          of our users in Zimbabwe and abroad. This Privacy Policy explains how
          we collect, use, and safeguard your information when you use our
          inventory management application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Business Data:</strong> Inventory lists, pricing, sales
            records, and supplier information.
          </li>
          <li>
            <strong>Account Information:</strong> Name, business name, and email
            address provided during registration.
          </li>
          <li>
            <strong>Usage Data:</strong> Log files, device information, and IP
            addresses to ensure app stability and security.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <p>We use the collected data to:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Provide and maintain the MistPOS service.</li>
          <li>
            Generate business analytics and inventory reports for your use.
          </li>
          <li>Communicate updates or security alerts.</li>
          <li>Comply with the Data Protection Act of Zimbabwe.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          4. Data Storage and Security
        </h2>
        <p>
          We implement industry-standard security measures to protect your
          business data. While we strive to use commercially acceptable means to
          protect your personal information, no method of transmission over the
          internet is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how your data
          is handled, please contact our support team based in Zimbabwe:
        </p>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>
            <strong>Email:</strong> support@mistpos.co.zw
          </p>
          <p>
            <strong>Location:</strong> Zimbabwe
          </p>
          <p>
            <strong>Support:</strong> For all inquiries, please contact us via
            the email address above.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
