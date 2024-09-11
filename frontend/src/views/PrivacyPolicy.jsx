const PrivacyPolicy = () => {
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-700 mb-4">Effective Date: <strong>[Insert Date]</strong></p>
          <p className="text-gray-700 mb-4">
            At <strong>[Your Company Name]</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or services. By using our site, you agree to the practices described in this policy.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We may collect the following types of personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Contact details</li>
            <li>Payment information (only for purchases)</li>
            <li>Usage data (such as cookies and IP addresses)</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information collected for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>To provide and improve our services</li>
            <li>To process transactions and payments</li>
            <li>To send you important updates or promotional materials</li>
            <li>To analyze usage data and improve our website performance</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
          <p className="text-gray-700 mb-4">
            We do not share your personal information with third parties, except in the following cases:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>To comply with legal obligations</li>
            <li>To protect our rights or the rights of others</li>
            <li>In the event of a business transaction such as a merger or sale of assets</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement reasonable security measures to protect your personal information. However, please note that no method of transmission over the internet is 100% secure.
          </p>
  
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access and correct your personal information</li>
            <li>Request the deletion of your personal data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated "Effective Date."
          </p>
  
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns regarding our Privacy Policy, please contact us at <strong>[Your Contact Information]</strong>.
          </p>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;