import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VehicleActions = ({ vehicleId, vehicleName, isFavorite, onToggleFavorite, isAuthenticated }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContactTime: 'morning'
  });
  const [testDriveForm, setTestDriveForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleInquirySubmit = (e) => {
    e?.preventDefault();
    // Mock inquiry submission
    console.log('Inquiry submitted:', inquiryForm);
    setShowInquiryModal(false);
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      preferredContactTime: 'morning'
    });
    // Show success message
    alert('Your inquiry has been submitted successfully! We will contact you soon.');
  };

  const handleTestDriveSubmit = (e) => {
    e?.preventDefault();
    // Mock test drive booking
    console.log('Test drive booked:', testDriveForm);
    setShowTestDriveModal(false);
    setTestDriveForm({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    // Show success message
    alert('Test drive scheduled successfully! We will confirm your appointment soon.');
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${vehicleName}. Could you please provide more information?`);
    const whatsappUrl = `https://wa.me/254700123456?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = (platform) => {
    const url = window.location?.href;
    const text = `Check out this ${vehicleName} on LuxAuto Kenya`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
    };

    if (platform === 'copy') {
      navigator.clipboard?.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls?.[platform], '_blank');
    }
    setShowShareModal(false);
  };

  return (
    <>
      {/* Desktop Sidebar Actions */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-lg p-6 luxury-shadow-medium space-y-4">
          <h3 className="font-heading font-semibold text-foreground mb-4">Take Action</h3>
          
          {isAuthenticated ? (
            <Button
              variant={isFavorite ? "default" : "outline"}
              fullWidth
              iconName="Heart"
              iconPosition="left"
              onClick={onToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Sign in to save favorites</p>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/user-authentication'}>
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
      {/* Mobile Sticky Action Bar */}
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
          
          <Button
            variant="success"
            size="icon"
            onClick={handleWhatsAppContact}
          >
            <Icon name="MessageCircle" size={20} />
          </Button>
        </div>
      </div>
      {/* Inquiry Modal */}
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
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={inquiryForm?.name}
                  onChange={(e) => setInquiryForm({...inquiryForm, name: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inquiryForm?.email}
                  onChange={(e) => setInquiryForm({...inquiryForm, email: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={inquiryForm?.phone}
                  onChange={(e) => setInquiryForm({...inquiryForm, phone: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+254 700 123 456"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Contact Time
                </label>
                <select
                  value={inquiryForm?.preferredContactTime}
                  onChange={(e) => setInquiryForm({...inquiryForm, preferredContactTime: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={inquiryForm?.message}
                  onChange={(e) => setInquiryForm({...inquiryForm, message: e?.target?.value})}
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Any specific questions or requirements?"
                />
              </div>
              
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
      {/* Test Drive Modal */}
      {showTestDriveModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold">Schedule Test Drive</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTestDriveModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleTestDriveSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={testDriveForm?.name}
                  onChange={(e) => setTestDriveForm({...testDriveForm, name: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={testDriveForm?.email}
                  onChange={(e) => setTestDriveForm({...testDriveForm, email: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={testDriveForm?.phone}
                  onChange={(e) => setTestDriveForm({...testDriveForm, phone: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+254 700 123 456"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={testDriveForm?.preferredDate}
                  onChange={(e) => setTestDriveForm({...testDriveForm, preferredDate: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  min={new Date()?.toISOString()?.split('T')?.[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Time *
                </label>
                <select
                  required
                  value={testDriveForm?.preferredTime}
                  onChange={(e) => setTestDriveForm({...testDriveForm, preferredTime: e?.target?.value})}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={testDriveForm?.message}
                  onChange={(e) => setTestDriveForm({...testDriveForm, message: e?.target?.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Any special requirements or questions?"
                />
              </div>
              
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
      {/* Share Modal */}
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
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShare('facebook')}
                  iconName="Facebook"
                  iconPosition="left"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('twitter')}
                  iconName="Twitter"
                  iconPosition="left"
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('linkedin')}
                  iconName="Linkedin"
                  iconPosition="left"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('whatsapp')}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('email')}
                  iconName="Mail"
                  iconPosition="left"
                >
                  Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('copy')}
                  iconName="Copy"
                  iconPosition="left"
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleActions;