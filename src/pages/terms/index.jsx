import React, { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions | RoyaMotorsUK';
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-primary text-white py-12 mb-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      <div className="container-custom">
        <div className="bg-muted p-8 rounded-lg shadow-md">
          <div className="prose prose-lg max-w-none">
            <p>Last Updated: January 1, 2025</p>

            <h2>Introduction</h2>
            <p>
              These Terms and Conditions ("Terms") govern your use of the RoyaMotorsUK website and
              services. By accessing our website or using our services, you agree to be bound by these
              Terms. If you do not agree with any part of these Terms, you may not use our services.
            </p>

            <h2>Definitions</h2>
            <p>For the purpose of these Terms:</p>
            <ul>
              <li>"Company," "we," "us," or "our" refers to RoyaMotorsUK, a company registered in the United Kingdom.</li>
              <li>"Services" refers to all services provided by RoyaMotorsUK, including but not limited to vehicle sourcing, sales, shipping, and delivery.</li>
              <li>"Vehicle" refers to any automobile, car, SUV, or other motor vehicle offered for sale or sold by RoyaMotorsUK.</li>
              <li>"Customer," "you," or "your" refers to any individual or entity using our Services or purchasing a Vehicle from us.</li>
            </ul>

            <h2>Vehicle Purchases and Reservations</h2>
            <h3>Vehicle Information</h3>
            <p>
              While we make every effort to ensure the accuracy of information regarding Vehicles
              listed on our website, including specifications, features, pricing, and availability, we
              cannot guarantee that all information is complete or error-free. All Vehicles are
              subject to prior sale.
            </p>

            <h3>Reservations and Deposits</h3>
            <p>
              To reserve a Vehicle, you may be required to pay a reservation deposit. This deposit is
              refundable only under specific circumstances outlined in our Refund Policy. A
              reservation does not constitute a final sale and is subject to availability and
              confirmation.
            </p>

            <h3>Purchase Process</h3>
            <p>
              The purchase of a Vehicle requires:
            </p>
            <ol>
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

            <h2>Payment and Pricing</h2>
            <h3>Currency and Payment Methods</h3>
            <p>
              All prices are listed in British Pounds Sterling (GBP). We accept payment by bank
              transfer, credit card, or other methods specified at the time of purchase. For payments
              in other currencies, the exchange rate will be determined at the time of transaction.
            </p>

            <h3>Taxes and Duties</h3>
            <p>
              The purchase price does not include import duties, taxes, or customs fees that may be
              levied by Kenyan or Tanzanian authorities. These additional costs are the
              responsibility of the Customer and are payable directly to the relevant authorities.
            </p>

            <h2>Shipping and Delivery</h2>
            <h3>Shipping Process</h3>
            <p>
              We will arrange for the shipping of Vehicles from the UK to Kenya or Tanzania as
              specified in the purchase agreement. The shipping process includes:
            </p>
            <ol>
              <li>Preparation of the Vehicle for export from the UK</li>
              <li>Arrangement of sea freight or air freight, as applicable</li>
              <li>
                Completion of necessary export documentation from the UK
              </li>
              <li>
                Coordination with our local partners in Kenya or Tanzania for customs clearance
              </li>
            </ol>

            <h3>Delivery Timeframes</h3>
            <p>
              While we provide estimated delivery timeframes, actual delivery times may vary due to
              factors beyond our control, including but not limited to shipping delays, customs
              clearance, and local transportation issues. We will keep you informed of any significant
              delays.
            </p>

            <h3>Delivery Condition</h3>
            <p>
              All Vehicles will be delivered in substantially the same condition as described at the
              time of purchase, allowing for normal wear and tear during shipping. You have the right
              to inspect the Vehicle upon delivery before accepting it.
            </p>

            <h2>Warranties and Returns</h2>
            <h3>Warranty Coverage</h3>
            <p>
              All Vehicles are sold with any remaining manufacturer's warranty, if applicable. We
              provide an additional 3-month limited warranty covering major mechanical components,
              subject to the terms outlined in our separate Warranty Policy.
            </p>

            <h3>Return Policy</h3>
            <p>
              Due to the nature of international Vehicle sales, returns are generally not accepted
              after a Vehicle has been shipped. However, if a Vehicle is significantly different from
              its description or has undisclosed major defects, you may be entitled to remedies as
              outlined in our separate Return Policy.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is
              the property of RoyaMotorsUK and is protected by UK and international copyright and
              trademark laws. You may not reproduce, distribute, or create derivative works from this
              content without our express written consent.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, RoyaMotorsUK shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including loss of
              profits, data, or use, arising out of or in connection with these Terms or the use of
              our Services, even if we have been advised of the possibility of such damages.
            </p>

            <h2>Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United
              Kingdom. Any dispute arising out of or relating to these Terms shall be resolved through
              arbitration in London, United Kingdom, in accordance with the rules of the London Court
              of International Arbitration.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective
              immediately upon posting on our website. Your continued use of our Services after any
              changes indicates your acceptance of the revised Terms.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul>
              <li>Email: legal@royamotorsuk.com</li>
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
