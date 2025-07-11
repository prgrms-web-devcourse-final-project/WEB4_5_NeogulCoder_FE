'use client';

import { MessageSquareMore } from 'lucide-react';

export default function RecruitmentCard(props: {
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  category?: string;
  studyWay?: string;
  status: string;
  type: string;
}) {
  const {
    title,
    content,
    createdAt,
    commentCount,
    category,
    studyWay,
    status,
    type,
  } = props;

  return (
    // w-[820px]
    <div className="flex flex-col justify-center w-full px-[24px] py-[24px] bg-white border-2 border-border1 rounded-[10px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {status === '모집 중' && (
            <div className="flex justify-center items-center w-18 py-[3px] rounded-[50px] bg-green">
              <span className="tb5 text-white">모집 중</span>
            </div>
          )}
          {status === '모집 완료' && (
            <div className="flex justify-center items-center w-18 py-[3px] rounded-[50px] bg-gray1">
              <span className="tb5 text-white">모집 완료</span>
            </div>
          )}
          {status === '공지' && (
            <div className="flex justify-center items-center w-[47px] py-[3px] rounded-[20px] bg-red">
              <span className="tb5 text-white">공지</span>
            </div>
          )}
          {status === '자유' && (
            <div className="flex justify-center items-center w-[47px] py-[3px] rounded-[20px] bg-gray2">
              <span className="tb5 text-white">자유</span>
            </div>
          )}
          <div className="tb3 text-text1 w-[460px] truncate">{title}</div>
        </div>
        <div className="t2 text-text1 opacity-30">{createdAt}</div>
      </div>
      {type === 'my' && (
        <>
          <div className="w-[557px] line-clamp-2 t3 text-text1 opacity-50 mt-[18px]">
            {content}
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2 mt-[18px]">
              <div className="flex justify-center items-center px-[13px] py-[3px] rounded-[50px] bg-[#EFEFEF]">
                <span className="tb5 text-blue">{category}</span>
              </div>
              <div className="flex justify-center items-center px-[13px] py-[3px] rounded-[50px] bg-[#EFEFEF]">
                <span className="tb5 text-blue">{studyWay}</span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-[5px]">
              <MessageSquareMore className="w-5 h-5 text-text1 opacity-30" />
              <span className="t2 text-text1 opacity-30">{commentCount}</span>
            </div>
          </div>
        </>
      )}
      {type === 'study' && (
        <div className="flex justify-between items-end">
          <div className="w-[557px] line-clamp-2 t3 text-text1 opacity-50 mt-[18px]">
            {content}
          </div>
          <div className="flex justify-center items-center gap-[5px]">
            <MessageSquareMore className="w-5 h-5 text-text1 opacity-30" />
            <span className="t2 text-text1 opacity-30">{commentCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
