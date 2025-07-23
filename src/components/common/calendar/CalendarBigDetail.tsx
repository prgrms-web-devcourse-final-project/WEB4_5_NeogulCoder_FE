'use client';

import { CalendarDays, X } from 'lucide-react';
import CalendarBigDetailItem from './CalendarBigDetailItem';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { dayFormatting } from '@/utils/day';
import { getStudyDayEvents, getUserDayEvents } from '@/lib/api/calendar.api';
import { useEffect, useState } from 'react';
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
  const authId = 12; // 로그인 기능 구현 되면 로그인사용자 ID
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
  // const [event, setEvents] = useState([]);
  // useEffect(() => {
  //   const fetchDateEvent = async () => {
  //     if (type === 'personal') {
  //       const { data } = await getUserDayEvents(authId, date);
  //       setEvents(data);
  //     } else {
  //       const { data } = await getStudyDayEvents(studyId, date);
  //       setEvents(data);
  //     }
  //   };
  //   fetchDateEvent();
  // }, [type, studyId, date]);

  // 더미데이터 (날짜별 api 생기면 삭제할 내용)
  const results = [
    {
      calendarId: 2001,
      writerId: 123,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '14일 일정',
      description: '기획 회의',
      startTime: '2025-07-14T02:01:35',
      endTime: '2025-07-14T02:01:35',
    },
    {
      calendarId: 2002,
      writerId: 12,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '24-25',
      description: '기획 회의',
      startTime: '2025-07-24T02:01:35',
      endTime: '2025-07-25T18:01:35',
    },
    {
      calendarId: 2003,
      writerId: 12,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '기능개발',
      description: '기획 회의',
      startTime: '2025-07-17T02:01:35',
      endTime: '2025-07-18T03:01:35',
    },
    {
      calendarId: 2004,
      writerId: 123,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '달력 기능 개발',
      description: '기획 회의',
      startTime: '2025-07-18T02:01:35',
      endTime: '2025-07-20T03:18:35',
    },
    {
      calendarId: 2004,
      writerId: 123,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '달력 기능 개발',
      description: '기획 회의',
      startTime: '2025-07-16T02:01:35',
      endTime: '2025-07-16T03:18:35',
    },
  ];

  // 더미데이터 날짜 filter (날짜별 api 생기면 대체할 내용)
  const filterResults = results.filter((result) => {
    const startDay = dayjs(result.startTime).format('YYYY-MM-DD');
    const endDay = dayjs(result.endTime).format('YYYY-MM-DD');
    return dayjs(date).isBetween(startDay, endDay, 'day', '[]');
  });

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
              {filterResults && filterResults.length > 0 ? (
                filterResults.map((result, i) => (
                  <CalendarBigDetailItem
                    key={`schedule${i}`}
                    studyId={studyId}
                    result={result}
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
