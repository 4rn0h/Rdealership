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
      <div className="bg-primary text-white py-12 mb-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            We're here to answer any questions you may have about our luxury
            vehicles and services.
          </p>
        </div>
      </div>

      <div className="container-custom">
        <div className="flex flex-col items-center space-y-8">
          {/* Contact Form */}
          <div className="w-full max-w-2xl">
            <div className="bg-muted p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-6 text-primary">
                Get in Touch
              </h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-cta w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium text-green-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Thank you for contacting us. Our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary mt-2"
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
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cta/50 text-primary ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
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
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cta/50 text-primary ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
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
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cta/50 text-primary ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
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
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cta/50 text-primary"
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
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cta/50 text-primary ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information + Socials */}
          <div className="w-full max-w-2xl space-y-8">
            <div className="bg-muted p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-6 text-primary">
                Contact Information
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Phone */}
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-accent mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-primary">Phone</p>
                    <p className="text-primary mb-1">UK Office:</p>
                    <a
                      href="tel:+447964595923"
                      className="text-cta hover:underline"
                    >
                      +44 7964 595923
                    </a>
                    <p className="text-primary mt-2 mb-1">East Africa Office:</p>
                    <a
                      href="tel:+254710966523"
                      className="text-cta hover:underline"
                    >
                      +254 710 966523
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-accent mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <a
                      href="mailto:info@royamotorsuk.com"
                      className="text-cta hover:underline"
                    >
                      info@royamotorsuk.com
                    </a>
                    <p className="text-primary mt-2 mb-1">For inquiries:</p>
                    <a
                      href="mailto:sales@royamotorsuk.com"
                      className="text-cta hover:underline"
                    >
                      sales@royamotorsuk.com
                    </a>
                  </div>
                </li>

                {/* UK Headquarters (only UK here now) */}
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mt-1 mr-3" />
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

                {/* East Africa Office moved here */}
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mt-1 mr-3" />
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
            <div className="bg-muted p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-6 text-primary">
                Connect With Us
              </h2>
              <div className="flex space-x-4 mb-6 justify-center">
                <a
                  href="https://facebook.com/RoyaMotorsUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/RoyaMotorsUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/RoyaMotorsUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/447964595923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <a
                href="https://wa.me/447964595923"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-green-600 hover:bg-green-700 text-white w-full flex items-center justify-center"
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
