import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InquiryManagement from './pages/inquiry-management';
import AdminVehicleManagement from './pages/admin-vehicle-management';
import UserDashboard from './pages/user-dashboard';
import VehicleDetail from './pages/vehicle-detail';
import VehicleBrowseSearch from './pages/vehicle-browse-search';
import UserAuthentication from './pages/user-authentication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminVehicleManagement />} />
        <Route path="/inquiry-management" element={<InquiryManagement />} />
        <Route path="/admin-vehicle-management" element={<AdminVehicleManagement />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/vehicle-detail" element={<VehicleDetail />} />
        <Route path="/vehicle-browse-search" element={<VehicleBrowseSearch />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
