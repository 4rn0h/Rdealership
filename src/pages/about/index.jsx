import React, { useEffect } from "react";
import { Award, Users, MapPin, Shield, Star } from "lucide-react";
import CallToAction from "../home/components/CallToAction";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | RoyaMotorsUK";
  }, []);

  return (
    <div className="pt-20 pb-8 bg-background min-h-screen">
      {/* Hero Section */}
      <div className="luxury-gradient text-primary-foreground py-12 md:py-16 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48L2c+PC9zdmc+')]"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 mb-4">
              <span className="text-primary-foreground font-caption font-semibold text-xs tracking-wider uppercase">
                Premium Heritage
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-3">
              About Us
            </h1>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-4 luxury-shadow-subtle"></div>
            <p className="text-lg text-primary-foreground/80 font-caption leading-relaxed">
              Connecting discerning clients in East Africa with exceptional luxury
              vehicles from the UK.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Star size={12} className="text-accent mr-2" />
              <span className="text-accent font-caption font-semibold text-xs tracking-wider uppercase">
                Our Legacy
              </span>
            </div>
            <h2 className="text-2xl font-playfair font-semibold mb-4 text-foreground">
              Our <span className="text-accent">Story</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed font-caption">
              RoyaMotorsUK was founded in 2020 by a team of automotive
              enthusiasts with a shared vision: to bridge the gap between the
              finest luxury vehicles in the UK and discerning clients in East
              Africa.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed font-caption">
              With decades of combined experience in the luxury automotive sector
              and international logistics, our founders recognized the demand for
              a premium service that could navigate the complexities of sourcing,
              shipping, and delivering high-end vehicles to Kenya and Tanzania.
            </p>
            <p className="text-muted-foreground leading-relaxed font-caption">
              Today, RoyaMotorsUK stands as the premier luxury vehicle sourcing
              company connecting these markets, offering an unparalleled service
              that combines automotive expertise with white-glove customer care.
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl luxury-shadow-prominent border border-border">
            <img
              src="/assets/images/About_Us.jpeg"
              alt="RoyaMotorsUK team and operations"
              className="w-full h-auto rounded-lg object-cover aspect-video luxury-shadow-medium"
            />
          </div>
        </div>

        {/* Mission and Values */}
        <div className="bg-card py-12 rounded-xl mb-12 border border-border luxury-shadow-prominent">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
                <Star size={12} className="text-accent mr-2" />
                <span className="text-accent font-caption font-semibold text-xs tracking-wider uppercase">
                  Our Philosophy
                </span>
              </div>
              <h2 className="text-2xl font-playfair font-semibold mb-3 text-foreground">
                Mission & Values
              </h2>
              <p className="text-muted-foreground font-caption">
                At RoyaMotorsUK, we are driven by our commitment to excellence in
                every aspect of our service, guided by core values that define
                everything we do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission */}
              <div className="bg-background p-6 rounded-lg luxury-shadow-subtle border border-border">
                <h3 className="text-xl font-playfair font-semibold mb-3 text-foreground">
                  Our Mission
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed font-caption">
                  To provide unparalleled access to the world's finest vehicles,
                  delivering them seamlessly from the UK to East Africa with
                  exceptional service, integrity, and attention to detail.
                </p>
                <p className="text-muted-foreground leading-relaxed font-caption">
                  We aim to exceed expectations at every step, creating lasting
                  relationships with our clients built on trust, transparency,
                  and a shared appreciation for automotive excellence.
                </p>
              </div>

              {/* Values */}
              <div className="bg-background p-6 rounded-lg luxury-shadow-subtle border border-border">
                <h3 className="text-xl font-playfair font-semibold mb-3 text-foreground">
                  Our Values
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      title: "Excellence",
                      desc: "We pursue the highest standards in everything we do, from vehicle selection to customer service.",
                    },
                    {
                      title: "Integrity",
                      desc: "We operate with complete transparency and honesty in all our dealings.",
                    },
                    {
                      title: "Innovation",
                      desc: "We continuously seek better ways to serve our clients through technology and service improvements.",
                    },
                    {
                      title: "Personalization",
                      desc: "We recognize that each client is unique, and we tailor our services to meet individual needs.",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="bg-accent/20 text-accent p-1 rounded-md mr-3 flex-shrink-0 luxury-shadow-subtle mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
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
                      <div>
                        <strong className="font-medium text-accent font-caption text-sm">{item.title}:</strong>{" "}
                        <span className="text-muted-foreground font-caption text-sm">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Award, value: "5+", label: "Years of Excellence" },
            { icon: Users, value: "250+", label: "Satisfied Clients" },
            { icon: MapPin, value: "2", label: "Office Locations" },
            { icon: Shield, value: "100%", label: "Secure Transactions" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl luxury-shadow-subtle border border-border text-center luxury-transition hover:luxury-shadow-medium hover:translate-y-[-2px]"
            >
              <div className="bg-accent/20 text-accent p-3 rounded-lg inline-block mb-3 luxury-shadow-subtle">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-playfair font-bold text-foreground mb-1">{stat.value}</div>
              <p className="text-muted-foreground font-caption text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA with reduced margin */}
      <div className="mt-4">
        <CallToAction />
      </div>
    </div>
  );
}