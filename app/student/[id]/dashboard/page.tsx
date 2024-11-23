import Dashboard from '@/components/student/dashboard';

export default function DashboardPage({ params }: { params: { id: string } }) {
  return <Dashboard userId={Number(params.id)} />;
} 