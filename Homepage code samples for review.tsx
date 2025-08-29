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


FeaturedCars.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { cars } from '../data/mockData'; // i have a mockdata file sample from vehicle-browse-search page(Our Collection)
import CarCard from './CarCard'; // i have vehiclecard.jsx file from vehicle-browse-search page(components)
import { ChevronRight } from 'lucide-react';

const FeaturedCars: React.FC = () => {
  // Get the first 3 cars as featured
  const featuredCars = cars.slice(0, 3);

  return (
    <section className="section bg-neutral">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-medium mb-3 text-primary">Featured Vehicles</h2> {/* <--- ADDED text-primary */}
            <p className="text-gray-600 text-primary"> {/* <--- ADDED text-primary */}
              Discover our handpicked selection of exceptional luxury vehicles, each
              representing the pinnacle of automotive excellence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/cars"
            className="flex items-center text-cta hover:text-cta/80 font-medium transition-colors text-lg"
          >
            View All Collection
            <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link to="/cars" className="btn btn-primary">
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;

WhyChooseUs.tsx
import React from 'react';
import { Award, ShieldCheck, Truck, UserCheck } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    // The Feature card itself is on a light background (bg-neutral from .card)
    // So its internal text needs to be dark (text-primary)
    <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-lg bg-neutral"> {/* Explicitly added bg-neutral and text-primary to ensure dark text on light background */}
      <div className="bg-accent/10 text-accent p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3 text-primary">{title}</h3> {/* Explicitly set text-primary */}
      <p className="text-primary">{description}</p> {/* Changed text-gray-600 to text-primary */}
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  return (
    // The section itself is bg-white, so its direct children's text needs to be dark
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-heading font-medium mb-4 text-primary">Why Choose RoyaMotorsUK</h2> {/* Explicitly set text-primary */}
          <p className="text-primary"> {/* Changed text-gray-600 to text-primary */}
            We are committed to providing an exceptional experience for our clients in Kenya
            and Tanzania, offering the finest vehicles with unparalleled service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Award size={28} />}
            title="Premium Selection"
            description="We source only the finest luxury vehicles from the UK, each meticulously inspected to ensure exceptional quality."
          />
          <Feature
            icon={<ShieldCheck size={28} />}
            title="Secure Transactions"
            description="Our transparent process ensures your investment is protected, with secure payment options and full documentation."
          />
          <Feature
            icon={<Truck size={28} />}
            title="Complete Logistics"
            description="We handle all shipping, customs clearance, and delivery directly to your location in Kenya or Tanzania."
          />
          <Feature
            icon={<UserCheck size={28} />}
            title="Personalized Service"
            description="Our dedicated team provides tailored assistance throughout your journey, ensuring your complete satisfaction."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

CallToAction.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="section bg-secondary">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary to-secondary p-8 md:p-12 rounded-lg text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-200 mb-8">
              Discover our exceptional collection of premium vehicles or contact our team
              for personalized assistance with your luxury automotive needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 transition-all py-4 px-6 rounded-lg flex items-center justify-center space-x-3"
              >
                <span>Ask Roya</span>
                <ArrowRight size={18} />
              </Link>
              
              <Link
                to="/cars"
                className="bg-accent text-primary hover:bg-accent/90 transition-all py-4 px-6 rounded-lg flex items-center justify-center space-x-3"
              >
                <span>Explore Collections</span>
                <ArrowRight size={18} />
              </Link>
              
              <a
                href="mailto:info@royamotorsuk.com"
                className="bg-white/10 hover:bg-white/20 transition-all py-4 px-6 rounded-lg flex items-center justify-center space-x-3"
              >
                <Mail size={18} />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;