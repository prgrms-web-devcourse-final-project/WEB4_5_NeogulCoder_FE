import ManagerUsersPage from '@/components/manager/ManagerUsersPage';
import { Suspense } from 'react';

export default function page() {
  return (
    <>
      <Suspense>
        <ManagerUsersPage />
      </Suspense>
    </>
  );
}
