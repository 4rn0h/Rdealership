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
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl">
            We're here to answer any questions you may have about our luxury
            vehicles and services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Contact Form */}
          <div className="w-full max-w-2xl">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-6 text-primary">
                Get in Touch
              </h2>

              {isSubmitted ? (
                <div className="bg-success/20 border border-success/30 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-success/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-success w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium text-success mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-success/90 mb-4">
                    Thank you for contacting us. Our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="luxury-gradient text-primary-foreground px-6 py-3 rounded-lg luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-primary mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary bg-input ${
                          errors.name ? "border-error" : "border-border"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-error text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary bg-input ${
                          errors.email ? "border-error" : "border-border"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-primary mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary bg-input ${
                          errors.phone ? "border-error" : "border-border"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-error text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-primary mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary bg-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary mb-1"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary bg-input ${
                        errors.message ? "border-error" : "border-border"
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-error text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="luxury-gradient text-primary-foreground px-6 py-3 rounded-lg luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information + Socials */}
          <div className="w-full max-w-2xl space-y-8">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-6 text-primary">
                Contact Information
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Phone */}
                <li className="flex items-start">
                  <div className="bg-accent/20 text-accent p-2 rounded-full mt-0.5 mr-3">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Phone</p>
                    <p className="text-primary mb-1">UK Office:</p>
                    <a
                      href="tel:+447964595923"
                      className="text-accent hover:underline luxury-hover-gold"
                    >
                      +44 7964 595923
                    </a>
                    <p className="text-primary mt-2 mb-1">East Africa Office:</p>
                    <a
                      href="tel:+254710966523"
                      className="text-accent hover:underline luxury-hover-gold"
                    >
                      +254 710 966523
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start">
                  <div className="bg-accent/20 text-accent p-2 rounded-full mt-0.5 mr-3">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <a
                      href="mailto:info@royamotorsuk.com"
                      className="text-accent hover:underline luxury-hover-gold"
                    >
                      info@royamotorsuk.com
                    </a>
                    <p className="text-primary mt-2 mb-1">For inquiries:</p>
                    <a
                      href="mailto:sales@royamotorsuk.com"
                      className="text-accent hover:underline luxury-hover-gold"
                    >
                      sales@royamotorsuk.com
                    </a>
                  </div>
                </li>

                {/* UK Headquarters */}
                <li className="flex items-start">
                  <div className="bg-accent/20 text-accent p-2 rounded-full mt-0.5 mr-3">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">
                      UK Headquarters
                    </p>
                    <p className="text-primary">
                      39 Kinross Drive, Bletchley
                      <br />
                      Milton Keynes
                      <br />
                      MK3 7UF
                    </p>
                  </div>
                </li>

                {/* East Africa Office */}
                <li className="flex items-start">
                  <div className="bg-accent/20 text-accent p-2 rounded-full mt-0.5 mr-3">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">
                      East Africa Office
                    </p>
                    <p className="text-primary">
                      ROYA GROUP, 10TH FLOOR SIFA TOWERS
                      <br />
                      Nairobi, Kenya
                      <br />
                      P.O. BOX 2104-00200
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-6 text-primary">
                Connect With Us
              </h2>
              <div className="flex space-x-4 mb-6 justify-center">
                <a
                  href="https://facebook.com/RoyaMotorsUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 luxury-transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/RoyaMotorsUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 luxury-transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/RoyaMotorsUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 luxury-transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/447964595923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-success text-success-foreground p-3 rounded-full hover:bg-success/90 luxury-transition"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <a
                href="https://wa.me/447964595923"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-gradient text-primary-foreground px-6 py-3 rounded-lg luxury-shadow-subtle hover:luxury-shadow-medium luxury-transition w-full flex items-center justify-center"
              >
                <MessageCircle size={20} className="mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;