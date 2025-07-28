import StudyScheduleClient from '@/components/study/StudyScheduleClient';

// export default async function StudySchedule({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
export default function StudySchedule() {
  // const { id } = await params;

  // const initialTimeVoteStats = await fetchTimeVoteStats(Number(id));
  // const initialTimeVoteSubmissions = await fetchTimeVoteSubmissions(Number(id));

  return <StudyScheduleClient />;
}
