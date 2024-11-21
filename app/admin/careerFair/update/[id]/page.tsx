"use client";

import AdminUpdateCareer from "@/app/Components/adminPage/adminUpdateCareer";
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function UpdateCareerFair({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const fairId = resolvedParams.id;

  return (
    <AdminUpdateCareer 
      fairId={fairId}
      onUpdateSuccess={(updatedFair) => {
        console.log('Updated Career Fair:', updatedFair);
        router.push('/adminPage/careerFair');
      }}
    />
  );
}