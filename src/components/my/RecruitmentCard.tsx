'use client';

import { categoryFormatting } from '@/utils/categoryFormatting';
import { formatDate } from '@/utils/formatDate';
import { studyTypeFormatting } from '@/utils/studyTypeFormatting';
import { MessageSquareMore } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ToastViewer from '../common/ToastViewer';

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
      // className='flex flex-col justify-center w-full px-[24px] py-[24px] bg-white max-[1024px]:border-t max-[1024px]:last:border-y lg:border-2 border-border1 lg:rounded-[10px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'
      className='flex flex-col justify-center w-full px-[20px] lg:px-[24px] py-3.5 lg:py-[24px] bg-white border-b-1 lg:border-2 border-border1 rounded-0 lg:rounded-[10px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'
      onClick={() => {
        if (type === 'my')
          router.push(`/recruitment/detail/${recruitmentPostId}`);
        else router.push(`/study/${studyId}/study-community/detail/${id}`);
      }}
    >
      <div className='flex justify-between items-start lg:items-center'>
        <div className='lg:flex gap-3 items-center'>
          {type === 'my' && status === 'IN_PROGRESS' && (
            <div className='tag-type2 green  py-2 lg:py-3'>
              <span className='tb5'>모집 중</span>
            </div>
          )}
          {type === 'my' && status === 'COMPLETE' && (
            <div className='tag-type2 py-2 lg:py-3'>
              <span className='tb5 text-white'>모집 완료</span>
            </div>
          )}
          {type === 'study' && category === 'NOTICE' && (
            <div className='tag-type3 red  py-2 lg:py-3'>
              <span className='tb5'>공지</span>
            </div>
          )}
          {type === 'study' && category === 'FREE' && (
            <div className='tag-type3 py-2 lg:py-3'>
              <span className='tb5'>자유</span>
            </div>
          )}
          {/* w-[430px] */}
          <div className='tm3 text-text1 max-w-[440px] min-[892px]:max-w-[650px] min-[1024px]:max-w-[440px] min-[1234px]:max-w-[650px] truncate max-[1024px]:hidden'>
            {/* <div className='tm3 text-text1 truncate mt-2 lg:mt-0'> */}
            {type === 'study' ? title : subject}
          </div>
        </div>
        <div className='t4 text-text1 opacity-30'>
          {type === 'study'
            ? formatDate(createdDate!, 'YYYY.MM.DD')
            : formatDate(createAt!, 'YYYY.MM.DD')}
        </div>
      </div>
      <div className='tm3 text-text1 w-[280px] min-[484px]:w-[430px] min-[892px]:w-[650px] mt-2 truncate lg:hidden'>
        {type === 'study' ? title : subject}
      </div>
      {type === 'my' && (
        <>
          <div className='w-[280px] min-[484px]:w-[400px] min-[688px]:w-[520px] line-clamp-2 t4 text-text1 opacity-50 mt-3 lg:mt-[18px]'>
            {/* <div className='line-clamp-2 t4 text-text1 opacity-50 mt-3 lg:mt-[18px]'> */}
            {/* {content} */}
            {content && (
              <ToastViewer key={content} height='100%' initialValue={content} />
            )}
          </div>
          <div className='flex justify-between items-end'>
            <div className='flex gap-2 items-center mt-4 lg:mt-[18px]'>
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
              <MessageSquareMore className='w-4 h-4 lg:w-5 lg:h-5 text-text1 opacity-30' />
              <span className='t4 text-text1 opacity-30'>{commentCount}</span>
            </div>
          </div>
        </>
      )}
      {type === 'study' && (
        <div className='flex justify-between items-end'>
          <div className='w-[280px] min-[484px]:w-[400px] min-[688px]:w-[520px] line-clamp-3 lg:line-clamp-2 t4 text-text1 opacity-50 mt-[18px]'>
            {/* {content} */}
            {content && (
              <ToastViewer key={content} height='100%' initialValue={content} />
            )}
          </div>
          <div className='flex justify-center items-center gap-[5px]'>
            <MessageSquareMore className='w-4 h-4 lg:w-5 lg:h-5 text-text1 opacity-30' />
            <span className='t4 text-text1 opacity-30'>{commentCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
