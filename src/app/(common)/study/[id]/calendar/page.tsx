'use client';
import CalendarBigShell from '@/components/common/calendar/CalendarBigShell';

import { userAuthStore } from '@/stores/userStore';
import { useParams } from 'next/navigation';

export default function Calendar() {
  const params = useParams();
  const studyId = Number(params.id);
  const user = userAuthStore().user;

  if (!user) return;

  const categories = [{ name: '스터디', id: studyId }]; // 스터디 캘린더에서는 해당 스터디만 보임

  return (
    <>
      <CalendarBigShell type='study' user={user} categories={categories} />
    </>
  );
}
