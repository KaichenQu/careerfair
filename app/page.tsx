'use client';

import AuthLayout from '@/components/layouts/AuthLayout';
import Home from '@/components/home';

export default function HomePage() {
  return (
    <AuthLayout>
      <Home />
    </AuthLayout>
  );
}
