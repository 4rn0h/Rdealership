//src/pages/home/index.jsx

import React, { useEffect } from "react";
import { CheckCircle, Map, Globe, Shield, Truck, Star } from "lucide-react";
import Hero from "./components/Hero";
import FeaturedCars from "./components/FeaturedCars";
import WhyChooseUs from "./components/WhyChooseUs";
import CallToAction from "./components/CallToAction";

export default function Home() {
  useEffect(() => {
    document.title = "RoyaMotorsUK | Luxury Vehicles from UK to East Africa";
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />

      {/* UK to East Africa Section - Compact Design */}
      <section className="py-14 md:py-16 bg-background relative">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 luxury-shadow-subtle">
              <Star size={14} className="text-accent mr-2" />
              <span className="text-accent font-caption font-semibold text-sm tracking-wider uppercase">
                Global Excellence
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-3">
              From UK to <span className="text-gold-gradient">East Africa</span>
            </h2>
            
            <div className="w-16 h-0.5 bg-accent mx-auto mb-5 luxury-shadow-subtle"></div>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-caption">
              Seamless luxury vehicle importation with expert handling from selection to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Content - Process Steps (Reduced Size) */}
            <div className="space-y-4">
              {[
                {
                  icon: <CheckCircle size={18} className="text-accent" />,
                  title: "Expert Selection",
                  desc: "Personally inspected vehicles meeting our exacting standards"
                },
                {
                  icon: <Truck size={18} className="text-accent" />,
                  title: "Seamless Shipping",
                  desc: "Complete logistics from UK export to East African import"
                },
                {
                  icon: <Shield size={18} className="text-accent" />,
                  title: "Customs Expertise",
                  desc: "Full documentation and clearance handled by specialists"
                },
                {
                  icon: <Map size={18} className="text-accent" />,
                  title: "Door-to-Door Delivery",
                  desc: "Pristine condition delivery to your specified location"
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start p-4 rounded-lg bg-card border border-border luxury-shadow-subtle luxury-transition hover:luxury-shadow-medium group"
                >
                  <div className="bg-accent/20 p-2 rounded-lg mr-4 flex-shrink-0 luxury-shadow-subtle">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-foreground mb-1 text-base">{item.title}</h3>
                    <p className="text-muted-foreground text-xs font-caption">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Content - Image with Inline Stats */}
            <div>
              {/* Image Container */}
              <div className="rounded-xl overflow-hidden luxury-shadow-prominent mb-5">
                <img
                  src="/assets/images/WhyRoya.jpeg"
                  alt="Luxury car shipping from UK to East Africa"
                  className="w-full h-56 object-cover"
                />
              </div>
              
              {/* Inline Stats - Single Row */}
              <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border luxury-shadow-subtle">
                {[
                  { icon: <Shield size={16} className="text-accent" />, value: "100%", label: "Secure" },
                  { icon: <Globe size={16} className="text-accent" />, value: "250+", label: "Clients" },
                  { icon: <Truck size={16} className="text-accent" />, value: "500+", label: "Vehicles" },
                  { icon: <Map size={16} className="text-accent" />, value: "2", label: "Countries" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center flex-1 px-2">
                    <div className="flex justify-center mb-2">
                      <div className="bg-accent/20 p-1.5 rounded-full luxury-shadow-subtle">
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-lg font-playfair font-bold text-primary">{stat.value}</p>
                    <p className="text-muted-foreground text-xs font-caption uppercase tracking-wide mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="text-center mt-10 pt-6 border-t border-border/50">
            <p className="text-muted-foreground font-caption text-sm">
              Trusted by luxury car enthusiasts across <strong className="text-foreground">Kenya & Tanzania</strong>
            </p>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}