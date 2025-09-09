//src/pages/home/index.jsx

import React, { useEffect } from "react";
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

      {/* UK to East Africa Section */}
      <div className="bg-neutral py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
            {/* Left Content - Text */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-medium mb-4 text-primary">
                From the UK to East Africa:{" "}
                <span className="block text-accent mt-1">A Seamless Experience</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                At RoyaMotorsUK, we specialize in connecting discerning clients in Kenya and Tanzania with the finest luxury vehicles sourced
                directly from the UK. Our comprehensive service covers every aspect of your luxury car acquisition.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    title: "Expert Selection",
                    desc: "We personally inspect each vehicle to ensure it meets our exacting standards.",
                  },
                  {
                    title: "Seamless Shipping",
                    desc: "We handle all logistics, from UK export to East African import procedures.",
                  },
                  {
                    title: "Customs Expertise",
                    desc: "Our specialists navigate all documentation and clearance requirements.",
                  },
                  {
                    title: "Door-to-Door Delivery",
                    desc: "Your vehicle arrives at your specified location in pristine condition.",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="bg-accent text-primary rounded-full p-1.5 mt-0.5 mr-4 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-primary">
                      <strong className="font-semibold">{item.title}:</strong>{" "}
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content - Image and Stats */}
            <div className="flex-1 w-full">
              <div className="bg-card p-5 rounded-lg luxury-shadow-subtle border border-border">
                <img
                  src="/assets/images/WhyRoya.jpeg"
                  alt="Luxury car shipping from UK to East Africa"
                  className="w-full h-auto rounded-md mb-6 object-cover aspect-video"
                />
                
                <div className="flex justify-between">
                  <div className="text-center flex-1 border-r border-border pr-4">
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-muted-foreground mt-1 text-sm">Secure Transactions</p>
                  </div>
                  <div className="text-center flex-1 pl-4">
                    <p className="text-3xl font-bold text-primary">250+</p>
                    <p className="text-muted-foreground mt-1 text-sm">Satisfied Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CallToAction />
    </div>
  );
}