import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const heroImages = [
  "/assets/images/hero/hero1.jpg",
  "/assets/images/hero/hero2.jpg",
  "/assets/images/hero/hero3.jpg",
];

const heroTexts = [
  "Experience the finest selection of premium vehicles sourced directly from the UK to Kenya and Tanzania. Unparalleled quality, impeccable service.",
  "Tell us the make and model of your preferred vehicle and we will get the right one for you.",
  "Custom solutions tailored to your automotive needs.",
  "Direct imports with full transparency and documentation.",
];

// Format text with highlighted portions
const formatText = (text) => {
  const highlightPattern = /\(([^)]+)\)/g;
  const parts = text.split(highlightPattern);
  
  return parts.map((part, index) => {
    // Odd indices are the captured groups (text inside parentheses)
    if (index % 2 === 1) {
      return (
        <span key={index} className="text-accent font-semibold luxury-hover-gold">
          {part}
        </span>
      );
    }
    return part;
  });
};

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");

  // Rotate background images with vehicle slide animation
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setSlideDirection("right");
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [currentImageIndex]);

  // Rotate texts with slide animation
  useEffect(() => {
    const textInterval = setInterval(() => {
      setSlideDirection("right");
      setFadeState("fade-out");
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
        setFadeState("fade-in");
      }, 500);
    }, 5000);
    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-end text-center overflow-hidden pb-32 md:pb-40">
      {/* Background Images with Vehicle Slide Animation */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat luxury-transition ${
            index === currentImageIndex
              ? slideDirection === "right" 
                ? "opacity-100 translate-x-0" 
                : "opacity-100 translate-x-0"
              : index === prevImageIndex
              ? slideDirection === "right"
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
              : "opacity-0"
          }`}
          style={{ 
            backgroundImage: `url(${image})`, 
            zIndex: 0,
            transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/90"></div>
        </div>
      ))}
      
      {/* Road Line Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-accent/70 z-10 overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-8 bg-white animate-road-line"></div>
      </div>
      
      {/* Progress Indicators styled as speedometer */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full luxury-micro-transition ${
              index === currentImageIndex
                ? "bg-accent w-8 luxury-shadow-subtle"
                : "bg-white/30 w-2"
            }`}
          ></div>
        ))}
      </div>

      {/* Hero Text */}
      <div className="relative z-10 px-6">
        <p
          className={`text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed max-w-2xl mx-auto luxury-transition font-caption ${
            fadeState === "fade-in"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          {formatText(heroTexts[currentTextIndex])}
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/vehicle-browse-search"
            className="luxury-gradient text-primary-foreground flex items-center justify-center px-8 py-4 rounded-lg luxury-transition transform hover:scale-105 luxury-shadow-medium hover:luxury-shadow-prominent group animate-float"
          >
            Explore Collection
            <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 luxury-micro-transition" />
          </Link>
        </div>
      </div>

      {/* Decorative elements - vehicle inspired */}
      <div className="absolute top-1/4 left-10 w-24 h-12 border-2 border-accent/30 rounded-lg opacity-50 animate-float" style={{transform: 'rotate(15deg)'}}></div>
      <div className="absolute bottom-1/3 right-12 w-16 h-8 border border-accent/20 rounded-lg opacity-30" style={{transform: 'rotate(-10deg)'}}></div>
    </div>
  );
}