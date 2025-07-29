'use client';

import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

export default function NoticeItem({
  studyId,
  postId,
  title,
  createdAt,
}: {
  studyId: number;
  postId: number;
  title: string;
  createdAt: string;
}) {
  const router = useRouter();
  return (
    <div
      className='flex justify-between items-center w-full cursor-pointer'
      onClick={() =>
        router.push(`/study/${studyId}/study-community/detail/${postId}`)
      }
    >
      <div className='flex gap-3 items-center'>
        <div className='tag-type3 red py-3'>
          <span className='tb5'>공지</span>
        </div>
        <div className='tm3 text-text1 max-w-[460px] truncate'>{title}</div>
      </div>
      <div className='t4 text-text1 opacity-30'>
        {formatDate(createdAt, 'YYYY.MM.DD')}
      </div>
    </div>
  );
}
