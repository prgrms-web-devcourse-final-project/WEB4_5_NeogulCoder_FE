import ApplicationListClient from '@/components/my/ApplicationListClient';

export default function ApplyStudyList() {
  const responseType = {
    applications: [
      {
        name: '자바 스터디',
        leaderNickname: '너굴',
        capacity: 4,
        currentCount: 3,
        startDate: '2025-07-15',
        imageUrl: '',
        introduction: '자바 스터디입니다.',
        category: 'IT',
        studyType: 'ONLINE',
        status: 'PENDING',
        read: true,
      },
      {
        name: '자바 스터디',
        leaderNickname: '너굴',
        capacity: 4,
        currentCount: 3,
        startDate: '2025-07-15',
        imageUrl: '',
        introduction: '자바 스터디입니다.',
        category: 'IT',
        studyType: 'ONLINE',
        status: 'PENDING',
        read: true,
      },
      {
        name: '자바 스터디',
        leaderNickname: '너굴',
        capacity: 4,
        currentCount: 3,
        startDate: '2025-07-15',
        imageUrl: '',
        introduction: '자바 스터디입니다.',
        category: 'IT',
        studyType: 'ONLINE',
        status: 'PENDING',
        read: true,
      },
    ],
    totalPage: 2,
    totalElementCount: 10,
  };

  const applicationList = responseType;

  return <ApplicationListClient applicationList={applicationList} />;
}
