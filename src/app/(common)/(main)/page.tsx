'use client';

import MainPage from '@/components/main/MainPage';
import { userAuthStore } from '@/stores/userStore';

export default function Main() {
  const user = userAuthStore((state) => state.user);

  if (user === undefined) return null;

  return (
    <>
      <MainPage />
    </>
  );
}
