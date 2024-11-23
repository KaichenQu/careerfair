"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminPage from "@/components/admin/admin";

export default function AdminDashboard() {
  const router = useRouter();
  const params = useParams();
  const adminId = params.id;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedAdminId = localStorage.getItem("admin_id");
      const adminToken = localStorage.getItem("admin_token");

      if (!storedAdminId || !adminToken || storedAdminId !== adminId) {
        router.replace("/admin/login");
        return;
      }
      setIsAuthenticated(true);
    };

    checkAuth();
  }, [adminId, router]);

  // Show nothing while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  return <AdminPage adminId={adminId} />;
}
