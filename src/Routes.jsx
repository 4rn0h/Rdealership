import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

// Layouts
import PublicLayout from "layouts/PublicLayout";
import AuthLayout from "layouts/AuthLayout";

// Pages
import Home from "pages/home";
import About from "pages/about";
import Contacts from "pages/contacts";
import UserAuthentication from "pages/user-authentication";
import VehicleBrowseSearch from "pages/vehicle-browse-search";
import InquiryManagement from "pages/inquiry-management";
import AdminVehicleManagement from "pages/admin-vehicle-management";
import UserDashboard from "pages/user-dashboard";
import VehicleDetail from "pages/vehicle-detail";
import Terms from "pages/terms";
import PrivacyPolicy from "pages/privacy-policy";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />

        <RouterRoutes>
          {/* Public Routes (with Header + Footer) */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />
          <Route
            path="/contacts"
            element={
              <PublicLayout>
                <Contacts />
              </PublicLayout>
            }
          />
          <Route
            path="/vehicle-browse-search"
            element={
              <PublicLayout>
                <VehicleBrowseSearch />
              </PublicLayout>
            }
          />
          <Route
            path="/inquiry-management"
            element={
              <PublicLayout>
                <InquiryManagement />
              </PublicLayout>
            }
          />
          <Route
            path="/admin-vehicle-management"
            element={
              <PublicLayout>
                <AdminVehicleManagement />
              </PublicLayout>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <PublicLayout>
                <UserDashboard />
              </PublicLayout>
            }
          />
          <Route
            path="/vehicle-detail"
            element={
              <PublicLayout>
                <VehicleDetail />
              </PublicLayout>
            }
          />

          {/* Auth Routes (no Header/Footer) */}
          <Route
            path="/user-authentication"
            element={
              <AuthLayout>
                <UserAuthentication />
              </AuthLayout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
