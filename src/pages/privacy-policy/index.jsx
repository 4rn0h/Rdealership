import React, { useEffect } from 'react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | RoyaMotorsUK';
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-primary text-white py-12 mb-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Our commitment to protecting your personal information and privacy.
          </p>
        </div>
      </div>

      <div className="container-custom">
        <div className="bg-muted p-8 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none">
            <p>Last Updated: January 1, 2025</p>

            <h2>Introduction</h2>
            <p>
              RoyaMotorsUK ("we," "our," or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website, use our services, or communicate with us.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our services, you
              acknowledge that you have read, understood, and agree to be bound by all the terms
              outlined in this Privacy Policy.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect information about you in various ways, including:
            </p>
            <h3>Personal Data</h3>
            <p>
              Personal Data refers to information that identifies you personally, such as:
            </p>
            <ul>
              <li>Name, email address, phone number, and postal address</li>
              <li>Payment information</li>
              <li>Government-issued identification (for vehicle purchases)</li>
              <li>Date of birth and nationality</li>
              <li>Information about vehicles you own, purchase, or show interest in</li>
            </ul>

            <h3>Usage Data</h3>
            <p>
              We may also collect information on how our website is accessed and used. This Usage Data
              may include:
            </p>
            <ul>
              <li>IP address, browser type, and version</li>
              <li>Pages visited and time spent on those pages</li>
              <li>The time and date of your visit</li>
              <li>Unique device identifiers</li>
              <li>Referral source</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Processing vehicle purchases, financing, and delivery arrangements</li>
              <li>Notifying you about changes to our services</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Improving our website and services</li>
              <li>Sending you marketing and promotional communications (with your consent)</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist us in operating our business</li>
              <li>Financial institutions and payment processors for transaction processing</li>
              <li>
                Shipping and logistics partners to facilitate vehicle delivery from the UK to East
                Africa
              </li>
              <li>Legal and regulatory authorities, when required by law</li>
              <li>
                Business partners for marketing purposes (only with your explicit consent)
              </li>
            </ul>

            <h2>International Data Transfers</h2>
            <p>
              As we operate between the UK, Kenya, and Tanzania, your information may be transferred
              to and processed in countries outside your country of residence. We take appropriate
              measures to ensure that your personal data is protected according to applicable data
              protection laws when transferred internationally.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              data against unauthorized access, alteration, disclosure, or destruction. However, no
              method of transmission over the Internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </p>

            <h2>Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding your personal
              data:
            </p>
            <ul>
              <li>The right to access and receive a copy of your personal data</li>
              <li>The right to rectify or update inaccurate or incomplete data</li>
              <li>The right to erasure (the "right to be forgotten")</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
              <li>Rights related to automated decision-making and profiling</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our
              website. You can instruct your browser to refuse all cookies or to indicate when a
              cookie is being sent.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly
              collect personal information from children. If you believe we have collected personal
              information from a child, please contact us immediately.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@royamotorsuk.com</li>
              <li>
                Address: 123 Luxury Lane, London, UK, SW1A 1AA
              </li>
              <li>Phone: +44 123 456 7890</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
