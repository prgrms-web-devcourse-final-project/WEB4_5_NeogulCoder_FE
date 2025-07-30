'use client';
import LoginSkeleton from '@/components/auth/skeleton/LoginSkeleton';
import { getUser } from '@/lib/api/user';
import { userAuthStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackClient() {
  const router = useRouter();
  const setUser = userAuthStore((state) => state.setUser);

  useEffect(() => {
    getUser()
      .then((res) => {
        const userData = res.data.data;
        localStorage.setItem('login_status', 'Y');
        document.cookie = 'login_status=true; path=/';
        setUser(userData);
        router.push('/');
      })
      .catch((error) => {
        console.error('사용자 정보 가져오기 실패:', error);
        localStorage.removeItem('login_status');
        document.cookie = 'login_status=; path=/';
      });
  }, [router, setUser]);

  return <LoginSkeleton />;
}
