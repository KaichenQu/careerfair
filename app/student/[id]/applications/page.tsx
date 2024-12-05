import AppliedPositions from "@/components/student/appliedPositions";

export default function AppliedPositionsPage({
  params,
}: {
  params: { id: number };
}) {
  return <AppliedPositions studentId={params.id} />;
}