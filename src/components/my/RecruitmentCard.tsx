'use client';

import { categoryFormatting } from '@/utils/categoryFormatting';
import { formatDate } from '@/utils/formatDate';
import { studyTypeFormatting } from '@/utils/studyTypeFormatting';
// import { MessageSquareMore } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MessageSquareMore = dynamic(
  () => import('lucide-react').then((m) => m.MessageSquareMore),
  { ssr: false }
);

export default function RecruitmentCard({
  studyId,
  id,
  recruitmentPostId,
  title,
  subject,
  content,
  createdDate,
  createAt,
  commentCount,
  category,
  studyType,
  status,
  type,
}: {
  studyId?: number;
  id?: number;
  recruitmentPostId?: number;
  title?: string;
  subject?: string;
  content: string;
  createdDate?: string;
  createAt?: string;
  commentCount: number;
  category?: string;
  studyType?: string;
  status?: string;
  type: string;
}) {
  const router = useRouter();

  return (
    <div
      className='flex flex-col justify-center w-full px-[24px] py-[24px] bg-white border-2 border-border1 rounded-[10px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'
      onClick={() => {
        if (type === 'my')
          router.push(`/recruitment/detail/${recruitmentPostId}`);
        else router.push(`/study/${studyId}/study-community/detail/${id}`);
      }}
    >
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          {type === 'my' && status === 'IN_PROGRESS' && (
            <div className='tag-type2 green py-3'>
              <span className='tb5'>모집 중</span>
            </div>
          )}
          {type === 'my' && status === 'COMPLETE' && (
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
          <div className='tm3 text-text1 w-[460px] truncate'>
            {type === 'study' ? title : subject}
          </div>
        </div>
        <div className='t4 text-text1 opacity-30'>
          {type === 'study'
            ? formatDate(createdDate!, 'YYYY.MM.DD')
            : formatDate(createAt!, 'YYYY.MM.DD')}
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
                <span className='tb5'>
                  {categoryFormatting(category ?? '')}
                </span>
              </div>
              <div className='tag-type1'>
                <span className='tb5'>
                  {studyTypeFormatting(studyType ?? '')}
                </span>
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
