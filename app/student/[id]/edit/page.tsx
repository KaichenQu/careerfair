import EditProfile from "@/components/student/editProfile";

export default function StudentProfilePage({ params }: { params: { id: number } }) {
  return <EditProfile studentId={Number(params.id)} />;
}