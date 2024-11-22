'use client';
import { useParams } from 'next/navigation';
import CompanyDashboard from '@/components/company/company';

export default function CompanyPage() {
  const params = useParams();
  const companyId = params.id;

  if (!companyId) {
    return <div>Company ID not found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <CompanyDashboard id={Number(companyId)} />
    </main>
  );
}
