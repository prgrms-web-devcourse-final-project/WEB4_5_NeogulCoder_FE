import dateFormatting from '@/utils/dateFormatting';

type DashBoardPostType = {
  id: number;
  title: string;
  category: string;
  content: string;
  createdDate: string;
  commentCount: number;
};
export default function StudyPostItem({ data }: { data: DashBoardPostType }) {
  return (
    <>
      <div className='flex justify-between items-center gap-3'>
        <div className='w-full flex gap-3'>
          <span
            className={`shrink-0 tag-type3 ${
              data.category === 'NOTICE' ? 'red' : 'bg-yellow!'
            }`}
          >
            {data.category === 'NOTICE' ? '공지' : 'new'}
          </span>
          <p className='w-full line-clamp-1 tm4'>{data.title}</p>
        </div>
        <p className='shrink-0 t5 text-gray5'>
          {dateFormatting(data.createdDate)}
        </p>
      </div>
    </>
  );
}
