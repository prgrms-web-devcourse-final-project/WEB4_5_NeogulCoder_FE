import StudyListClient from '@/components/my/StudyListClient';

export default function StudyList() {
  const responseType = {
    studies: [
      {
        studyId: 1,
        name: '자바 스터디',
        leaderNickname: 'test',
        capacity: 4,
        currentCount: 1,
        startDate: '2025-07-15',
        imageUrl: '',
        introduction: '자바 스터디입니다.',
        category: 'IT',
        studyType: 'ONLINE',
        finished: false,
      },
      {
        studyId: 2,
        name: '알고리즘 스터디',
        leaderNickname: 'test',
        capacity: 4,
        currentCount: 1,
        startDate: '2025-07-15',
        imageUrl: '',
        introduction: '알고리즘 스터디입니다.',
        category: 'IT',
        studyType: 'OFFLINE',
        finished: true,
      },
      {
        studyId: 3,
        name: '모각코',
        leaderNickname: 'test',
        capacity: 4,
        currentCount: 1,
        startDate: '2025-07-15',
        imageUrl: '',
        introduction: '모각코입니다.',
        category: 'IT',
        studyType: 'ONLINE',
        finished: false,
      },
    ],
    totalPage: 2,
    totalElementCount: 10,
  };

  const studyList = responseType;

  return <StudyListClient studyList={studyList} />;
}
