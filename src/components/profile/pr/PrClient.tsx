'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BuddyEnergySection from '@/components/profile/pr/BuddyEnergySection';
import FeedbackSection from '@/components/profile/pr/FeedbackSection';
import InfoSection from '@/components/profile/pr/InfoSection';
import IntroSection from '@/components/profile/pr/IntroSection';
import MannerSection from '@/components/profile/pr/MannerSection';
import PrSkeleton from '@/components/profile/pr/skeleton/PrSkeleton';
import { userPrStore } from '@/stores/prStore';
import { userAuthStore } from '@/stores/userStore';
import { PrData } from '@/types/pr';
import ProfileSideBar from '../ProfileSideBar';
import Link from 'next/link';

export default function Prclient() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId ? Number(params.userId) : null;

  const me = userAuthStore((state) => state.user);
  const fetchMyPr = userPrStore((state) => state.fetchMyPr);
  const fetchOtherPr = userPrStore((state) => state.fetchOtherPr);
  const [isLoading, setIsLoading] = useState(true);
  const [pr, setPr] = useState<PrData | null>(null);

  const isMyPage = params?.userId === 'me' || me?.id === userId;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = isMyPage
          ? await fetchMyPr()
          : userId
          ? await fetchOtherPr(userId)
          : null;
        if (result) setPr(result);
      } catch (error) {
        console.error('PR 정보 불러오기 실패: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [fetchMyPr, fetchOtherPr, userId, isMyPage]);

  const handleEditPr = () => {
    router.push('/profile/pr/edit-pr');
  };

  const handleEditProfile = () => {
    router.push('/profile/edit-profile');
  };

  return (
    <>
      {isLoading ? (
        <PrSkeleton />
      ) : pr ? (
        <>
          <div className='hidden tb3 lg:block'>PR</div>

          {isMyPage && (
            <>
              <div className='block w-full lg:hidden lg:max-w-none'>
                <ProfileSideBar />
              </div>
              <div className='flex items-center justify-center gap-2 lg:justify-end lg:gap-0'>
                <button
                  type='button'
                  className='button-sm-type1 mt-[26px] hover:bg-[#292929] w-1/2 lg:!hidden'
                  onClick={handleEditProfile}
                >
                  프로필 편집
                </button>
                <button
                  type='button'
                  className='button-sm-type1 mt-[26px] hover:bg-[#292929] w-1/2 lg:w-auto'
                  onClick={handleEditPr}
                >
                  PR 작성 및 수정
                </button>
              </div>
            </>
          )}

          <div className='flex items-center justify-between gap-3 mt-[14px] max-lg:flex-col'>
            <div className='w-1/2 max-lg:w-full'>
              <InfoSection pr={pr} />
            </div>

            <hr className='block lg:hidden border-t-6 border-gray-100 my-4 w-screen' />

            <div className='w-1/2 max-lg:w-full'>
              <BuddyEnergySection />
            </div>

            <hr className='block lg:hidden border-t-6 border-gray-100 my-4 w-screen' />
          </div>

          <div className='flex items-center justify-between gap-3 mt-[14px] max-lg:flex-col'>
            <div className='w-1/2 max-lg:w-full'>
              <MannerSection pr={pr} />
            </div>

            <hr className='block lg:hidden border-t-6 border-gray-100 my-4 w-screen' />

            <div className='w-1/2 max-lg:w-full'>
              <FeedbackSection />
            </div>

            <hr className='block lg:hidden border-t-6 border-gray-100 my-4 w-screen' />
          </div>

          <div className='flex flex-col items-center justify-between lg:mt-[14px]'>
            <IntroSection />
            <hr className='block lg:hidden border-t-6 border-gray-100 my-4 w-screen' />
          </div>

          <div className='t3 flex items-center justify-end mt-5 text-red lg:hidden'>
            <Link href='/profile/withdrawal'>회원탈퇴</Link>
          </div>
        </>
      ) : null}
    </>
  );
}
