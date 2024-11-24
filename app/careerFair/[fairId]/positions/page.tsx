import AuthLayout from '@/components/layouts/AuthLayout';
import PositionsPage from './position';  // Assuming you move the main component logic to this file

export default function Page() {
  return (
    <AuthLayout>
      <PositionsPage />
    </AuthLayout>
  );
}
