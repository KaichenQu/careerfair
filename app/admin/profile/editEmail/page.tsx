import AdminEditEmail from '@/app/../components/admin/adminEditEmail';
import { adminProfile } from '@/app/../data/adminProfile';

export default function EditEmailPage() {
  return <AdminEditEmail id={adminProfile.id} />;
}