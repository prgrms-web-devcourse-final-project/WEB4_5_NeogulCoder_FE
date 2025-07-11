'use client';

import ScheduleTooltip from '@/components/study/ScheduleTooltip';
import TimeGrid from '@/components/study/TimeGrid';
import { BadgeQuestionMark } from 'lucide-react';
import { useState } from 'react';

export default function StudySchedule() {
  const [isShown, setIsShown] = useState(false);

  return (
    // py-15
    <div className="w-full px-6 relative">
      {isShown && (
        <div className="absolute top-13 right-6 z-10">
          <ScheduleTooltip />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="tb1 text-[20px] text-text1">모임 일정 조율</div>
        <BadgeQuestionMark
          className="w-6 h-6 text-main opacity-70 hover:opacity-100"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        <span className="tm2">7월 4일 금요일 ~ 7월 10일 목요일</span>
        <div className="flex items-center gap-3 tm4 text-white">
          <button className="w-[90px] h-[30px] bg-main rounded-[10px]">
            제출 현황
          </button>
          <button className="w-[90px] h-[30px] bg-main rounded-[10px]">
            전체 지우기
          </button>
        </div>
      </div>
      <div className="mt-[60px]">
        <TimeGrid />
      </div>
    </div>
  );
}
