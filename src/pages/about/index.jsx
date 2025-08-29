import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About Us | RoyaMotorsUK";
  }, []);

  return (
    <div className="container-custom py-16 md:py-24">
      <h1 className="text-4xl font-heading font-medium mb-6 text-primary">
        About RoyaMotorsUK
      </h1>
      <p className="text-gray-700 leading-relaxed mb-6">
        At RoyaMotorsUK, we connect discerning clients in East Africa with
        premium vehicles sourced directly from the UK. Our mission is to deliver
        luxury, transparency, and personalized service.
      </p>
      <p className="text-gray-700 leading-relaxed mb-6">
        With years of expertise in automotive sourcing and logistics, we ensure
        every car meets the highest standards of quality, while providing a
        seamless and secure buying experience.
      </p>
    </div>
  );
}
