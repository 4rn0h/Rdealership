import React, { useEffect } from 'react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | RoyaMotorsUK';
  }, []);

  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 mb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 luxury-gradient opacity-95"></div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0em0xNi0yYTIgMiAwIDEgMSAwLTQgMiAyIDAgMCAxIDAgNHptLTQ0IDBhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0em0xNi00NGEyIDIgMCAxIDEgMCA0IDIgMiAwIDAgMSAwLTR6TTAgMTZhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-float">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-accent-foreground max-w-3xl mx-auto font-caption">
            Our commitment to protecting your personal information and privacy.
          </p>
        </div>
      </div>

      <div className="container-custom">
        {/* Last Updated Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-card border border-border px-6 py-3 rounded-full luxury-shadow-subtle">
            <p className="text-accent font-data flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last Updated: January 1, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card p-8 md:p-12 rounded-lg luxury-shadow-prominent border border-border relative">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-accent"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent"></div>
          
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-strong:text-foreground prose-headings:border-b prose-headings:border-border prose-headings:pb-3 prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-xl prose-h3:mt-8 prose-h2:flex prose-h2:items-center">
            
            {/* Introduction Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl">Introduction</h2>
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
            </div>

            {/* Information We Collect Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-accent opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Information We Collect
              </h2>
              <p>
                We may collect information about you in various ways, including:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium">
                  <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Data
                  </h3>
                  <p className="mb-3">
                    Personal Data refers to information that identifies you personally, such as:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Name, email address, phone number, and postal address</li>
                    <li>Payment information</li>
                    <li>Government-issued identification (for vehicle purchases)</li>
                    <li>Date of birth and nationality</li>
                    <li>Information about vehicles you own, purchase, or show interest in</li>
                  </ul>
                </div>
                
                <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium">
                  <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Usage Data
                  </h3>
                  <p className="mb-3">
                    We may also collect information on how our website is accessed and used. This Usage Data
                    may include:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>IP address, browser type, and version</li>
                    <li>Pages visited and time spent on those pages</li>
                    <li>The time and date of your visit</li>
                    <li>Unique device identifiers</li>
                    <li>Referral source</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                How We Use Your Information
              </h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Providing and maintaining our services</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Processing vehicle purchases, financing, and delivery arrangements</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Notifying you about changes to our services</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Responding to your inquiries and providing customer support</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Improving our website and services</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Sending you marketing and promotional communications (with your consent)</span>
                </div>
              </div>
            </div>

            {/* Disclosure of Your Information Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Disclosure of Your Information
              </h2>
              <p>
                We may share your information with:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Service providers who assist us in operating our business</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Financial institutions and payment processors for transaction processing</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Shipping and logistics partners to facilitate vehicle delivery</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Legal and regulatory authorities, when required by law</span>
                </div>
                <div className="flex items-start md:col-span-2">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Business partners for marketing purposes (only with your explicit consent)</span>
                </div>
              </div>
            </div>

            {/* International Data Transfers Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                International Data Transfers
              </h2>
              <p>
                As we operate between the UK, Kenya, and Tanzania, your information may be transferred
                to and processed in countries outside your country of residence. We take appropriate
                measures to ensure that your personal data is protected according to applicable data
                protection laws when transferred internationally.
              </p>
            </div>

            {/* Data Security Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal
                data against unauthorized access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Data Protection Rights Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Your Data Protection Rights
              </h2>
              <p>
                Depending on your location, you may have the following rights regarding your personal
                data:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>The right to access and receive a copy of your personal data</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>The right to rectify or update inaccurate or incomplete data</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>The right to erasure (the "right to be forgotten")</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>The right to restrict processing</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>The right to data portability</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>The right to object to processing</span>
                </div>
                <div className="flex items-start md:col-span-2">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Rights related to automated decision-making and profiling</span>
                </div>
              </div>
            </div>

            {/* Cookies and Tracking Technologies Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our
                website. You can instruct your browser to refuse all cookies or to indicate when a
                cookie is being sent.
              </p>
            </div>

            {/* Children's Privacy Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Children's Privacy
              </h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly
                collect personal information from children. If you believe we have collected personal
                information from a child, please contact us immediately.
              </p>
            </div>

            {/* Changes to This Privacy Policy Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-16 p-8 bg-muted rounded-lg luxury-shadow-medium">
              <h2 className="text-3xl text-center mb-6">Contact Us</h2>
              <p className="text-center mb-8">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-background rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="luxury-hover-gold cursor-pointer font-semibold">Email</p>
                  <p className="text-muted-foreground">privacy@royamotorsuk.com</p>
                </div>
                
                <div className="p-6 bg-background rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="luxury-hover-gold cursor-pointer font-semibold">Address</p>
                  <p className="text-muted-foreground">39 Kinross drive, Bletchley, Milton Keynes, MK3 7UF</p>
                </div>
                
                <div className="p-6 bg-background rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="luxury-hover-gold cursor-pointer font-semibold">Phone</p>
                  <p className="text-muted-foreground">+44 7964 595923</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}