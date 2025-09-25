import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Star,
} from "lucide-react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Contact Us | RoyaMotorsUK";
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      {/* Hero Section */}
      <div className="luxury-gradient text-primary-foreground py-16 md:py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48L2c+PC9zdmc+')]"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 mb-6">
              <span className="text-primary-foreground font-caption font-semibold text-sm tracking-wider uppercase">
                Premium Support
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Contact Us
            </h1>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6 luxury-shadow-subtle"></div>
            <p className="text-xl text-primary-foreground/80 font-caption leading-relaxed">
              We're here to answer any questions you may have about our luxury
              vehicles and services.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom relative">
        {/* Socials Section - Centered and Overlapping */}
        <div className="flex justify-center mb-8 relative z-20">
          <div className="bg-card p-4 rounded-2xl border border-border luxury-shadow-prominent text-center max-w-lg mx-auto transform -translate-y-8">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-2">
                <Star size={12} className="text-accent mr-1" />
                <span className="text-accent font-caption font-semibold text-xs tracking-wider uppercase">
                  Connect With Us
                </span>
              </div>
              <h2 className="text-xl font-playfair font-semibold text-foreground">
                Follow Our Journey
              </h2>
            </div>
            
            <div className="flex justify-center space-x-3 mb-4">
              <a
                href="https://facebook.com/RoyaMotorsUK"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-3 rounded-xl hover:bg-primary/90 luxury-transition luxury-shadow-subtle hover:luxury-shadow-medium"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/RoyaMotorsUK"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-3 rounded-xl hover:bg-primary/90 luxury-transition luxury-shadow-subtle hover:luxury-shadow-medium"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/RoyaMotorsUK"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-3 rounded-xl hover:bg-primary/90 luxury-transition luxury-shadow-subtle hover:luxury-shadow-medium"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            
            <a
              href="https://wa.me/447964595923"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-gradient text-primary-foreground px-6 py-2.5 rounded-xl luxury-shadow-medium hover:luxury-shadow-prominent luxury-transition w-full flex items-center justify-center group"
            >
              <MessageCircle size={18} className="mr-3 group-hover:scale-110 luxury-micro-transition" />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-4">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="bg-card p-8 rounded-2xl border border-border luxury-shadow-prominent">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                  <Star size={14} className="text-accent mr-2" />
                  <span className="text-accent font-caption font-semibold text-sm tracking-wider uppercase">
                    Get in Touch
                  </span>
                </div>
                <h2 className="text-2xl font-playfair font-semibold text-foreground">
                  Send Us a Message
                </h2>
              </div>

              {isSubmitted ? (
                <div className="bg-success/20 border border-success/30 rounded-xl p-8 text-center luxury-shadow-subtle">
                  <div className="w-16 h-16 bg-success/30 rounded-full flex items-center justify-center mx-auto mb-6 luxury-shadow-subtle">
                    <Send className="text-success w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold text-success mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-success/90 mb-6 font-caption">
                    Thank you for contacting us. Our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="luxury-gradient text-primary-foreground px-8 py-3 rounded-lg luxury-shadow-medium hover:luxury-shadow-prominent luxury-transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2 font-caption"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground bg-input luxury-transition ${
                          errors.name ? "border-error" : "border-border"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-error text-sm mt-2 font-caption">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2 font-caption"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground bg-input luxury-transition ${
                          errors.email ? "border-error" : "border-border"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-2 font-caption">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2 font-caption"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground bg-input luxury-transition ${
                          errors.phone ? "border-error" : "border-border"
                        }`}
                        placeholder="+44 7964 595923"
                      />
                      {errors.phone && (
                        <p className="text-error text-sm mt-2 font-caption">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-foreground mb-2 font-caption"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground bg-input luxury-transition"
                        placeholder="Inquiry about..."
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2 font-caption"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground bg-input luxury-transition ${
                        errors.message ? "border-error" : "border-border"
                      }`}
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-error text-sm mt-2 font-caption">
                        {errors.message}
                        </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="luxury-gradient text-primary-foreground px-8 py-4 rounded-xl luxury-shadow-medium hover:luxury-shadow-prominent luxury-transition w-full flex items-center justify-center group"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={20} className="mr-3 group-hover:translate-x-1 luxury-micro-transition" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <div className="bg-card p-8 rounded-2xl border border-border luxury-shadow-prominent">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                  <Star size={14} className="text-accent mr-2" />
                  <span className="text-accent font-caption font-semibold text-sm tracking-wider uppercase">
                    Contact Information
                  </span>
                </div>
                <h2 className="text-2xl font-playfair font-semibold text-foreground">
                  How to Reach Us
                </h2>
              </div>
              
              <ul className="space-y-6">
                {/* UK Headquarters */}
                <li className="flex items-start p-4 rounded-xl bg-background border border-border luxury-shadow-subtle">
                  <div className="bg-accent/20 text-accent p-3 rounded-xl mr-4 luxury-shadow-subtle">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-playfair font-semibold text-foreground mb-2">
                      UK Headquarters
                    </p>
                    <p className="text-muted-foreground font-caption mb-2">
                      39 Kinross Drive, Bletchley<br />
                      Milton Keynes<br />
                      MK3 7UF
                    </p>
                    <a
                      href="tel:+447964595923"
                      className="text-accent hover:text-accent/80 luxury-hover-gold font-caption block"
                    >
                      +44 7964 595923
                    </a>
                  </div>
                </li>

                {/* East Africa Office */}
                <li className="flex items-start p-4 rounded-xl bg-background border border-border luxury-shadow-subtle">
                  <div className="bg-accent/20 text-accent p-3 rounded-xl mr-4 luxury-shadow-subtle">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-playfair font-semibold text-foreground mb-2">
                      East Africa Office
                    </p>
                    <p className="text-muted-foreground font-caption mb-2">
                      ROYA GROUP, 10TH FLOOR SIFA TOWERS<br />
                      Nairobi, Kenya<br />
                      P.O. BOX 2104-00200
                    </p>
                    <a
                      href="tel:+254710966523"
                      className="text-accent hover:text-accent/80 luxury-hover-gold font-caption"
                    >
                      +254 710 966523
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start p-4 rounded-xl bg-background border border-border luxury-shadow-subtle">
                  <div className="bg-accent/20 text-accent p-3 rounded-xl mr-4 luxury-shadow-subtle">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-playfair font-semibold text-foreground mb-2">Email</p>
                    <a
                      href="mailto:info@royamotorsuk.com"
                      className="text-accent hover:text-accent/80 luxury-hover-gold font-caption block mb-2"
                    >
                      info@royamotorsuk.com
                    </a>
                    <a
                      href="mailto:sales@royamotorsuk.com"
                      className="text-accent hover:text-accent/80 luxury-hover-gold font-caption"
                    >
                      sales@royamotorsuk.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;