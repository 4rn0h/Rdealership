import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow pt-20"> {/* pt-20 ensures content clears the fixed header */}
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
