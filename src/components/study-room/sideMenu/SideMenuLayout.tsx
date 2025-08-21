'use client';

import SideMenu from '@/components/study-room/sideMenu/SideMenu';
import { getStudyHeaderData, getStudyMeData } from '@/lib/api/study.api';
import { useStudyStore } from '@/stores/studyInfoStore';
import { userAuthStore } from '@/stores/userStore';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function SideMenuLayout() {
  const router = useRouter();
  const params = useParams();
  const studyId = Number(params.id);
  // 사이트메뉴의 스터디 정보 관리를 위한 전역상태
  const setStudyInfo = useStudyStore().setStudyInfo;
  const setStudyLoading = useStudyStore().setLoading;
  const setLeader = useStudyStore().setLeader;
  const user = userAuthStore().user;

  useEffect(() => {
    if (!user) return;
    // 스터디 정보 가져오기
    const fetchStudyInfo = async () => {
      setStudyLoading(true);
      try {
        const { data: headerData } = await getStudyHeaderData(studyId);
        setStudyInfo(headerData);

        const { data: myData } = await getStudyMeData(studyId);
        console.log(myData.role);
        setLeader(myData.role === 'LEADER' ? true : false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          console.error('스터디 정보를 불러오지 못했습니다:', message);
          router.replace('/');
          toast.error('스터디 정보를 불러오지 못했습니다.');
        } else {
          console.error('알 수 없는 오류 발생:', error);
        }
      } finally {
        setStudyLoading(false);
      }
    };
    fetchStudyInfo();
  }, [studyId, user, router, setStudyInfo, setStudyLoading, setLeader]);
  return (
    <>
      <div className='lg:w-[300px] mr-10 shrink-0 lg:static fixed left-0 top-[48px] w-full z-90 bg-white border-b border-border1'>
        <SideMenu studyId={studyId} />
      </div>
    </>
  );
}
