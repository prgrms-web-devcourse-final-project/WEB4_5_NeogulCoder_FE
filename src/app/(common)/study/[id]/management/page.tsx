'use client';
import StudyExtend from '@/components/study-room/management/StudyExtend';
import StudyMemberList from '@/components/study-room/management/StudyMemberList';
import StudyRoomInfo from '@/components/study-room/management/StudyRoomInfo';
import { getStudyInfoData } from '@/lib/api/study.api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Management() {
  const params = useParams();
  const studyId = Number(params.id);

  const [studyInfo, setStudyInfo] = useState<StudyInfoType>();

  const [membersInfo, setMembersInfo] = useState<StudyMemberType[]>([]);
  useEffect(() => {
    const fetchStudyInfo = async () => {
      try {
        const { data } = await getStudyInfoData(studyId);
        setStudyInfo(data);
        setMembersInfo(data.members);
      } catch (error) {
        console.error('스터디 정보를 불러오지 못했습니다', error);
      }
    };
    fetchStudyInfo();
  }, [studyId]);

  // 스터디 정보 수정
  const handleUpdate = (newData: StudyInfoUpdateType) => {
    setStudyInfo((prev) => prev && { ...prev, ...newData });
  };

  if (!studyInfo) return <div>스터디 정보를 불러오는 중입니다...</div>;

  return (
    <>
      <div className='mb-24'>
        <StudyRoomInfo
          studyInfoData={studyInfo}
          studyId={studyId}
          handleUpdate={handleUpdate}
        />
      </div>
      <div className='mb-24'>
        <StudyMemberList memberInfo={membersInfo} studyId={studyId} />
      </div>

      <div>
        <StudyExtend endDate={studyInfo.endDate} studyId={studyId} />
      </div>
    </>
  );
}
