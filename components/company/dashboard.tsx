import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
const CompanyDashboard = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>
        {/* Add dashboard content here */}
      </div>
    </Layout>
  );
};

export default CompanyDashboard; 