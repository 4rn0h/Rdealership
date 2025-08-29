// src/layouts/PublicLayout.jsx
import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-20"> {/* pt-20 ensures content is not hidden behind fixed navbar */}
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
