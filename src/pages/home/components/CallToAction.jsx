import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-gradient p-8 md:p-12 rounded-lg text-center luxury-shadow-prominent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4 text-primary-foreground">
              Ready to Experience Luxury?
            </h2>
            <p className="text-primary-foreground/90 mb-8">
              Discover our exceptional collection of premium vehicles or contact our team
              for personalized assistance with your luxury automotive needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/contact" 
                className="bg-white/15 hover:bg-white/25 luxury-transition py-4 px-6 rounded-lg flex items-center justify-center space-x-3 text-primary-foreground luxury-shadow-subtle hover:luxury-shadow-medium"
              >
                <span>Ask Roya</span>
                <ArrowRight size={18} />
              </Link>

              <Link 
                to="/cars" 
                className="bg-accent hover:bg-accent/90 luxury-transition py-4 px-6 rounded-lg flex items-center justify-center space-x-3 text-accent-foreground luxury-shadow-medium hover:luxury-shadow-prominent"
              >
                <span>Explore Collections</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href="mailto:info@royamotorsuk.com"
                className="bg-white/15 hover:bg-white/25 luxury-transition py-4 px-6 rounded-lg flex items-center justify-center space-x-3 text-primary-foreground luxury-shadow-subtle hover:luxury-shadow-medium"
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
}