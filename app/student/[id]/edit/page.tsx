import EditProfile from "@/components/student/editProfile";

export default function StudentProfilePage({ params }: { params: { id: number } }) {
  console.log('StudentProfilePage params:', params.id);
  return <EditProfile studentId={params.id} />;
}
