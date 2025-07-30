import dateFormat from '@/utils/dateFormatting';
import Link from 'next/link';

export default function StudyPostItem({
  data,
  studyId,
}: {
  data: DashBoardPostType;
  studyId: number;
}) {
  return (
    <>
      <Link
        href={`/study/${studyId}/study-community/detail/${data.postId}`}
        className='flex justify-between items-center gap-3 group'
      >
        <div className='w-full flex gap-3'>
          <span
            className={`shrink-0 tag-type3 ${
              data.category === '공지' ? 'red' : 'bg-yellow!'
            }`}
          >
            {data.category === '공지' ? '공지' : 'new'}
          </span>
          <p className='w-full line-clamp-1 tm4 group-hover:font-bold'>
            {data.title}
          </p>
        </div>
        <p className='shrink-0 t5 text-gray5'>{dateFormat(data.createdAt)}</p>
      </Link>
    </>
  );
}
