Hero.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Import local images
import hero1 from '../assets/images/hero/hero1.jpg';
import hero2 from '../assets/images/hero/hero2.jpg';
import hero3 from '../assets/images/hero/hero3.jpg';

const heroImages = [hero1, hero2, hero3];

// Text content for sliding animation
const heroTexts = [
  "Experience the finest selection of premium vehicles sourced directly from the UK to Kenya and Tanzania. Unparalleled quality, impeccable service.",
  "Tell us the make and model of your preferred vehicle and we will get the right one for you",
  "Custom solutions tailored to your automotive needs",
  "Direct imports with full transparency and documentation"
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');

  // Handle image transitions
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(imageInterval);
  }, []);

  // Handle text transitions
  useEffect(() => {
    const textInterval = setInterval(() => {
      setFadeState('fade-out');
      
      // Wait for fade-out to complete before changing text
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => 
          (prevIndex + 1) % heroTexts.length
        );
        setFadeState('fade-in');
      }, 500); // Half of the transition duration
    }, 5000); // Sync with image change

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="relative h-screen">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${heroImages[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
      </div>
      {/* Animated text section */}
            <div className="min-h-[120px] md:min-h-[96px] flex items-center justify-center">
              <p 
                className={`text-xl text-gray-200 mb-8 leading-relaxed mx-auto max-w-lg transition-opacity duration-500 ${fadeState}`}
                key={currentTextIndex}
              >
                {heroTexts[currentTextIndex]}
              </p>
            </div>
            
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
      </div>
export default Hero;


