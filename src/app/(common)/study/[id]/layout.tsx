'use client';
import StudyExtendCheckModal from '@/components/study-room/dashboard/StudyExtendCheckModal';
import SideMenu from '@/components/study-room/sideMenu/SideMenu';
import { getStudyExtendInfo, postStudyJoinExtend } from '@/lib/api/study.api';
import { userAuthStore } from '@/stores/userStore';
import { useParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const studyId = Number(params.id);
  const user = userAuthStore().user;

  const [studyExtendInfo, setStudyExtendInfo] = useState<StudyExtendType>();
  const [myExtendCheck, setMyExtendCheck] = useState<boolean | null>();

  useEffect(() => {
    if (!user || !studyId) return;
    // 스터디 자체의 스터디 연장 여부 묻기
    const fetchStudyExtendCheck = async () => {
      try {
        const { data } = await getStudyExtendInfo(studyId);
        setStudyExtendInfo(data);
        console.log(data);
      } catch (error) {
        console.error('스터디 연장정보를 불러오지 못했습니다', error);
      }
    };

    fetchStudyExtendCheck();
  }, [studyId, user]);

  // 로그인된 사용자의 연장 여부를 체크하는
  useEffect(() => {
    const me = studyExtendInfo?.members.find((f) => f.userId === user?.id);
    setMyExtendCheck(me?.participated);
  }, [studyExtendInfo, user]);

  const [isPending, startTransition] = useTransition();
  const handleExtendCheck = (check: boolean) => {
    startTransition(async () => {
      try {
        await postStudyJoinExtend(studyId, check);
        setMyExtendCheck(check);
      } catch (error) {
        console.error('연장 참여 실패', error);
      }
    });
  };

  return (
    <>
      <div className='flex'>
        <div className='w-[300px] mr-10 shrink-0'>
          <SideMenu studyId={studyId} />
        </div>
        <div className='w-full'>{children}</div>
        {/* 스터디가 연장 충이고, 그 사람이 아직 선택하지 않았으면 모달 띄워주기 */}
        {studyExtendInfo?.extended && myExtendCheck === null && (
          <StudyExtendCheckModal
            handleExtendCheck={handleExtendCheck}
            isPending={isPending}
          />
        )}
      </div>
    </>
  );
}
