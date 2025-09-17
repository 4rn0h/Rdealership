import React from "react";
import { Award, ShieldCheck, Truck, UserCheck, Star } from "lucide-react";

function Feature({ icon, title, description }) {
  return (
    <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border luxury-shadow-subtle hover:luxury-shadow-prominent luxury-transition hover:-translate-y-2 overflow-hidden">
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/50 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent/50 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent/50 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent/50 rounded-br-lg"></div>
      
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 luxury-transition"></div>
      
      <div className="relative z-10">
        <div className="bg-accent/20 text-accent p-5 rounded-full mb-6 luxury-transition group-hover:bg-accent/30 group-hover:scale-105 luxury-shadow-subtle flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-playfair font-semibold mb-4 text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed font-caption">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="section py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-24 h-24 border border-accent/10 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 right-0 w-16 h-16 border border-accent/10 rounded-full opacity-20"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 border border-accent/10 rounded-full opacity-40"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Luxury badge */}
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Star size={16} className="text-accent mr-2" />
            <span className="text-accent font-caption font-semibold text-sm tracking-wider uppercase">
              Excellence Defined
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-5 text-foreground">
            Why Choose <span className="text-gold-gradient">RoyaMotorsUK</span>
          </h2>
          
          <div className="w-20 h-1 bg-accent mx-auto mb-6 luxury-shadow-subtle"></div>
          
          <p className="text-xl text-muted-foreground font-caption leading-relaxed">
            We are committed to providing an exceptional experience for our
            clients in Kenya and Tanzania, offering the finest vehicles with
            unparalleled service and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Award size={36} />}
            title="Premium Selection"
            description="We source only the finest luxury vehicles from the UK, each meticulously inspected to ensure exceptional quality and performance."
          />
          <Feature
            icon={<ShieldCheck size={36} />}
            title="Secure Transactions"
            description="Our transparent process ensures your investment is protected, with secure payment options and comprehensive documentation."
          />
          <Feature
            icon={<Truck size={36} />}
            title="Complete Logistics"
            description="We handle all shipping, customs clearance, and delivery directly to your location in Kenya or Tanzania with precision care."
          />
          <Feature
            icon={<UserCheck size={36} />}
            title="Personalized Service"
            description="Our dedicated team provides tailored assistance throughout your journey, ensuring your complete satisfaction at every step."
          />
        </div>

        {/* Additional decorative element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="w-8 h-px bg-accent/30"></div>
            <span className="text-sm font-caption uppercase tracking-wider">Trusted Excellence</span>
            <div className="w-8 h-px bg-accent/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}