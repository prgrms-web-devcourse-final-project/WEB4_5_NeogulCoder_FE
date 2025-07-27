'use client';
import StudyDelete from '@/components/study-room/management/StudyDelete';
import StudyExtend from '@/components/study-room/management/StudyExtend';
import StudyMamagementSkeleton from '@/components/study-room/management/StudyMamagementSkeleton';
import StudyMemberList from '@/components/study-room/management/StudyMemberList';
import StudyRoomInfo from '@/components/study-room/management/StudyRoomInfo';
import { useStudyStore } from '@/stores/studyInfoStore';
import { useParams } from 'next/navigation';

export default function Management() {
  const params = useParams();
  const studyId = Number(params.id);
  const studyInfo = useStudyStore().study;
  const isLoading = useStudyStore().isLoading;

  return (
    <>
      {isLoading ? (
        <StudyMamagementSkeleton />
      ) : (
        studyInfo && (
          <>
            <div className='mb-24'>
              <StudyRoomInfo studyInfoData={studyInfo} studyId={studyId} />
            </div>
            <div className='mb-24'>
              <StudyMemberList
                memberInfo={studyInfo.members}
                studyId={studyId}
              />
            </div>

            <StudyExtend endDate={studyInfo.endDate} studyId={studyId} />

            {/* 스터디에 팀장만 있을경우 스터디 삭제 할 수 있게 */}
            {studyInfo.members.length <= 1 && <StudyDelete studyId={studyId} />}
          </>
        )
      )}
    </>
  );
}
