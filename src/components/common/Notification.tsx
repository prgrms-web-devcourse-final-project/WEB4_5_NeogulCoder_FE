'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import NotificationModal from './NotificationModal';
import { getUnreadNotifications } from '@/lib/api/notification';
import { countNotificationStore } from '@/stores/notificationStore';

export default function Notification() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { unReadCounts, setUnReadCounts } = countNotificationStore();

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

  return (
    <div className='relative'>
      <button
        type='button'
        className='flex items-center justify-center w-[38px] h-[38px] rounded-full hover:bg-[#EEEEEE] transition-colors'
        onClick={() => setIsNotificationModalOpen((prev) => !prev)}
      >
        <div className='relative w-[22px] h-6'>
          <Bell className='w-[22px] h-6' />
          {unReadCounts > 0 && (
            <span className='absolute -top-0.5 -right-0 bg-[#FF3B30] text-white text-[10px] w-[10px] h-[10px] flex items-center justify-center rounded-full'></span>
          )}
        </div>
      </button>

      {isNotificationModalOpen && (
        <div className='fixed z-50 inset-0 lg:inset-auto lg:bottom-5 lg:right-5 flex items-center justify-center lg:items-end lg:justify-end'>
          <NotificationModal
            onClose={() => setIsNotificationModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
