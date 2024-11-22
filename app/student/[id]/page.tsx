'use client';
import { useParams } from 'next/navigation';
import StudentProfile from "@/components/student/StudentProfile";

export default function Student() {
  const params = useParams();
  const studentId = params.id;

  if (!studentId) {
    return <div>Student ID not found</div>;
  }
  return <StudentProfile id={Number(studentId)} />;
}



