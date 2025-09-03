'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import { ChevronDown } from 'lucide-react';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProfileInfoModal from '../profile/ProfileInfoModal';
import { useRouter } from 'next/navigation';
import NotificationModal from './NotificationModal';
import { userAuthStore } from '@/stores/userStore';
import Link from 'next/link';
import { getUser } from '@/lib/api/user';
import { getUnreadNotifications } from '@/lib/api/notification';
import { countNotificationStore } from '@/stores/notificationStore';

export default function Header() {
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const user = userAuthStore((state) => state.user);
  const setUser = userAuthStore((state) => state.setUser);
  const { unReadCounts, setUnReadCounts } = countNotificationStore();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('login_status');
    if (user === undefined && isLoggedIn) {
      getUser()
        .then((res) => {
          const userData = res.data.data;
          setUser(userData); // 다시 저장
        })
        .catch((error) => {
          localStorage.removeItem('login_status');
          document.cookie = 'login_status=; path=/';
          console.error('사용자 정보 불러오기 실패: ', error);
        });
    }
  }, [user, setUser]);

  // 읽지 않은 알림
  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      const isLoggedIn = localStorage.getItem('login_status');
      if (!isLoggedIn) return;
      try {
        const data = await getUnreadNotifications();
        setUnReadCounts(data.length);
      } catch (error) {
        console.error('읽지 않은 알림 조회 실패: ', error);
      }
    };
    fetchUnreadNotifications();
  }, [setUnReadCounts]);

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
          {user === undefined ? null : user ? (
            <div className='flex items-center justify-center gap-4'>
              <div
                className='relative'
                onClick={() => setIsNotificationModalOpen((prev) => !prev)}
              >
                <button
                  type='button'
                  className='flex items-center justify-center w-[38px] h-[38px] rounded-full hover:bg-[#EEEEEE] transition-colors'
                >
                  <div className='relative w-[22px] h-6'>
                    <Bell className='w-[22px] h-6' />
                    {unReadCounts > 0 && (
                      <span className='absolute -top-0.5 -right-0 bg-[#FF3B30] text-white text-[10px] w-[10px] h-[10px] flex items-center justify-center rounded-full'></span>
                    )}
                  </div>
                </button>
              </div>
              {isNotificationModalOpen && (
                <div className='fixed bottom-5 right-5 z-50'>
                  <NotificationModal
                    onClose={() => setIsNotificationModalOpen(false)}
                  />
                </div>
              )}
              <div className='relative'>
                <div
                  className='w-[90px] h-[34px] rounded-[4px] bg-gray4 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EEEEEE]'
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
            </div>
          ) : (
            <Link href='/auth/login' className='t4'>
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
