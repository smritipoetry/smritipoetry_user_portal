// components/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-xl mt-16 max-w-6xl font-serif">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Privacy Policy
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Introduction
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          Welcome to Smriti's Echoes. We value your privacy and are committed to
          protecting the personal information you share with us. This Privacy
          Policy outlines how we collect, use, and protect your data when you
          visit our website and interact with our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Information We Collect
        </h2>
        <ul className="list-inside list-disc text-lg sm:text-base text-gray-700 space-y-4">
          <li>
            <strong className="font-semibold">Personal Information:</strong> We
            may collect your name, email address, and other details you provide
            when you subscribe to our newsletter or contact us.
          </li>
          <li>
            <strong className="font-semibold">Usage Data:</strong> Information
            about how you interact with our website, such as pages visited, time
            spent, etc.
          </li>
          <li>
            <strong className="font-semibold">Cookies:</strong> We use cookies
            to enhance your experience. These are small files stored on your
            device to remember your preferences.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          How We Use Your Information
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          We may use the information we collect to:
        </p>
        <ul className="list-inside list-disc text-lg sm:text-base text-gray-700 space-y-4">
          <li>Send you newsletters and updates.</li>
          <li>Improve our website and services.</li>
          <li>Respond to inquiries or feedback.</li>
          <li>Analyze usage trends for better functionality.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Sharing Your Information
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          We do not sell or trade your personal information. We may share it
          with trusted third parties, such as email service providers, to
          deliver services, but only with your consent or if required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Data Security
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          We take reasonable measures to protect your personal information.
          However, no internet-based transmission is 100% secure, and we cannot
          guarantee the security of your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Your Rights
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          You have the right to access, correct, delete, and opt-out of
          communications at any time. Please contact us for any such requests.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          We use cookies to improve user experience. You can manage cookie
          settings through your browser, though disabling cookies may limit some
          functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Links to Other Websites
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          Our website may contain links to third-party sites. We are not
          responsible for the privacy practices of these sites, so we recommend
          reading their privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Changes to This Privacy Policy
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time. Changes will be
          posted here with the updated date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-lg sm:text-base text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy or our practices,
          please contact us at:{" "}
          <a
            href="mailto:sjhapoetry@gmail.com"
            className="text-blue-600 hover:underline"
          >
            sjhapoetry@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
