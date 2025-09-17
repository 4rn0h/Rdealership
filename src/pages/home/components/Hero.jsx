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
    <div className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
      ))}
      
      {/* Road Line Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-accent/70 z-10 overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-8 bg-accent/80 animate-road-line luxury-shadow-subtle"></div>
      </div>
      
      {/* Progress Indicators styled as luxury dials */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full luxury-micro-transition luxury-shadow-subtle ${
              index === currentImageIndex
                ? "bg-accent w-8"
                : "bg-foreground/30 w-2"
            }`}
          ></div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        {/* Luxury Badge */}
        <div className="mb-8 animate-float">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-background/80 border border-accent/30 luxury-shadow-subtle">
            <span className="text-accent font-playfair font-semibold text-lg tracking-wider">
              LUXURY AUTOMOTIVE EXCELLENCE
            </span>
          </div>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6 leading-tight">
          <span className="text-gold-gradient">Premium Vehicles</span>
          <br />
          <span className="text-xl md:text-2xl font-caption font-normal text-muted-foreground mt-2 block">
            From the UK to East Africa
          </span>
        </h1>

        {/* Hero Text */}
        <p
          className={`text-xl md:text-2xl font-caption text-foreground mb-10 leading-relaxed max-w-2xl mx-auto luxury-transition ${
            fadeState === "fade-in"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {formatText(heroTexts[currentTextIndex])}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link
            to="/vehicle-browse-search"
            className="luxury-gradient text-primary-foreground flex items-center justify-center px-8 py-4 rounded-lg luxury-transition transform hover:scale-105 luxury-shadow-medium hover:luxury-shadow-prominent group animate-float"
          >
            <span className="font-semibold tracking-wide">Explore Collection</span>
            <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 luxury-micro-transition" />
          </Link>
          
          {/*<Link
            to="/contacts"
            className="border-2 border-accent text-accent flex items-center justify-center px-8 py-4 rounded-lg luxury-transition transform hover:scale-105 hover:bg-accent/5 group"
          >
            <span className="font-semibold tracking-wide">Contact Us</span>
          </Link>*/}
        </div>
      </div>

      {/* Decorative elements - luxury car inspired */}
      <div className="absolute top-20 left-10 w-24 h-12 border border-accent/20 rounded-lg opacity-50 animate-float" style={{transform: 'rotate(15deg)'}}></div>
      <div className="absolute bottom-1/3 right-12 w-16 h-8 border border-accent/20 rounded-lg opacity-30" style={{transform: 'rotate(-10deg)'}}></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 border border-accent/10 rounded-full opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-20 w-6 h-6 border border-accent/10 rounded-full opacity-30"></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}