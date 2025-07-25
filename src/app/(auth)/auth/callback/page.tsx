'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('login_status', 'Y');
    router.push('/');
  }, [router]);

  return <></>;
}
