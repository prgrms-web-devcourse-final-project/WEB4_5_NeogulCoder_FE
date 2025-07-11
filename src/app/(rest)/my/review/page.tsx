'use client';

import ReviewTooltip from '@/components/my/ReviewTooltip';
import SubMenuItem from '@/components/my/SubMenuItem';
import { BadgeQuestionMark } from 'lucide-react';
import { useState } from 'react';

export default function Review() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="w-full px-6 relative">
      {isShown && (
        <div className="absolute top-13 right-6 z-10">
          <ReviewTooltip />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="tb1 text-[20px]">스터디원 피어리뷰</div>
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
      {/* flex justify-between */}
      <div className="flex flex-col gap-[50px] mt-[30px]">
        <div>
          <span className="tb2 text-text1">
            팀원 1님과의 스터디는 어떠셨나요?
          </span>
          <div className="flex justify-around mt-[26px]">
            <div className="flex justify-center items-center w-[150px] h-[70px] bg-white rounded-[10px] border border-border1 cursor-pointer">
              <span className="t2 text-text1">별로예요</span>
            </div>
            <div className="flex justify-center items-center w-[150px] h-[70px] bg-white rounded-[10px] border border-border1 cursor-pointer">
              <span className="t2 text-text1">좋아요</span>
            </div>
            <div className="flex justify-center items-center w-[150px] h-[70px] bg-white rounded-[10px] border border-border1 cursor-pointer">
              <span className="t2 text-text1">최고예요</span>
            </div>
          </div>
        </div>
        <div>
          <span className="tb2 text-text1">어떤 점이 최고였나요?</span>
          <div className="flex flex-col gap-6 mt-[26px]">
            <div className="flex gap-[22px] items-center">
              <input
                type="checkbox"
                // after:border after:border-border1
                className="w-6 h-6 border border-border1 rounded-sm cursor-pointer"
              />
              <label htmlFor="" className="t2">
                항상 먼저 도와주고 분위기를 이끌어주는 팀원이었어요.
              </label>
            </div>
            <div className="flex gap-[22px] items-center">
              <input
                type="checkbox"
                className="w-6 h-6 border border-border1 rounded-sm cursor-pointer"
              />
              <label htmlFor="" className="t2">
                책임감이 넘치고 맡은 일 이상으로 기여해줘서 감동이었어요.
              </label>
            </div>
            <div className="flex gap-[22px] items-center">
              <input
                type="checkbox"
                className="w-6 h-6 border border-border1 rounded-sm cursor-pointer"
              />
              <label htmlFor="" className="t2">
                꼼꼼하고 빠른 진행 덕분에 팀 전체가 수월하게 움직였어요.
              </label>
            </div>
            <div className="flex gap-[22px] items-center">
              <input
                type="checkbox"
                className="w-6 h-6 border border-border1 rounded-sm cursor-pointer"
              />
              <label htmlFor="" className="t2">
                커뮤니케이션도 최고, 실력도 최고! 이런 팀원은 흔치 않아요.
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="tb2 text-text1">자세한 피드백을 남겨주세요!</span>
          <textarea
            name=""
            id=""
            placeholder="말 한 마디로 한 사람을 성장시킬 수 있습니다."
            className="min-h-[137px] mt-[26px] px-[26px] py-[22px] t2 text-text1 border border-border1 rounded-[10px] outline-main resize-none placeholder:opacity-50"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-[30px]">
        <button className="w-[117px] h-[46px] bg-main rounded-[10px] t2 text-white">
          완료
        </button>
      </div>
    </div>
  );
}
