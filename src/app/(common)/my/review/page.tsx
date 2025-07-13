'use client';

import ReviewSection from '@/components/my/ReviewSection';
import ReviewTooltip from '@/components/my/ReviewTooltip';
import SubMenuItem from '@/components/my/SubMenuItem';
import { BadgeQuestionMark } from 'lucide-react';
import { useState } from 'react';

export default function Review() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="w-full relative">
      {isShown && (
        <div className="absolute top-9 right-1 z-10">
          <ReviewTooltip />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="tb2">스터디원 피어리뷰</div>
        <BadgeQuestionMark
          className="w-6 h-6 text-main opacity-70 hover:opacity-100"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        />
      </div>
      <div className="mt-6">
        <SubMenuItem isActive={true}>팀원 1</SubMenuItem>
        <SubMenuItem isActive={false}>팀원 2</SubMenuItem>
        <SubMenuItem isActive={false}>팀원 3</SubMenuItem>
        <SubMenuItem isActive={false}>팀원 4</SubMenuItem>
        <SubMenuItem isActive={false}>팀원 5</SubMenuItem>
      </div>
      <ReviewSection />
    </div>
  );
}
