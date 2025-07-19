'use client';

import { useRouter } from 'next/navigation';
import SideMenuItem from './SideMenuItem';
import SideStudyInfo from './SideStudyInfo';
import { useEffect, useMemo, useState } from 'react';
import { getStudyInfoData } from '@/lib/api/study.api';
import { userAuthStore } from '@/stores/userStore';
import SideMenuSkeleton from './SideMenuSkeleton';

type rawMenuItemsType = {
  name: string;
  to: string;
  onlyLeader?: boolean;
};

export default function SideMenu({ studyId }: { studyId: number }) {
  const authId = userAuthStore().user?.id;
  const router = useRouter();

  const [studyInfo, setStudyInfo] = useState<StudyInfoType>();
  const [leader, setLeader] = useState(false);
  const [isLeaderChecked, setIsLeaderChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = useMemo(() => {
    const rawMenuItems: rawMenuItemsType[] = [
      { name: '스터디 대시보드', to: `/study/${studyId}/dashboard` },
      { name: '팀 캘린더', to: `/study/${studyId}/calendar` },
      { name: '모임 일정 조율', to: `/study/${studyId}/study-schedule` },
      { name: '스터디 커뮤니티', to: `/study/${studyId}/study-community` },
      { name: '팀 채팅', to: `/study/${studyId}/chat` },
      {
        name: '스터디 관리',
        to: `/study/${studyId}/management`,
        onlyLeader: true,
      },
    ];
    return rawMenuItems.filter((item) => !item.onlyLeader || leader);
  }, [leader, studyId]);

  useEffect(() => {
    if (!authId) return;
    setIsLoading(true);
    const fetchStudyInfo = async () => {
      try {
        const { data } = await getStudyInfoData(studyId);
        // 사용자가 팀장이면  스터디 관리 메뉴가 보여야 함
        const me = data.members.find(
          (member: StudyMemberType) => member.userId === authId
        );
        setLeader(me.role === 'LEADER');
        setStudyInfo(data);
      } catch (error) {
        console.error('스터디 정보를 불러오지 못했습니다', error);
      } finally {
        setIsLeaderChecked(true);
        setIsLoading(false);
      }
    };
    fetchStudyInfo();
  }, [studyId, authId]);

  // 추후에 실제 study/1 을 실제 study/id로 수정해주세요!
  return (
    <>
      <div>
        {isLoading ? (
          <SideMenuSkeleton />
        ) : (
          <>
            {studyInfo && <SideStudyInfo studyInfo={studyInfo} />}
            <button
              onClick={() => router.push('/study/1/my-study-info')}
              type='button'
              className='w-full tm4 h-[40px] bg-gray4 rounded-[10px]'
            >
              스터디의 My 정보
            </button>
            {isLeaderChecked && (
              <div className='flex flex-col gap-[30px] mt-[35px]'>
                {menuItems.map((item) => (
                  <SideMenuItem key={item.to} name={item.name} to={item.to} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
