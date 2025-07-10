'use client';

import { MessageSquareMore } from 'lucide-react';

export default function RecruitmentCard(props: {
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  category: string;
  studyWay: string;
  status: string;
}) {
  const {
    title,
    content,
    createdAt,
    commentCount,
    category,
    studyWay,
    status,
  } = props;

  return (
    // w-[820px]
    <div className="flex flex-col justify-center w-full px-[24px] py-[24px] bg-[--color-white] border-2 border-[var(--color-border1)] rounded-[10px] cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {status === '모집 중' && (
            <div className="flex justify-center items-center w-18 py-[3px] rounded-[50px] bg-[var(--color-green)]">
              <span className="tb5 text-[var(--color-white)]">모집 중</span>
            </div>
          )}
          {status === '모집 완료' && (
            <div className="flex justify-center items-center w-18 py-[3px] rounded-[50px] bg-[var(--color-gray1)]">
              <span className="tb5 text-[var(--color-white)]">모집 완료</span>
            </div>
          )}
          {status === '공지' && (
            <div className="flex justify-center items-center w-[47px] py-[3px] rounded-[20px] bg-[var(--color-red)]">
              <span className="tb5 text-[var(--color-white)]">공지</span>
            </div>
          )}
          {status === '자유' && (
            <div className="flex justify-center items-center w-[47px] py-[3px] rounded-[20px] bg-[var(--color-gray2)]">
              <span className="tb5 text-[var(--color-white)]">자유</span>
            </div>
          )}
          <div className="tb3 text-[var(--color-text1)]">{title}</div>
        </div>
        <div className="t2 text-[var(--color-text1)] opacity-30">
          {createdAt}
        </div>
      </div>
      <div className="w-[557px] line-clamp-2 t3 text-[var(--color-text1)] opacity-50 mt-[18px]">
        {content}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 mt-[18px]">
          <div className="flex justify-center items-center px-[13px] py-[3px] rounded-[50px] bg-[#EFEFEF]">
            <span className="tb5 text-[var(--color-blue)]">{category}</span>
          </div>
          <div className="flex justify-center items-center px-[13px] py-[3px] rounded-[50px] bg-[#EFEFEF]">
            <span className="tb5 text-[var(--color-blue)]">{studyWay}</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[5px]">
          <MessageSquareMore className="w-5 h-5 text-[var(--color-text1)] opacity-30" />
          <span className="t2 text-[var(--color-text1)] opacity-30">
            {commentCount}
          </span>
        </div>
      </div>
    </div>
  );
}
