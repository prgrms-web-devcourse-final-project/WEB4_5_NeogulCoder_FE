'use client';
import LoginSkeleton from '@/components/login/skeleton/LoginSkeleton';
import { getUser } from '@/lib/api/user';
import { userAuthStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  const router = useRouter();
  const setUser = userAuthStore((state) => state.setUser);

  useEffect(() => {
    getUser()
      .then((res) => {
        const userData = res.data.data;
        localStorage.setItem('login_status', 'Y');
        setUser(userData);
        router.push('/');
      })
      .catch((error) => {
        console.error('사용자 정보 가져오기 실패:', error);
        localStorage.removeItem('login_status');
      });
  }, [router, setUser]);

  return <LoginSkeleton />;
}
