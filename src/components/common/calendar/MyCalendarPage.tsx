'use client';
import CalendarBigShell from '@/components/common/calendar/CalendarBigShell';
import { getStudies } from '@/lib/api/calendar.api';
import { userAuthStore } from '@/stores/userStore';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function MyCalendarPage() {
  const user = userAuthStore().user;
  const authId = Number(user?.id);

  const [studies, setStudies] = useState<StudiesType[]>([]);
  useEffect(() => {
    if (!authId) return;
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

    fetchStudies();
  }, [authId]);

  if (!user) return null;

  // 스터디 목록으로 가공한 넘겨줄 카테고리
  const categories = [
    //사용자가 select 할 수 있는 카테고리 목록
    { name: '내 일정', id: authId, isProgress: true },
    ...(studies?.map((study: StudiesType) => ({
      name: study.name,
      id: study.studyId,
      isProgress: dayjs().isBetween(
        dayjs(study.startDate),
        dayjs(study.endDate),
        'day',
        '[]'
      ),
    })) ?? []),
  ];

  return (
    <>
      <CalendarBigShell type='my' user={user} categories={categories} />
    </>
  );
}
