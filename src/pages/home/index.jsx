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
      <div className="bg-neutral py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6 text-primary">
                From the UK to East Africa: <br />
                <span className="text-accent">A Seamless Experience</span>
              </h2>
              <p className="text-gray-700 mb-6">
                At RoyaMotorsUK, we specialize in connecting discerning clients
                in Kenya and Tanzania with the finest luxury vehicles sourced
                directly from the UK. Our comprehensive service covers every
                aspect of your luxury car acquisition.
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
                    <div className="bg-accent text-primary rounded-full p-1 mt-1 mr-3">
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
                      <strong className="font-medium">{item.title}:</strong>{" "}
                      {item.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content (Image + Stats) */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/assets/images/WhyRoya.jpeg"
                alt="Luxury car shipping"
                className="w-full h-auto rounded-lg"
              />

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 border-l-4 border-accent pl-4">
                  <p className="text-4xl font-bold text-primary">100%</p>
                  <p className="text-gray-600 text-primary">
                    Secure Transactions
                  </p>
                </div>
                <div className="flex-1 border-l-4 border-accent pl-4">
                  <p className="text-4xl font-bold text-primary">250+</p>
                  <p className="text-gray-600 text-primary">
                    Satisfied Clients
                  </p>
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
