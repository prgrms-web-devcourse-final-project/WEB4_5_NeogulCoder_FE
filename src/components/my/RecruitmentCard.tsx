'use client';

import { formatDate } from '@/utils/formatDate';
import { MessageSquareMore } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RecruitmentCard({
  title,
  content,
  createdDate,
  commentCount,
  category,
  studyWay,
  status,
  type,
}: {
  title: string;
  content: string;
  createdDate: string;
  commentCount: number;
  category?: string;
  studyWay?: string;
  status?: string;
  type: string;
}) {
  const router = useRouter();

  return (
    <div
      className='flex flex-col justify-center w-full px-[24px] py-[24px] bg-white border-2 border-border1 rounded-[10px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'
      onClick={() => router.push('/recruitment/detail/1')}
    >
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          {type === 'my' && status === '모집 중' && (
            <div className='tag-type2 green py-3'>
              <span className='tb5'>모집 중</span>
            </div>
          )}
          {type === 'my' && status === '모집 완료' && (
            <div className='tag-type2 py-3'>
              <span className='tb5 text-white'>모집 완료</span>
            </div>
          )}
          {type === 'study' && category === 'NOTICE' && (
            <div className='tag-type3 red py-3'>
              <span className='tb5'>공지</span>
            </div>
          )}
          {type === 'study' && category === 'FREE' && (
            <div className='tag-type3 py-3'>
              <span className='tb5'>자유</span>
            </div>
          )}
          <div className='tm3 text-text1 w-[460px] truncate'>{title}</div>
        </div>
        <div className='t4 text-text1 opacity-30'>
          {formatDate(createdDate, 'YYYY.MM.DD')}
        </div>
      </div>
      {type === 'my' && (
        <>
          <div className='w-[557px] line-clamp-2 t4 text-text1 opacity-50 mt-[18px]'>
            {content}
          </div>
          <div className='flex justify-between items-end'>
            <div className='flex gap-2 items-center mt-[18px]'>
              <div className='tag-type1'>
                <span className='tb5'>{category}</span>
              </div>
              <div className='tag-type1'>
                <span className='tb5'>{studyWay}</span>
              </div>
            </div>
            <div className='flex justify-center items-center gap-[5px]'>
              <MessageSquareMore className='w-5 h-5 text-text1 opacity-30' />
              <span className='t4 text-text1 opacity-30'>{commentCount}</span>
            </div>
          </div>
        </>
      )}
      {type === 'study' && (
        <div className='flex justify-between items-end'>
          <div className='w-[557px] line-clamp-2 t4 text-text1 opacity-50 mt-[18px]'>
            {content}
          </div>
          <div className='flex justify-center items-center gap-[5px]'>
            <MessageSquareMore className='w-5 h-5 text-text1 opacity-30' />
            <span className='t4 text-text1 opacity-30'>{commentCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
