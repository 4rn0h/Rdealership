// src/pages/vehicles-detail/components/VehicleActions.jsx

import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { toast } from "../../../components/ui/use-toast"; // ✅ replace with your toast hook/component

const VehicleActions = ({ vehicle, isFavorite, onToggleFavorite, isAuthenticated }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContactTime: "morning",
  });

  const [testDriveForm, setTestDriveForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const vehicleName = `${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`;

  // ✅ Handle Inquiry
  const handleInquirySubmit = (e) => {
    e?.preventDefault();
    console.log("Inquiry submitted:", inquiryForm, "for", vehicleName);
    setShowInquiryModal(false);
    setInquiryForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredContactTime: "morning",
    });

    toast({
      title: "Inquiry submitted",
      description: "We’ll contact you soon regarding this vehicle.",
    });
  };

  // ✅ Handle Test Drive
  const handleTestDriveSubmit = (e) => {
    e?.preventDefault();
    console.log("Test drive booked:", testDriveForm, "for", vehicleName);
    setShowTestDriveModal(false);
    setTestDriveForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    });

    toast({
      title: "Test drive scheduled",
      description: "We’ll confirm your appointment shortly.",
    });
  };

  // ✅ WhatsApp Contact (number configurable via .env later)
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${vehicleName}. Could you please provide more information?`
    );
    const whatsappNumber =
      import.meta.env.VITE_WHATSAPP_NUMBER || "254700123456"; // placeholder
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // ✅ Share Vehicle
  const handleShare = (platform) => {
    const url = window.location?.href;
    const text = `Check out this ${vehicleName} on RoyaMotorsUk Kenya`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      email: `mailto:?subject=${encodeURIComponent(
        text
      )}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    };

    if (platform === "copy") {
      navigator.clipboard?.writeText(url);
      toast({ title: "Link copied", description: "Vehicle link copied to clipboard." });
    } else {
      window.open(shareUrls?.[platform], "_blank");
    }
    setShowShareModal(false);
  };

  return (
    <>
      {/* Desktop Sidebar Actions */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-lg p-6 luxury-shadow-medium space-y-4">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Take Action
          </h3>

          {/* Favorites */}
          {isAuthenticated ? (
            <Button
              variant={isFavorite ? "default" : "outline"}
              fullWidth
              iconName="Heart"
              iconPosition="left"
              onClick={onToggleFavorite}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Sign in to save favorites
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/user-authentication")}
              >
                Sign In
              </Button>
            </div>
          )}

          <Button
            variant="default"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            onClick={() => setShowTestDriveModal(true)}
          >
            Schedule Test Drive
          </Button>

          <Button
            variant="outline"
            fullWidth
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => setShowInquiryModal(true)}
          >
            Make Inquiry
          </Button>

          <Button
            variant="success"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
            onClick={handleWhatsAppContact}
          >
            WhatsApp Contact
          </Button>

          <Button
            variant="ghost"
            fullWidth
            iconName="Share2"
            iconPosition="left"
            onClick={() => setShowShareModal(true)}
          >
            Share Vehicle
          </Button>
        </div>
      </div>

      {/* 🚗 Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-4">
        <div className="flex space-x-2">
          {isAuthenticated && (
            <Button
              variant={isFavorite ? "default" : "outline"}
              size="icon"
              onClick={onToggleFavorite}
            >
              <Icon name="Heart" size={20} />
            </Button>
          )}

          <Button
            variant="outline"
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => setShowTestDriveModal(true)}
          >
            Test Drive
          </Button>

          <Button
            variant="default"
            className="flex-1"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => setShowInquiryModal(true)}
          >
            Inquire
          </Button>

          <Button variant="success" size="icon" onClick={handleWhatsAppContact}>
            <Icon name="MessageCircle" size={20} />
          </Button>
        </div>
      </div>

      {/* 🔹 Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold">Make Inquiry</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInquiryModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
              {/* Name */}
              <input
                type="text"
                required
                value={inquiryForm.name}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, name: e.target.value })
                }
                placeholder="Full Name"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />
              {/* Email */}
              <input
                type="email"
                required
                value={inquiryForm.email}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, email: e.target.value })
                }
                placeholder="Email Address"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />
              {/* Phone */}
              <input
                type="tel"
                required
                value={inquiryForm.phone}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, phone: e.target.value })
                }
                placeholder="+254 700 123 456"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />
              {/* Contact Time */}
              <select
                value={inquiryForm.preferredContactTime}
                onChange={(e) =>
                  setInquiryForm({
                    ...inquiryForm,
                    preferredContactTime: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              >
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
                <option value="anytime">Anytime</option>
              </select>
              {/* Message */}
              <textarea
                rows={4}
                value={inquiryForm.message}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, message: e.target.value })
                }
                placeholder="Any specific questions?"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowInquiryModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Send Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Test Drive Modal */}
      {showTestDriveModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold">
                Schedule Test Drive
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTestDriveModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleTestDriveSubmit} className="p-6 space-y-4">
              <input
                type="text"
                required
                value={testDriveForm.name}
                onChange={(e) =>
                  setTestDriveForm({ ...testDriveForm, name: e.target.value })
                }
                placeholder="Full Name"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />
              <input
                type="email"
                required
                value={testDriveForm.email}
                onChange={(e) =>
                  setTestDriveForm({ ...testDriveForm, email: e.target.value })
                }
                placeholder="Email Address"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />
              <input
                type="tel"
                required
                value={testDriveForm.phone}
                onChange={(e) =>
                  setTestDriveForm({ ...testDriveForm, phone: e.target.value })
                }
                placeholder="+254 700 123 456"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />
              <input
                type="date"
                required
                value={testDriveForm.preferredDate}
                onChange={(e) =>
                  setTestDriveForm({
                    ...testDriveForm,
                    preferredDate: e.target.value,
                  })
                }
                min={new Date()?.toISOString()?.split("T")[0]}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />
              <select
                required
                value={testDriveForm.preferredTime}
                onChange={(e) =>
                  setTestDriveForm({
                    ...testDriveForm,
                    preferredTime: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
              <textarea
                rows={3}
                value={testDriveForm.message}
                onChange={(e) =>
                  setTestDriveForm({ ...testDriveForm, message: e.target.value })
                }
                placeholder="Any special requirements?"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg"
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowTestDriveModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-lg w-full max-w-sm">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold">Share Vehicle</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => handleShare("facebook")}>
                Facebook
              </Button>
              <Button variant="outline" onClick={() => handleShare("twitter")}>
                Twitter
              </Button>
              <Button variant="outline" onClick={() => handleShare("linkedin")}>
                LinkedIn
              </Button>
              <Button variant="outline" onClick={() => handleShare("whatsapp")}>
                WhatsApp
              </Button>
              <Button variant="outline" onClick={() => handleShare("email")}>
                Email
              </Button>
              <Button variant="outline" onClick={() => handleShare("copy")}>
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleActions;
