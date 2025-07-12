'use client';
import BuddyEnergySection from '@/components/profile/pr/BuddyEnergySection';
import FeedbackSection from '@/components/profile/pr/FeedbackSection';
import InfoSection from '@/components/profile/pr/InfoSection';
import IntroSection from '@/components/profile/pr/IntroSection';
import MannerSection from '@/components/profile/pr/MannerSection';
import { useRouter } from 'next/navigation';

export default function Pr() {
  const router = useRouter();

  const handleEditPr = () => {
    router.push('/profile/pr/edit-pr');
  };
  return (
    <>
      <div className="tm1">PR</div>
      <div className="flex items-center justify-end" onClick={handleEditPr}>
        <button type="button" className="button-sm-type1 mt-[26px]">
          PR 작성 및 수정
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 mt-[14px]">
        <InfoSection />
        <BuddyEnergySection />
      </div>

      <div className="flex items-center justify-between gap-3 mt-[14px]">
        <MannerSection />
        <FeedbackSection />
      </div>

      <div className="flex items-center justify-between mt-[14px]">
        <IntroSection />
      </div>
    </>
  );
}
