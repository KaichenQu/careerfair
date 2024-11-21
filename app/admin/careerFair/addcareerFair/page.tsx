"use client";

import CreateCareerFair from '@/app/../components/admin/createAddCareerFair';
import { useRouter } from 'next/navigation';

interface CareerFairData {
  fair_id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

export default function CreateCareerFairPage() {
  const router = useRouter();

  const handleCareerFairCreated = (careerFairData: CareerFairData) => {
    // Here you can handle the created career fair data
    console.log('Career Fair Created:', careerFairData);
    
    // You can store it in localStorage or pass it to another component
    localStorage.setItem('lastCreatedCareerFair', JSON.stringify(careerFairData));
    
    // Redirect to the career fairs list with the new data
    router.push({
      pathname: '/admin/career-fairs',
      query: { 
        newFairId: careerFairData.fair_id,
        created: 'true'
      }
    });
  };

  return (
    <CreateCareerFair 
      onCareerFairCreated={handleCareerFairCreated}
    />
  );
}
