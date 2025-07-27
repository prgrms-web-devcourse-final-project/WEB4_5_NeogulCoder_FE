'use client';
import BuddyEnergySection from '@/components/profile/pr/BuddyEnergySection';
import FeedbackSection from '@/components/profile/pr/FeedbackSection';
import InfoSection from '@/components/profile/pr/InfoSection';
import IntroSection from '@/components/profile/pr/IntroSection';
import MannerSection from '@/components/profile/pr/MannerSection';
import PrSkeleton from '@/components/profile/pr/skeleton/PrSkeleton';
import { userPrStore } from '@/stores/prStore';
import { userAuthStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Pr() {
  const router = useRouter();
  const user = userAuthStore((state) => state.user);
  const fetchMyPr = userPrStore((state) => state.fetchMyPr);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (user?.id) {
        try {
          await fetchMyPr();
        } catch (error) {
          console.log('PR 정보 불러오기 실패: ', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetch();
  }, [fetchMyPr, user]);

  const handleEditPr = () => {
    router.push('/profile/pr/edit-pr');
  };

  return (
    <>
      {isLoading ? (
        <PrSkeleton />
      ) : (
        <>
          <div className='tb3'>PR</div>
          <div className='flex items-center justify-end'>
            <button
              type='button'
              className='button-sm-type1 mt-[26px] hover:bg-[#292929]'
              onClick={handleEditPr}
            >
              PR 작성 및 수정
            </button>
          </div>

          <div className='flex items-center justify-between gap-3 mt-[14px]'>
            <InfoSection />
            <BuddyEnergySection />
          </div>

          <div className='flex items-center justify-between gap-3 mt-[14px]'>
            <MannerSection />
            <FeedbackSection />
          </div>

          <div className='flex items-center justify-between mt-[14px]'>
            <IntroSection />
          </div>
        </>
      )}
    </>
  );
}
