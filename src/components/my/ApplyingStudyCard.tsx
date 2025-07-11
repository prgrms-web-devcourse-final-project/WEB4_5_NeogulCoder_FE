'use client';

import Image from 'next/image';
import studyDefault from '@/assets/images/study-default.svg';
import { Calendar, Crown, UsersRound } from 'lucide-react';

export default function ApplyingStudyCard(props: {
  studyName: string;
  studyLeader: string;
  currentMemberCount: number;
  totalMemberCount: number;
  startDate: string;
  studyImage?: string;
  studyIntro?: string;
  category: string;
  studyWay: string;
  isShown: boolean;
  status: string;
}) {
  const {
    studyName,
    studyLeader,
    currentMemberCount,
    totalMemberCount,
    startDate,
    studyImage,
    studyIntro,
    category,
    studyWay,
    isShown,
    status,
  } = props;

  return (
    <div className="flex flex-col justify-center w-[274px] px-[30px] py-[30px] bg-white border-2 border-border1 rounded-[30px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="tb3 text-text1 truncate">{studyName}</div>
      <div className="flex justify-between mt-7">
        <div className="flex flex-col gap-[10px]">
          <div className="flex gap-[10px]">
            <Crown className="w-5 h-5 text-[#FBE175]" />
            <span className="t3 text-text1">{studyLeader}</span>
          </div>
          <div className="flex gap-[10px]">
            <UsersRound className="w-5 h-5 text-[#FBE175]" />
            <span className="t3 text-text1">
              {currentMemberCount}/{totalMemberCount}
            </span>
          </div>
          <div className="flex gap-[10px]">
            <Calendar className="w-5 h-5 text-[#FBE175]" />
            <span className="t3 text-text1">{startDate}</span>
          </div>
        </div>
        <div className="flex justify-center w-15 h-15 bg-white border border-[#EBE9E9] rounded-[50%]">
          <Image
            src={studyImage ? studyImage : studyDefault}
            alt="스터디 대표 이미지"
            priority
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <div className="flex justify-center items-center px-[13px] py-[3px] rounded-[50px] bg-[#EFEFEF]">
          <span className="tb5 text-blue">{category}</span>
        </div>
        <div className="flex justify-center items-center px-[13px] py-[3px] rounded-[50px] bg-[#EFEFEF]">
          <span className="tb5 text-blue">{studyWay}</span>
        </div>
      </div>
      <div className="flex justify-center items-center px-3 py-4 rounded-[10px] bg-gray4 mt-[10px]">
        <span className="t4 text-text1 opacity-70 truncate">
          {studyIntro ? studyIntro : '함께 좋은 결과 만들어봅시다!'}
        </span>
      </div>
      <div className="flex justify-between mt-[18px]">
        <div className="flex justify-center items-center px-[11px] py-[3px] rounded-[50px] border border-main">
          <span className="t4 text-text1">
            {isShown ? '프로필 열람 완료' : '프로필 미열람'}
          </span>
        </div>
        {status === '미완료' && (
          <div className="flex justify-center items-center w-17 py-[3px] rounded-[50px] bg-red">
            <span className="tb5 text-white">미완료</span>
          </div>
        )}
        {status === '승인' && (
          <div className="flex justify-center items-center w-17 py-[3px] rounded-[50px] bg-blue">
            <span className="tb5 text-white">승인</span>
          </div>
        )}
        {status === '거절' && (
          <div className="flex justify-center items-center w-17 py-[3px] rounded-[50px] bg-gray3">
            <span className="tb5 text-white">거절</span>
          </div>
        )}
      </div>
    </div>
  );
}
