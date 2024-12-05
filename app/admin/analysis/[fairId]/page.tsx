"use client";

import { useParams } from "next/navigation";
import DataAnalysis from "@/components/admin/dataAnalysis";

export default function DataAnalysisPage() {
  const params = useParams();
  const fairId = params.fairId as string;
  const adminId = localStorage.getItem("admin_id") || "";

  return <DataAnalysis adminId={adminId} fairId={fairId} />;
}
