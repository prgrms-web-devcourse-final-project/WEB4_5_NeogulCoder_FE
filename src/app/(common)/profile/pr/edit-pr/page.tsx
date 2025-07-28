// import EditPrClient from '@/components/profile/pr/EditPrClient';
import dynamic from 'next/dynamic';

const EditPrClient = dynamic(
  () => import('@/components/profile/pr/EditPrClient'),
  {
    ssr: false,
  }
);

export default function page() {
  return (
    <>
      <EditPrClient />
    </>
  );
}
