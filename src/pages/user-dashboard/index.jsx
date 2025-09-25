// src/pages/user-dashboard/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { supabase } from "../../lib/supabaseClient";

// Import dashboard components
import FavoriteVehicleCard from "./components/FavoriteVehicleCard";
import InquiryCard from "./components/InquiryCard";
import TestDriveCard from "./components/TestDriveCard";
import PriceAlertCard from "./components/PriceAlertCard";
import ActivityFeedCard from "./components/ActivityFeedCard";
import QuickActionCard from "./components/QuickActionCard";
import NotificationPreferences from "./components/NotificationPreferences";
import ProfileCompletionCard from "./components/ProfileCompletionCard";

// ✅ Import only the mocks still needed
import {
  mockFavoriteVehicles,
  mockInquiries,
  mockTestDrives,
  mockPriceAlerts,
  mockNotificationPreferences,
} from "../../data/Dashboard_Data.js";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Data states
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Profile completion stays local
  const mockProfileCompletion = {
    percentage: 65,
    completedSteps: 4,
    totalSteps: 7,
    missingSteps: ["budget_range", "vehicle_preferences", "profile_photo"],
  };

  // 🔄 Fetch dashboard + core tables
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 1. Stats
        const { data: statsData, error: statsError } = await supabase
          .from("dashboard_stats")
          .select("*")
          .single();

        if (statsError || !statsData) {
          console.warn("Stats fallback to mocks:", statsError?.message);
          setStats({
            total_vehicles: mockFavoriteVehicles.length,
            total_inquiries: mockInquiries.length,
            total_test_drives: mockTestDrives.length,
            total_price_alerts: mockPriceAlerts.length,
            total_favorites: mockFavoriteVehicles.length,
            last_vehicle_update: new Date().toISOString(),
            generated_at: new Date().toISOString(),
          });
        } else {
          setStats(statsData);
        }

        // 2. Favorites
        const { data: favs, error: favsError } = await supabase
          .from("favorites")
          .select("id, vehicle_id, created_at, vehicles(*)")
          .limit(10);

        setFavorites(favsError || !favs?.length ? mockFavoriteVehicles : favs);

        // 3. Inquiries
        const { data: inq, error: inqError } = await supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        setInquiries(inqError || !inq?.length ? mockInquiries : inq);

        // 4. Test Drives
        const { data: drives, error: drivesError } = await supabase
          .from("test_drives")
          .select("*")
          .order("scheduled_at", { ascending: false })
          .limit(5);

        setTestDrives(drivesError || !drives?.length ? mockTestDrives : drives);

        // 5. Price Alerts
        const { data: alerts, error: alertsError } = await supabase
          .from("price_alerts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        setPriceAlerts(alertsError || !alerts?.length ? mockPriceAlerts : alerts);

      } catch (err) {
        console.error("Dashboard fetch error:", err);

        // 🔄 fallback to mocks for everything
        setStats({
          total_vehicles: mockFavoriteVehicles.length,
          total_inquiries: mockInquiries.length,
          total_test_drives: mockTestDrives.length,
          total_price_alerts: mockPriceAlerts.length,
          total_favorites: mockFavoriteVehicles.length,
          last_vehicle_update: new Date().toISOString(),
          generated_at: new Date().toISOString(),
        });
        setFavorites(mockFavoriteVehicles);
        setInquiries(mockInquiries);
        setTestDrives(mockTestDrives);
        setPriceAlerts(mockPriceAlerts);
      } finally {
        setLoading(false);
      }
    };

    // Fake user load
    const timer = setTimeout(() => {
      setUser({
        id: 1,
        name: "David Kimani",
        email: "david.kimani@email.com",
        role: "user",
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
        joinedAt: "2024-11-15T10:00:00Z",
        preferences: {
          currency: "KES",
          notifications: mockNotificationPreferences,
        },
      });
    }, 1000);

    fetchDashboard();
    return () => clearTimeout(timer);
  }, []);

  // ✅ Handlers
  const handleRemoveFavorite = (vehicleId) =>
    console.log("Remove favorite:", vehicleId);
  const handleTogglePriceAlert = (vehicleId) =>
    console.log("Toggle price alert:", vehicleId);
  const handleRescheduleTestDrive = (testDriveId) =>
    console.log("Reschedule test drive:", testDriveId);
  const handleCancelTestDrive = (testDriveId) =>
    console.log("Cancel test drive:", testDriveId);
  const handleToggleAlert = (alertId) =>
    console.log("Toggle alert:", alertId);
  const handleRemoveAlert = (alertId) =>
    console.log("Remove alert:", alertId);
  const handleSaveNotificationPreferences = async (preferences) => {
    console.log("Save preferences:", preferences);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };
  const handleDismissProfileCompletion = () =>
    console.log("Dismiss profile completion");

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Header */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Welcome back, {user?.name?.split(" ")?.[0]}!
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your luxury vehicle journey
              </p>
              {stats && (
                <p className="text-sm text-muted-foreground mt-2">
                  🚗 Vehicles: {stats.total_vehicles} | 📩 Inquiries:{" "}
                  {stats.total_inquiries} | 🗓 Test Drives:{" "}
                  {stats.total_test_drives}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate("/vehicle-browse-search")}
                iconName="Search"
                iconPosition="left"
              >
                Browse Vehicles
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/inquiry-management")}
                iconName="MessageSquare"
                iconPosition="left"
              >
                New Inquiry
              </Button>
            </div>
          </div>

          {/* Profile Completion */}
          {mockProfileCompletion?.percentage < 90 && (
            <div className="mb-8">
              <ProfileCompletionCard
                completionData={mockProfileCompletion}
                onDismiss={handleDismissProfileCompletion}
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <QuickActionCard />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Favorites */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    My Favorites
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigate("/vehicle-browse-search?section=favorites")
                    }
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All ({favorites?.length})
                  </Button>
                </div>
                {favorites?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.slice(0, 4).map((favorite) => (
                      <FavoriteVehicleCard
                        key={favorite?.id}
                        vehicle={favorite?.vehicles || favorite}
                        onRemoveFavorite={handleRemoveFavorite}
                        onPriceAlert={handleTogglePriceAlert}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon
                      name="Heart"
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="font-medium text-foreground mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start browsing and save vehicles you're interested in
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/vehicle-browse-search")}
                      iconName="Search"
                      iconPosition="left"
                    >
                      Browse Vehicles
                    </Button>
                  </div>
                )}
              </div>

              {/* Recent Inquiries */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Recent Inquiries
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/inquiry-management")}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All ({inquiries?.length})
                  </Button>
                </div>
                {inquiries?.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.slice(0, 3).map((inquiry) => (
                      <InquiryCard key={inquiry?.id} inquiry={inquiry} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon
                      name="MessageSquare"
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="font-medium text-foreground mb-2">
                      No inquiries yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send your first inquiry about a vehicle you're interested
                      in
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/vehicle-browse-search")}
                      iconName="MessageSquare"
                      iconPosition="left"
                    >
                      Make Inquiry
                    </Button>
                  </div>
                )}
              </div>

              {/* Test Drives */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Scheduled Test Drives
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigate("/user-dashboard?section=test-drives")
                    }
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All ({testDrives?.length})
                  </Button>
                </div>
                {testDrives?.length > 0 ? (
                  <div className="space-y-4">
                    {testDrives.slice(0, 2).map((testDrive) => (
                      <TestDriveCard
                        key={testDrive?.id}
                        testDrive={testDrive}
                        onReschedule={handleRescheduleTestDrive}
                        onCancel={handleCancelTestDrive}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon
                      name="Calendar"
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="font-medium text-foreground mb-2">
                      No test drives scheduled
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Schedule a test drive to experience our luxury vehicles
                    </p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate("/vehicle-browse-search?action=schedule")
                      }
                      iconName="Calendar"
                      iconPosition="left"
                    >
                      Schedule Test Drive
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Price Alerts */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Price Alerts
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/user-dashboard?section=alerts")}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All
                  </Button>
                </div>
                {priceAlerts?.length > 0 ? (
                  <div className="space-y-4">
                    {priceAlerts.slice(0, 2).map((alert) => (
                      <PriceAlertCard
                        key={alert?.id}
                        alert={alert}
                        onToggleAlert={handleToggleAlert}
                        onRemoveAlert={handleRemoveAlert}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <Icon
                      name="Bell"
                      size={32}
                      className="text-muted-foreground mx-auto mb-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      No price alerts set
                    </p>
                  </div>
                )}
              </div>

              {/* Activity */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Recent Activity
                </h3>
                <ActivityFeedCard />
              </div>

              {/* Notifications */}
              <NotificationPreferences
                preferences={mockNotificationPreferences}
                onSave={handleSaveNotificationPreferences}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
