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

export default function Header() {
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGoToHome = () => {
    router.push('/');
  };

  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className='w-full flex justify-center pt-2.5 text-text1'>
      <div className='w-full max-w-[1280px] flex items-center justify-between px-4'>
        <Image
          src={logoWibby}
          alt='로고'
          className='w-[80px] h-9 cursor-pointer'
          onClick={handleGoToHome}
        />

        <div className='flex items-center gap-[18px]'>
          <div className='flex items-center justify-center gap-4'>
            <div
              className='w-[90px] h-[34px] rounded-[5px] bg-gray4 flex items-center justify-center gap-2 relative cursor-pointer'
              onClick={() => setIsProfileModalOpen((prev) => !prev)}
            >
              <span className='tm5 cursor-pointer'>내 정보</span>

              <button type='button'>
                <ChevronDown className='w-[18px] h-[18px]' />
              </button>

              {isProfileModalOpen && (
                <div className='absolute right-0 top-10'>
                  <ProfileInfoModal />
                </div>
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
        </div>
      </div>
    </div>
  );
}
