export default function StudyPostItem({ type }: { type: string }) {
  return (
    <>
      <div className='flex justify-between items-center gap-3'>
        <div className='w-full flex gap-3'>
          <span
            className={`shrink-0 tag-type3 ${type === '공지' && 'red'} ${
              type === 'new' && 'bg-yellow!'
            }`}
          >
            {type}
          </span>
          <p className='w-full line-clamp-1 tm4'>
            공지글 제목입니다.공지글 제목입니다.공지글 제목입니다.공지글
            제목입니다.공지글 제목입니다.공지글 제목입니다.공지글 제목입니다.
          </p>
        </div>
        <p className='shrink-0 t5 text-gray5'>2025.07.02</p>
      </div>
    </>
  );
}
