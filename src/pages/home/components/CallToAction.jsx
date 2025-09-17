import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, MessageCircle, MessageSquare } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-12 h-12 border border-accent/10 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-8 right-8 w-10 h-10 border border-accent/10 rounded-full opacity-20"></div>
      
      <div className="container-custom relative z-10">
        <div className="relative luxury-shadow-prominent rounded-xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 luxury-gradient opacity-95"></div>
          
          <div className="relative p-8 md:p-10 text-center">
            <div className="max-w-3xl mx-auto">
              {/* Luxury badge */}
              <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-background/20 border border-accent/30 mb-4">
                <span className="text-primary-foreground font-caption font-semibold text-xs tracking-wider uppercase">
                  Exclusive Access
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-primary-foreground">
                Experience <span className="text-gold-gradient">Luxury</span> Redefined
              </h2>
              
              <div className="w-12 h-0.5 bg-accent mx-auto mb-4 luxury-shadow-subtle"></div>
              
              <p className="text-base text-primary-foreground/90 mb-6 font-caption">
                Discover our exceptional collection of premium vehicles or contact our team
                for personalized assistance with your luxury automotive needs.
              </p>

              {/* Single row of contact options */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-2xl mx-auto">
                <Link 
                  to="/contact" 
                  className="bg-background/20 hover:bg-background/30 luxury-transition py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-primary-foreground luxury-shadow-subtle hover:luxury-shadow-medium border border-accent/20 group flex-1 min-w-0"
                >
                  <MessageCircle size={16} className="text-accent group-hover:scale-110 luxury-micro-transition flex-shrink-0" />
                  <span className="font-medium text-sm whitespace-nowrap">Ask Roya</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 luxury-micro-transition flex-shrink-0" />
                </Link>

                <Link 
                  to="/vehicle-browse-search" 
                  className="bg-accent hover:bg-accent/90 luxury-transition py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-accent-foreground luxury-shadow-medium hover:luxury-shadow-prominent group flex-1 min-w-0"
                >
                  <span className="font-medium text-sm whitespace-nowrap">Explore Collection</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 luxury-micro-transition flex-shrink-0" />
                </Link>

                <a
                  href="mailto:info@royamotorsuk.com"
                  className="bg-background/20 hover:bg-background/30 luxury-transition py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-primary-foreground luxury-shadow-subtle hover:luxury-shadow-medium border border-accent/20 group flex-1 min-w-0"
                >
                  <Mail size={16} className="text-accent group-hover:scale-110 luxury-micro-transition flex-shrink-0" />
                  <span className="font-medium text-sm whitespace-nowrap">Email Us</span>
                </a>

                <a
                  href="https://wa.me/447964595923"
                  className="bg-background/20 hover:bg-background/30 luxury-transition py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-primary-foreground luxury-shadow-subtle hover:luxury-shadow-medium border border-accent/20 group flex-1 min-w-0"
                >
                  <MessageSquare size={16} className="text-accent group-hover:scale-110 luxury-micro-transition flex-shrink-0" />
                  <span className="font-medium text-sm whitespace-nowrap">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}