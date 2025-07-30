'use client';

import CalendarBigDetailItem from './CalendarBigDetailItem';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { dayFormatting } from '@/utils/day';
import {
  deleteStudyEvent,
  deleteUserEvent,
  getStudyDayEvents,
  getUserDayEvents,
} from '@/lib/api/calendar.api';
import { useEffect, useState } from 'react';
import { userAuthStore } from '@/stores/userStore';
import { ScheduleInputType } from './CalendarBigShell';
import CalendarBigDetailItemSkeleton from './Skeleton/CalendarBigDetailItemSkeleton';
import { calendarFormattingResult } from '@/utils/calendarTypeFormatting';
import { toast } from 'react-toastify';
import { CalendarDays, X } from 'lucide-react';

dayjs.extend(isBetween);

export default function CalendarBigDetail({
  handleEventUpdate,
  handleEventDelete,
  closeDetailHandler,
  date,
  category,
  type,
}: {
  handleEventUpdate: (id: number, data: ScheduleInputType) => void;
  handleEventDelete: (id: number) => void;
  closeDetailHandler: () => void;
  date: string;
  category: { name: string; id: number; isProgress: boolean };
  type: string;
}) {
  const authId = userAuthStore().user?.id;

  const dateFormat = (date: string) => {
    const dateString =
      dayjs(date).format('YYYY') +
      '년 ' +
      dayjs(date).format('M') +
      '월 ' +
      dayjs(date).format('D') +
      '일 ' +
      dayFormatting(date);
    return dateString;
  };

  // 해당 날짜에 해당하는 개인일정, 스터디일정의 목록을 조회하는 api호출 예정...
  const [events, setEvents] = useState<UnionScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!authId) return;
    const fetchDateEvent = async () => {
      setIsLoading(true);
      let data;
      try {
        if (type === 'personal') {
          const { data: result } = await getUserDayEvents(authId, date);
          data = result;
        } else {
          const { data: result } = await getStudyDayEvents(category.id, date);
          data = result;
        }
        setEvents(calendarFormattingResult(data));
      } catch (error) {
        console.error('상세일정을 불러오지 못했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDateEvent();
  }, [type, category, date, authId]);

  // 상세일정삭제
  const handleEventDetailDelete = (scheduleId: number) => {
    setEvents((prev) => prev.filter((f) => f.scheduleId !== scheduleId));
  };

  const handleDelete = async (scheduleId: number) => {
    try {
      const deleteFn = type === 'personal' ? deleteUserEvent : deleteStudyEvent;
      const res = await deleteFn(category.id, scheduleId);

      if (res) {
        handleEventDelete(scheduleId); // 전체에서 삭제
        handleEventDetailDelete(scheduleId); // 상세에서 삭제
        toast.success('일정 삭제가 완료되었습니다.');
      } else {
        toast.error('일정 삭제에 실패했습니다.');
      }
    } catch (error) {
      toast.error('일정 삭제 중 오류 발생: ' + error);
    }
  };

  // 상세일정수정
  const handleDetailUpdate = (
    scheduleId: number,
    newData: ScheduleInputType
  ) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.scheduleId === scheduleId ? { ...item, ...newData } : item
      )
    );
  };

  const handleUpdate = async (
    scheduleId: number,
    newData: ScheduleInputType
  ) => {
    handleEventUpdate(scheduleId, newData);
    handleDetailUpdate(scheduleId, newData);
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center'>
        <div className='pt-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] w-full'>
          <div className='flex justify-between mb-8 px-9 '>
            {/* 모달헤더 */}
            <h3 className='tm2'>일정 상세</h3>
            <button onClick={closeDetailHandler}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            {/* 내용 */}
            <p className='t3 mb-6 px-9 '>{`${dateFormat(date)}요일`}</p>
            <div className='overflow-auto max-h-[calc(90vh-160px)] flex flex-col gap-5 px-9 pb-7'>
              {isLoading ? (
                <CalendarBigDetailItemSkeleton />
              ) : events && events.length > 0 ? (
                events.map((event, i) => (
                  <CalendarBigDetailItem
                    key={`schedule${i}`}
                    category={category}
                    result={event}
                    type={type}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                ))
              ) : (
                <div className='flex h-full justify-center flex-col gap-5 pt-7 pb-15'>
                  <div className='text-center'>
                    <CalendarDays
                      className='mx-auto mb-3 w-[50px] h-[50px] text-border2'
                      strokeWidth={1}
                    />
                    <p className='tm4 text-border2'>
                      해당 날짜에 등록된 일정이 없습니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
