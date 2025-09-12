import React, { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions | RoyaMotorsUK';
  }, []);

  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 mb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 luxury-gradient opacity-95"></div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBdPSJNMzYgMzRhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0em0xNi0yYTIgMiAwIDEgMSAwLTQgMiAyIDAgMCAxIDAgNHptLTQ0IDBhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0em0xNi00NGEyIDIgMCAxIDEgMCA0IDIgMiAwIDAgMSAwLTR6TTAgMTZhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-float">
            Terms & Conditions
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-accent-foreground max-w-3xl mx-auto font-caption">
            Please read these terms carefully before using our services.
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
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Introduction
              </h2>
              <p>
                These Terms and Conditions ("Terms") govern your use of the RoyaMotorsUK website and
                services. By accessing our website or using our services, you agree to be bound by these
                Terms. If you do not agree with any part of these Terms, you may not use our services.
              </p>
            </div>

            {/* Definitions Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-accent opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Definitions
              </h2>
              <p>For the purpose of these Terms:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>"Company," "we," "us," or "our" refers to RoyaMotorsUK, a company registered in the United Kingdom.</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>"Services" refers to all services provided by RoyaMotorsUK, including but not limited to vehicle sourcing, sales, shipping, and delivery.</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>"Vehicle" refers to any automobile, car, SUV, or other motor vehicle offered for sale or sold by RoyaMotorsUK.</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>"Customer," "you," or "your" refers to any individual or entity using our Services or purchasing a Vehicle from us.</span>
                </div>
              </div>
            </div>

            {/* Vehicle Purchases and Reservations Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Vehicle Purchases and Reservations
              </h2>
              
              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Vehicle Information
                </h3>
                <p>
                  While we make every effort to ensure the accuracy of information regarding Vehicles
                  listed on our website, including specifications, features, pricing, and availability, we
                  cannot guarantee that all information is complete or error-free. All Vehicles are
                  subject to prior sale.
                </p>
              </div>

              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Reservations and Deposits
                </h3>
                <p>
                  To reserve a Vehicle, you may be required to pay a reservation deposit. This deposit is
                  refundable only under specific circumstances outlined in our Refund Policy. A
                  reservation does not constitute a final sale and is subject to availability and
                  confirmation.
                </p>
              </div>

              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Purchase Process
                </h3>
                <p>
                  The purchase of a Vehicle requires:
                </p>
                <ol className="list-decimal pl-5 space-y-2 mt-3">
                  <li>
                    A signed purchase agreement outlining the terms of sale, including price, payment
                    schedule, and delivery details.
                  </li>
                  <li>
                    Payment in full, unless financing arrangements have been approved by us.
                  </li>
                  <li>
                    Provision of all required documentation, including identification, proof of address,
                    and any documents required for international shipping and customs clearance.
                  </li>
                </ol>
              </div>
            </div>

            {/* Payment and Pricing Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Payment and Pricing
              </h2>
              
              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Currency and Payment Methods
                </h3>
                <p>
                  All prices are listed in British Pounds Sterling (GBP). We accept payment by bank
                  transfer, credit card, or other methods specified at the time of purchase. For payments
                  in other currencies, the exchange rate will be determined at the time of transaction.
                </p>
              </div>

              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Taxes and Duties
                </h3>
                <p>
                  The purchase price does not include import duties, taxes, or customs fees that may be
                  levied by Kenyan or Tanzanian authorities. These additional costs are the
                  responsibility of the Customer and are payable directly to the relevant authorities.
                </p>
              </div>
            </div>

            {/* Shipping and Delivery Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Shipping and Delivery
              </h2>
              
              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Shipping Process
                </h3>
                <p>
                  We will arrange for the shipping of Vehicles from the UK to Kenya or Tanzania as
                  specified in the purchase agreement. The shipping process includes:
                </p>
                <ol className="list-decimal pl-5 space-y-2 mt-3">
                  <li>Preparation of the Vehicle for export from the UK</li>
                  <li>Arrangement of sea freight or air freight, as applicable</li>
                  <li>
                    Completion of necessary export documentation from the UK
                  </li>
                  <li>
                    Coordination with our local partners in Kenya or Tanzania for customs clearance
                  </li>
                </ol>
              </div>

              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Delivery Timeframes
                </h3>
                <p>
                  While we provide estimated delivery timeframes, actual delivery times may vary due to
                  factors beyond our control, including but not limited to shipping delays, customs
                  clearance, and local transportation issues. We will keep you informed of any significant
                  delays.
                </p>
              </div>

              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Delivery Condition
                </h3>
                <p>
                  All Vehicles will be delivered in substantially the same condition as described at the
                  time of purchase, allowing for normal wear and tear during shipping. You have the right
                  to inspect the Vehicle upon delivery before accepting it.
                </p>
              </div>
            </div>

            {/* Warranties and Returns Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Warranties and Returns
              </h2>
              
              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Warranty Coverage
                </h3>
                <p>
                  All Vehicles are sold with any remaining manufacturer's warranty, if applicable. We
                  provide an additional 3-month limited warranty covering major mechanical components,
                  subject to the terms outlined in our separate Warranty Policy.
                </p>
              </div>

              <div className="bg-background p-5 rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Return Policy
                </h3>
                <p>
                  Due to the nature of international Vehicle sales, returns are generally not accepted
                  after a Vehicle has been shipped. However, if a Vehicle is significantly different from
                  its description or has undisclosed major defects, you may be entitled to remedies as
                  outlined in our separate Return Policy.
                </p>
              </div>
            </div>

            {/* Intellectual Property Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Intellectual Property
              </h2>
              <p>
                All content on our website, including text, graphics, logos, images, and software, is
                the property of RoyaMotorsUK and is protected by UK and international copyright and
                trademark laws. You may not reproduce, distribute, or create derivative works from this
                content without our express written consent.
              </p>
            </div>

            {/* Limitation of Liability Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, RoyaMotorsUK shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including loss of
                profits, data, or use, arising out of or in connection with these Terms or the use of
                our Services, even if we have been advised of the possibility of such damages.
              </p>
            </div>

            {/* Governing Law and Dispute Resolution Section */}
            <div className="mb-12 relative">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Governing Law and Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United
                Kingdom. Any dispute arising out of or relating to these Terms shall be resolved through
                arbitration in London, United Kingdom, in accordance with the rules of the London Court
                of International Arbitration.
              </p>
            </div>

            {/* Changes to Terms Section */}
            <div className="mb-12 relative p-6 bg-muted rounded-lg luxury-shadow-subtle">
              <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-primary opacity-20"></div>
              <h2 className="text-3xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective
                immediately upon posting on our website. Your continued use of our Services after any
                changes indicates your acceptance of the revised Terms.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-16 p-8 bg-muted rounded-lg luxury-shadow-medium">
              <h2 className="text-3xl text-center mb-6">Contact Information</h2>
              <p className="text-center mb-8">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-background rounded luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="luxury-hover-gold cursor-pointer font-semibold">Email</p>
                  <p className="text-muted-foreground">legal@royamotorsuk.com</p>
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