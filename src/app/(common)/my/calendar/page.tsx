import CalendarBigShell from '@/components/common/calendar/CalendarBigShell';
import { getStudies, getUserEvents } from '@/lib/api/calendar.api';

export default async function Calendar() {
  const authId = 12;
  // api 개발이 덜 돼서 막아놓음
  // const { data: studies } = await getStudies(); // 가입된 스터디 목록
  // const { data: events } = await getUserEvents(authId); // 개인 일정 기본 fetch
  // 가입되어 있는 스터디 목록 더미데이터
  const studies = [
    {
      studyId: 1,
      name: '파이썬 스터디',
      leaderNickname: '바보',
      capacity: 8,
      currentCount: 1,
      startDate: '2025-09-01',
      imageUrl: 'https://example.com/python.jpg',
      introduction: '파이썬 기초부터 심화까지 학습합니다.',
      category: 'IT',
      studyType: 'OFFLINE',
      finished: false,
    },
  ];
  // 스터디 목록으로 가공한 넘겨줄 카테고리
  const categories = [
    //사용자가 select 할 수 있는 카테고리 목록
    { name: '내 일정', id: authId },
    ...(studies?.map((study: StudiesType) => ({
      name: study.name,
      id: study.studyId,
    })) ?? []),
  ];
  // 개인일정 더미 데이터
  const results = [
    {
      calendarId: 1001,
      userId: 1,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      title: '면접 준비',
      description: '코테 대비 공부',
      startTime: '2025-07-16T01:27:27.011Z',
      endTime: '2025-07-16T01:27:27.011Z',
    },
    {
      calendarId: 1001,
      userId: 1,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      title: '면접 준비',
      description: '코테 대비 공부',
      startTime: '2025-07-18T01:27:27.011Z',
      endTime: '2025-07-19T01:27:27.011Z',
    },
  ];

  // userId -> writerId , 개인일정이랑 스터디일정이랑 포맷이 약간만 달라서 스터디일정 포맷에 맞춰서 데이터 전달
  const updatedEvents = results.map(({ userId, ...rest }) => ({
    ...rest,
    writerId: userId,
  }));

  return (
    <>
      <CalendarBigShell
        type='my'
        defaultEvents={updatedEvents}
        categories={categories}
      />
    </>
  );
}
