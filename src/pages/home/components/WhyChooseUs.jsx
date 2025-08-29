import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

export default function CallToAction() {
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
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 transition-all py-4 px-6 rounded-lg flex items-center justify-center space-x-3">
                <span>Ask Roya</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/cars" className="bg-accent text-primary hover:bg-accent/90 transition-all py-4 px-6 rounded-lg flex items-center justify-center space-x-3">
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
}
