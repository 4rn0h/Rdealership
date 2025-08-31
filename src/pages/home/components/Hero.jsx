import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const heroSlides = [
  {
    image: "/assets/images/hero/hero1.jpg",
    text: "Experience the finest selection of premium vehicles sourced directly from the UK to Kenya and Tanzania. Unparalleled quality, impeccable service.",
  },
  {
    image: "/assets/images/hero/hero2.jpg",
    text: "Tell us the make and model of your preferred vehicle and we will get the right one for you",
  },
  {
    image: "/assets/images/hero/hero3.jpg",
    text: "Custom solutions tailored to your automotive needs",
  },
  {
    image: "/assets/images/hero/hero1.jpg",
    text: "Direct imports with full transparency and documentation",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        setFadeState("fade-in");
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${heroSlides[currentIndex].image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
      </div>

      {/* Hero text */}
      <div className="relative z-10 px-6">
        <p
          className={`text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto transition-opacity duration-500 ${fadeState}`}
        >
          {heroSlides[currentIndex].text}
        </p>

        {/* CTA button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cars"
            className="btn btn-primary text-white flex items-center justify-center"
          >
            Explore Collection
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
