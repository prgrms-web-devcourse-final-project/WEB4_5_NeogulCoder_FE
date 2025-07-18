import StudyExtend from '@/components/study-room/management/StudyExtend';
import StudyMemberList from '@/components/study-room/management/StudyMemberList';
import StudyRoomInfo from '@/components/study-room/management/StudyRoomInfo';
import { getStudyInfoData } from '@/lib/api/study.api';

export default async function Management({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const { data: studyInfoData } = await getStudyInfoData(Number(id));
  const studyInfoData: StudyInfoType = {
    imageUrl: 'http://localhost:8083/image.jpg',
    name: '자바 스터디',
    category: 'IT',
    capacity: 6,
    studyType: 'OFFLINE',
    location: '서울',
    startDate: '2025-07-15',
    endDate: '2025-07-28',
    introduction: '자바 스터디입니다.',
    members: [
      {
        userId: 1,
        nickname: '너굴',
        profileImageUrl: 'http://localhost:8083/image.jpg',
      },
      {
        userId: 2,
        nickname: '코더',
        profileImageUrl: 'http://localhost:8083/image.jpg',
      },
      {
        userId: 3,
        nickname: '바보',
        profileImageUrl: 'http://localhost:8083/image.jpg',
      },
    ],
  };
  const memberInfo: StudyMemberType[] = studyInfoData.members;
  return (
    <>
      <div className='mb-24'>
        <StudyRoomInfo studyInfoData={studyInfoData} />
      </div>
      <div className='mb-24'>
        <StudyMemberList memberInfo={memberInfo} />
      </div>
      <div>
        <StudyExtend />
      </div>
    </>
  );
}
