import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Global UI
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

// Pages
import Home from "./home";
import About from "./about";
import Contacts from "./contacts";
import VehicleBrowseSearch from "./vehicle-browse-search";
import VehicleDetail from "./vehicle-detail";
import UserAuth from "./user-authentication";
import UserDashboard from "./user-dashboard";
import InquiryManagement from "./inquiry-management";
import AdminVehicleManagement from "./admin-vehicle-management";
import NotFound from "./NotFound";

// CTA
import CallToAction from "./home/components/CallToAction";

// Layout wrapper to handle CTA placement
function Layout({ children }) {
  const location = useLocation();

  // Show CTA only on home ("/") and about ("/about")
  const showCTA = location.pathname === "/" || location.pathname === "/about";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      {showCTA && <CallToAction />}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cars" element={<VehicleBrowseSearch />} />
          <Route path="/cars/:id" element={<VehicleDetail />} />
          <Route path="/user-authentication/*" element={<UserAuth />} />
          <Route path="/user-dashboard/*" element={<UserDashboard />} />
          <Route path="/inquiry-management/*" element={<InquiryManagement />} />
          <Route path="/admin-vehicle-management/*" element={<AdminVehicleManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}
