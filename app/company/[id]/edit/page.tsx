import CompanyEditForm from '@/components/company/editProfile';
import { sampleCompanies } from '@/data/company';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  }
}

export default function CompanyEditPage({ params }: PageProps) {
  const companyId = parseInt(params.id);
  const company = sampleCompanies.find(c => c.id === companyId);
  console.log('Found company:', company);
  
  if (!company) {
    notFound();
  }

  return (
    <main>
      <CompanyEditForm company={company} />
    </main>
  );
}
