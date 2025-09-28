import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/ui/Header";
import AdminSidebar from "../../components/ui/AdminSidebar";
import UserTable from "./components/UserTable";

const AdminUserManagement = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Only allow admins
  useEffect(() => {
    const checkAdmin = async () => {
      setChecking(true);
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        navigate("/user-authentication");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || !profile || profile.role !== "admin") {
        navigate("/user-dashboard");
        return;
      }

      setChecking(false);
    };

    checkAdmin();
  }, [navigate]);

  // ✅ Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone, location, role, created_at")
      .order("created_at", { ascending: false });

    if (!error) setUsers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!checking) {
      fetchUsers();
    }
  }, [checking, fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-2xl font-bold text-primary">
          Luxury Automotive Excellence
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-heading font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage user accounts and assign roles
            </p>
          </div>

          <UserTable
            users={users}
            loading={loading}
            onRoleChange={handleRoleChange}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminUserManagement;
