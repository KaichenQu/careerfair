import Dashboard from '@/components/student/dashboard';

export default async function DashboardPage({ params }: { params: { id: string } }) {
  console.log('DashboardPage params:', params.id);
  const userId = parseInt(params.id, 10);

  return <Dashboard userId={userId} />;
} 