'use client';
import CalendarBigShell from '@/components/common/calendar/CalendarBigShell';
import { getStudyEvents } from '@/lib/api/calendar.api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Calendar() {
  const params = useParams();
  const studyId = Number(params.id);

  // userId -> writerId
  function FormattingResult(items: StudyScheduleType[] | UserScheduleType[]) {
    return items.map((item) => {
      if ('userId' in item) {
        const { userId, personalCalendarId, ...rest } = item;
        return {
          ...rest,
          writerId: userId,
          scheduleId: personalCalendarId,
        };
      } else {
        const { teamCalendarId, ...rest } = item;
        return { ...rest, scheduleId: teamCalendarId };
      }
    });
  }

  const [events, setEvents] = useState<UnionScheduleType[]>([]);
  useEffect(() => {
    const fetchStudyEvent = async () => {
      await getStudyEvents(studyId)
        .then((res) => {
          const { data: result } = res;
          setEvents(FormattingResult(result));
        })
        .catch((error) => {
          console.error('스터디 일정 가져오기 실패: ', error);
        });
    };
    fetchStudyEvent();
  }, [studyId]);

  const categories = [{ name: '스터디', id: studyId }]; // 스터디 캘린더에서는 해당 스터디만 보임

  return (
    <>
      <CalendarBigShell
        type='study'
        defaultEvents={events}
        categories={categories}
      />
    </>
  );
}
