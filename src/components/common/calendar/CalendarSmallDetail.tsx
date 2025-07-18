import { CalendarDays, ChevronRight } from 'lucide-react';
import CalendarSmallDetailItem from './CalendarSmallDetailItem';
import dayjs from 'dayjs';
import { dayFormatting } from '@/utils/day';
import isBetween from 'dayjs/plugin/isBetween';
import Link from 'next/link';
dayjs.extend(isBetween);

export default function CalendarSmallDetail({
  date,
  studyId,
}: {
  date: string;
  studyId: string;
}) {
  const dateFormat = (date: string) => {
    const dateString = `${dayjs(date).get('M')}월 ${dayjs(date).get(
      'D'
    )}일 (${dayFormatting(date)})`;
    return dateString;
  };
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
      startTime: '2025-07-14T02:01:35.969Z',
      endTime: '2025-07-14T02:01:35.969Z',
    },
    {
      calendarId: 2002,
      writerId: 12,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '24-25',
      description: '기획 회의',
      startTime: '2025-07-24T02:01:35.969Z',
      endTime: '2025-07-25T18:01:35.969Z',
    },
    {
      calendarId: 2003,
      writerId: 12,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '기능개발',
      description: '기획 회의',
      startTime: '2025-07-17T02:01:35.969Z',
      endTime: '2025-07-18T03:01:35.969Z',
    },
    {
      calendarId: 2004,
      writerId: 123,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '달력 기능 개발',
      description: '기획 회의',
      startTime: '2025-07-18T02:01:35.969Z',
      endTime: '2025-07-20T03:18:35.969Z',
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
      <div className='w-full grid grid-rows-[auto_1fr] h-full px-9 border-l border-border1 py-3'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='tm2'>{dateFormat(date)}</h3>
          <Link
            href={`/study/${studyId}/calendar`}
            className='flex items-center t5'
          >
            전체보기
            <ChevronRight className='w-4 h-4' />
          </Link>
        </div>
        <div className='flex h-full overflow-auto flex-col gap-5'>
          {filterResults && filterResults.length > 0 ? (
            filterResults.map((result, i) => (
              <CalendarSmallDetailItem key={i} data={result} />
            ))
          ) : (
            <div className='flex h-full justify-center flex-col gap-5'>
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
    </>
  );
}
