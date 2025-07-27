'use client';

import StudyScheduleClient from '@/components/study/StudyScheduleClient';
import {
  checkMyRoleInStudy,
  fetchTimeVoteStats,
  fetchTimeVoteSubmissions,
} from '@/lib/api/schedule';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// export default async function StudySchedule({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
export default function StudySchedule() {
  // const { id } = await params;
  const { id } = useParams();

  // const initialTimeVoteStats = await fetchTimeVoteStats(Number(id));
  // const initialTimeVoteSubmissions = await fetchTimeVoteSubmissions(Number(id));

  const [initialTimeVoteStats, setInitialTimeVoteStats] = useState();
  const [initialTimeVoteSubmissions, setInitialTimeVoteSubmissions] =
    useState();
  const [isLeader, setIsLeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const statsData = await fetchTimeVoteStats(Number(id));
    setInitialTimeVoteStats(statsData);

    const submissionsData = await fetchTimeVoteSubmissions(Number(id));
    setInitialTimeVoteSubmissions(submissionsData);

    const roleData = await checkMyRoleInStudy(Number(id));
    setIsLeader(roleData.role === 'LEADER');

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  console.log('initialTimeVoteStats:', initialTimeVoteStats);
  console.log('initialTimeVoteSubmissions:', initialTimeVoteSubmissions);
  console.log('isLeader:', isLeader);

  if (isLoading) {
    return <></>;
  }

  return (
    <StudyScheduleClient
      initialTimeVoteStats={initialTimeVoteStats!}
      initialTimeVoteSubmissions={initialTimeVoteSubmissions!}
      isLeader={isLeader}
    />
  );
}
