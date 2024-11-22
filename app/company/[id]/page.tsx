
import CompanyDashboard from '@/components/company/company';
import { sampleCompanies } from '@/data/company';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  }
}

export default function CompanyPage({ params }: PageProps) {
  const companyId = parseInt(params.id);
  const company = sampleCompanies.find(c => c.id === companyId);
  
  if (!company) {
    notFound();
  }

  return (
    <main>
      <CompanyDashboard companyId={companyId} />

    </main>
  );
}
