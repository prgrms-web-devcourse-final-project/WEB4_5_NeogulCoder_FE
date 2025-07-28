import ManagerRecruitmentsPage from '@/components/manager/ManagerRecruitmentsPage';
import { Suspense } from 'react';

export default function page() {
  return (
    <>
      <Suspense>
        <ManagerRecruitmentsPage />
      </Suspense>
    </>
  );
}
