import {
  getUnreadNotifications,
  readAllNotifications,
  readNotifications,
} from '@/lib/api/notification';
import {
  countNotificationStore,
  NotificationItem,
} from '@/stores/notificationStore';
import dateFormat from '@/utils/dateFormatting';
import { Bell } from 'lucide-react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NotificationModalSkeleton from './NotificationModalSkeleton';
import { useStudiesStore } from '@/stores/useStudiesStore';
import { toast } from 'react-toastify';
import { userAuthStore } from '@/stores/userStore';

export default function NotificationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [notification, setNotification] = useState<NotificationItem[]>([]);
  const router = useRouter();
  const { setUnReadCounts } = countNotificationStore();
  const [isLoading, setIsLoading] = useState(true);
  const { fetchStudies } = useStudiesStore();
  const { fetchUser } = userAuthStore();

  const getRoute = (domainType: string, domainId: number) => {
    switch (domainType) {
      case 'RECRUITMENT_POST':
        return `/recruitment/detail/${domainId}`;
      default:
        return '/';
    }
  };

  // 읽음 여부 관련 없이 내 전체 알림 목록 조회
  const fetchUnreadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await getUnreadNotifications();
      if (data) setNotification(data);
    } catch (error) {
      console.error('알림 불러오기 실패: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  // 내 알림 전체 읽음 처리
  const handleReadAllNotifications = async () => {
    try {
      await readAllNotifications();
      await fetchUnreadNotifications();
      setUnReadCounts(0);
    } catch (error) {
      console.error('전체 읽음 처리 실패:', error);
    }
  };

  // 알림 개별 읽음 처리
  const handleReadNotifications = async (
    alarmId: number,
    domainType: string | null,
    domainId: number,
    alarmType: string,
    accepted: boolean
  ) => {
    try {
      const res = await readNotifications(alarmId, accepted);
      await fetchUser();
      await fetchStudies();
      setNotification((prev) => prev.filter((item) => item.id !== alarmId));
      setUnReadCounts(0);

      if (alarmType === 'INVITE') {
        toast.success(
          res?.message || (accepted ? '수락되었습니다' : '거절되었습니다.')
        );
      }

      if (!domainType) return;

      const route = getRoute(domainType, domainId);
      router.push(route);
    } catch (error) {
      console.error('개별 읽음 처리 실패: ', error);
    }
  };

  return (
    <div className='flex flex-col border border-gray-100 bg-white w-[360px] h-[600px] overflow-auto rounded-[10px] drop-shadow-xl p-5 gap-5'>
      <div className='flex justify-between items-center'>
        <h2 className='tm2'>알림</h2>
        <X className='w-5 h-5 cursor-pointer' onClick={onClose} />
      </div>
      <div className='flex justify-end'>
        <button
          className='t5 w-20 h-6 bg-main text-white rounded hover:bg-[#292929]'
          onClick={handleReadAllNotifications}
        >
          전체 읽기
        </button>
      </div>

      <ul className='flex flex-col cursor-pointer'>
        {isLoading ? (
          <NotificationModalSkeleton />
        ) : !isLoading && notification.length > 0 ? (
          notification.map((item) => (
            <li
              key={item.id}
              className='t4 text-text1 hover:bg-gray4 p-3 rounded-[6px] transition flex flex-col gap-2'
            >
              <div className='flex items-start gap-4 cursor-pointer'>
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full shrink-0 ${
                    item.checked ? 'bg-gray4' : 'bg-[#90CFF1]'
                  }`}
                >
                  <Bell
                    className={`w-4 h-4 ${
                      item.checked ? 'text-gray3' : 'text-white'
                    }`}
                  />
                </div>

                <div className='flex flex-col'>
                  <span className='t4 text-text1'>{item.message}</span>
                  <span className='t5 text-gray5 mt-1'>
                    {dateFormat(item.createdDate)}
                  </span>
                </div>
              </div>

              {item.alarmType === 'INVITE' && !item.checked && (
                <div className='flex gap-2 ml-10'>
                  <button
                    className='px-2 py-1 bg-main text-white rounded t5 hover:bg-[#292929]'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadNotifications(
                        item.id,
                        item.domainType,
                        item.domainId,
                        item.alarmType,
                        true
                      );
                    }}
                  >
                    수락
                  </button>
                  <button
                    className='px-2 py-1 bg-gray3 text-white rounded t5 hover:bg-[#bfbfbf]'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadNotifications(
                        item.id,
                        item.domainType,
                        item.domainId,
                        item.alarmType,
                        false
                      );
                    }}
                  >
                    거절
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <div className='flex items-center justify-center py-50'>
            <span className='t4 text-gray3'>알림이 없습니다.</span>
          </div>
        )}
      </ul>
    </div>
  );
}
