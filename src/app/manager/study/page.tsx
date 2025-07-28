import ManagerStudiesPage from '@/components/manager/ManagerStudiesPage';
import { Suspense } from 'react';

export default function page() {
  return (
    <>
      <Suspense>
        <ManagerStudiesPage />
      </Suspense>
    </>
  );
}
