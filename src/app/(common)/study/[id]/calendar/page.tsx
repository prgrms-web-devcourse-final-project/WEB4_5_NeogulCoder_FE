'use client';
import CalendarBigShell from '@/components/common/calendar/CalendarBigShell';
import { getStudyEvents } from '@/lib/api/calendar.api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Calendar() {
  const params = useParams();
  const studyId = Number(params.id);

  const [events, setEvents] = useState<StudyScheduleType[]>([]);
  useEffect(() => {
    const fetchStudyEvent = async () => {
      await getStudyEvents(studyId)
        .then((res) => {
          const { data: result } = res.data;
          setEvents(result);
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
