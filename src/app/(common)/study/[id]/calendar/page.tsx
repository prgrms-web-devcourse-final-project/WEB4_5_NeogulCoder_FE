import CalendarBigShell from '@/components/common/calendar/CalendarBigShell';
import { getStudyEvents } from '@/lib/api/calendar.api';

export default async function Calendar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // api 개발이 덜 돼서 막아놓음
  // const { data: events } = await getStudyEvents(id); // 해당 스터디 기본 일정 fetch
  const categories = [{ name: '스터디', id: Number(id) }]; // 스터디 캘린더에서는 해당 스터디만 보임

  // 더미데이터
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

  return (
    <>
      <CalendarBigShell
        type='study'
        defaultEvents={results}
        categories={categories}
      />
    </>
  );
}
