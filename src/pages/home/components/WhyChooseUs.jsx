import React from "react";
import { Award, ShieldCheck, Truck, UserCheck } from "lucide-react";

function Feature({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="bg-accent/20 text-accent p-5 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-semibold mb-3 text-primary">
        {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="section bg-muted">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-heading font-medium mb-4 text-primary">
            Why Choose RoyaMotorsUK
          </h2>
          <p className="text-muted-foreground">
            We are committed to providing an exceptional experience for our
            clients in Kenya and Tanzania, offering the finest vehicles with
            unparalleled service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Award size={36} />}
            title="Premium Selection"
            description="We source only the finest luxury vehicles from the UK, each meticulously inspected to ensure exceptional quality."
          />
          <Feature
            icon={<ShieldCheck size={36} />}
            title="Secure Transactions"
            description="Our transparent process ensures your investment is protected, with secure payment options and full documentation."
          />
          <Feature
            icon={<Truck size={36} />}
            title="Complete Logistics"
            description="We handle all shipping, customs clearance, and delivery directly to your location in Kenya or Tanzania."
          />
          <Feature
            icon={<UserCheck size={36} />}
            title="Personalized Service"
            description="Our dedicated team provides tailored assistance throughout your journey, ensuring your complete satisfaction."
          />
        </div>
      </div>
    </section>
  );
}
