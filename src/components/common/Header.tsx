'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import darkMode from '@/assets/images/dark-mode.svg';
import { ChevronDown } from 'lucide-react';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProfileInfoModal from '../profile/ProfileInfoModal';
import { useRouter } from 'next/navigation';
import NotificationModal from './NotificationModal';
import { userAuthStore } from '@/stores/userStore';
import Link from 'next/link';
import { getUser } from '@/lib/api/user';

export default function Header() {
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const user = userAuthStore((state) => state.user);
  const setUser = userAuthStore((state) => state.setUser);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('login_status');
    if (!user && isLoggedIn) {
      getUser()
        .then((res) => {
          const userData = res.data.data;
          setUser(userData); // 다시 저장
        })
        .catch((error) => {
          localStorage.removeItem('login_status');
          console.error('사용자 정보 불러오기 실패: ', error);
        });
    }
  }, [user, setUser]);

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <div className='w-full flex justify-center pt-2.5 text-text1'>
      <div className='w-full max-w-[1280px] flex items-center justify-between px-4'>
        <Image
          src={logoWibby}
          alt='로고'
          className='w-[80px] h-9 cursor-pointer'
          onClick={handleGoToHome}
          priority
        />
        <div className='flex items-center gap-[18px]'>
          {user ? (
            <div className='flex items-center justify-center gap-4'>
              <div className='relative z-50'>
                <div
                  className='w-[90px] h-[34px] rounded-[5px] bg-gray4 flex items-center justify-center gap-2 cursor-pointer'
                  onClick={() => setIsProfileModalOpen((prev) => !prev)}
                >
                  <span className='tm5'>내 정보</span>
                  <ChevronDown className='w-[18px] h-[18px]' />
                </div>

                {isProfileModalOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-40'
                      onClick={() => setIsProfileModalOpen(false)}
                    />

                    <div
                      className='absolute right-0 top-10 z-50'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ProfileInfoModal
                        onItemClick={() => setIsProfileModalOpen(false)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div
                className='relative'
                onClick={() => setIsNotificationModalOpen(true)}
              >
                <button
                  type='button'
                  className='flex items-center justify-center'
                >
                  <Bell className='w-[22px] h-6' />
                </button>
              </div>
              {isNotificationModalOpen && (
                <div className='fixed bottom-5 right-5 z-50'>
                  <NotificationModal
                    onClose={() => setIsNotificationModalOpen(false)}
                  />
                </div>
              )}
              <div>
                <button
                  type='button'
                  className='flex items-center justify-center'
                >
                  <Image
                    src={darkMode}
                    className='w-[26px] h-[26px]'
                    alt='다크모드'
                  />
                </button>
              </div>
            </div>
          ) : (
            <Link href='/auth/login'>로그인</Link>
          )}
        </div>
      </div>
    </div>
  );
}
