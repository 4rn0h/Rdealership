import React from "react";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <h1 className="text-4xl font-serif font-bold mb-6">Contact Us</h1>

      {/* Contact Details */}
      <div className="text-lg text-muted-foreground space-y-3 mb-8">
        <p>Sales Tel: 020 8115 4910</p>
        <p>Mobile: 07441 949883</p>
        <p>Address: 247a Acton Lane, London, Middlesex, NW10 7NR</p>
      </div>

      {/* Contact Form */}
      <form className="bg-card p-6 rounded-xl luxury-shadow-medium space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-border p-3 rounded-lg bg-background"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-border p-3 rounded-lg bg-background"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border border-border p-3 rounded-lg bg-background min-h-[150px]"
        ></textarea>
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contacts;
