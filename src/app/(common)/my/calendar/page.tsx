'use client';
import CalendarBigShell from '@/components/common/calendar/CalendarBigShell';
import { getStudies, getUserEvents } from '@/lib/api/calendar.api';
import { userAuthStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';

export default function Calendar() {
  const user = userAuthStore().user;
  const authId = user?.id ? Number(user.id) : undefined;

  const [events, setEvents] = useState<StudyScheduleType[]>([]);
  const [studies, setStudies] = useState<StudiesType[]>([]);
  useEffect(() => {
    if (!authId) return;
    const fetchStudyEvent = async () => {
      await getUserEvents(authId)
        .then((res) => {
          const { data: result } = res;
          setEvents(result);
        })
        .catch((error) => {
          console.error('개인 일정 가져오기 실패: ', error);
        });
    };
    const fetchStudies = async () => {
      await getStudies()
        .then((res) => {
          const { studies: result } = res.data;

          setStudies(result);
        })
        .catch((error) => {
          console.error('스터디 목록 가져오기 실패: ', error);
        });
    };

    fetchStudyEvent();
    fetchStudies();
  }, [authId]);

  if (!authId) return null;

  // 스터디 목록으로 가공한 넘겨줄 카테고리
  const categories = [
    //사용자가 select 할 수 있는 카테고리 목록
    { name: '내 일정', id: authId },
    ...(studies?.map((study: StudiesType) => ({
      name: study.name,
      id: study.studyId,
    })) ?? []),
  ];

  // userId -> writerId , 개인일정이랑 스터디일정이랑 포맷이 약간만 달라서 포맷에 맞춰서 데이터 전달
  function FormattingResult(items: StudyScheduleType[] | UserScheduleType[]) {
    return items.map((item) => {
      if ('userId' in item) {
        const { userId, personalCalendarId, ...rest } = item;
        return { ...rest, writerId: userId, scheduleId: personalCalendarId };
      } else {
        const { teamCalendarId, ...rest } = item;
        return { ...rest, scheduleId: teamCalendarId };
      }
    });
  }

  return (
    <>
      <CalendarBigShell
        type='my'
        defaultEvents={FormattingResult(events)}
        categories={categories}
      />
    </>
  );
}
