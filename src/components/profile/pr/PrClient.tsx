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

  return (
    <>
      {isLoading ? (
        <PrSkeleton />
      ) : pr ? (
        <>
          <div className='tb3'>PR</div>
          {isMyPage && (
            <div className='flex items-center justify-end'>
              <button
                type='button'
                className='button-sm-type1 mt-[26px] hover:bg-[#292929]'
                onClick={handleEditPr}
              >
                PR 작성 및 수정
              </button>
            </div>
          )}

          <div className='flex items-center justify-between gap-3 mt-[14px]'>
            <InfoSection pr={pr} />
            <BuddyEnergySection />
          </div>

          <div className='flex items-center justify-between gap-3 mt-[14px]'>
            <MannerSection pr={pr} />
            <FeedbackSection />
          </div>

          <div className='flex items-center justify-between mt-[14px]'>
            <IntroSection />
          </div>
        </>
      ) : null}
    </>
  );
}
