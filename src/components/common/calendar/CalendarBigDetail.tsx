'use client';

import { CalendarDays, X } from 'lucide-react';
import CalendarBigDetailItem from './CalendarBigDetailItem';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { dayFormatting } from '@/utils/day';
import {
  deleteStudyEvent,
  getStudyDayEvents,
  getUserDayEvents,
} from '@/lib/api/calendar.api';
import { useEffect, useState } from 'react';
import { userAuthStore } from '@/stores/userStore';
dayjs.extend(isBetween);

export default function CalendarBigDetail({
  closeDetailHandler,
  date,
  studyId,
  type,
}: {
  closeDetailHandler: () => void;
  date: string;
  studyId: number;
  type: string;
}) {
  const authId = userAuthStore().user?.id;
  const dateFormat = (date: string) => {
    const dateString =
      dayjs(date).get('y') +
      '년 ' +
      dayjs(date).get('M') +
      '월 ' +
      dayjs(date).get('D') +
      '일 ' +
      dayFormatting(date);
    return dateString;
  };

  // 해당 날짜에 해당하는 개인일정, 스터디일정의 목록을 조회하는 api호출 예정...
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (!authId) return;
    const fetchDateEvent = async () => {
      if (type === 'personal') {
        const { data } = await getUserDayEvents(authId, date);
        setEvents(data);
      } else {
        const { data } = await getStudyDayEvents(studyId, date);
        setEvents(data);
      }
    };
    fetchDateEvent();
  }, [type, studyId, date, authId]);
  const refetch = async () => {
    if (!authId) return;
    if (type === 'personal') {
      const { data } = await getUserDayEvents(authId, date);
      setEvents(data);
    } else {
      const { data } = await getStudyDayEvents(studyId, date);
      setEvents(data);
    }
  };
  const handleDelete = async (teamCalendarId: number) => {
    await deleteStudyEvent(studyId, teamCalendarId)
      .then((res) => {
        if (res) {
          alert('일정 삭제에 성공했습니다.');
          refetch(); //📌 일정삭제후에 디테일 refetch() 하고 싶음 근데 안되는중
        }
      })
      .catch((error) => {
        console.log('일정 삭제에 실패했습니다.', error);
      });
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
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
              {events && events.length > 0 ? (
                events.map((event, i) => (
                  <CalendarBigDetailItem
                    key={`schedule${i}`}
                    studyId={studyId}
                    result={event}
                    type={type}
                    handleDelete={handleDelete}
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
