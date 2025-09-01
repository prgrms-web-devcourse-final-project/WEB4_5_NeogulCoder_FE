export default function StudyCardSkeleton() {
  return (
    <>
      <div className='flex flex-col justify-center w-full min-[900px]:px-[30px] min-[900px]:py-[30px] px-6 py-6 bg-white border-2 border-border1 rounded-[30px]'>
        <div className='h-[24px] animate-pulse rounded-[10px] bg-gray-100'></div>
        <div className='flex min-[900px]:my-5 my-4 justify-between'>
          <div className='flex flex-col min-[900px]:gap-2.5 gap-2'>
            <div className='w-[100px] h-[20px] animate-pulse rounded-[10px] bg-gray-100'></div>
            <div className='w-[100px] h-[20px] animate-pulse rounded-[10px] bg-gray-100'></div>
            <div className='w-[100px] h-[20px] animate-pulse rounded-[10px] bg-gray-100'></div>
          </div>
          <div className='w-[60px] h-[60px] animate-pulse rounded-full bg-gray-100'></div>
        </div>
        <div className='rounded-[10px] h-[53px] bg-gray-100 min-[900px]:mb-5 mb-4'></div>
        <div className='flex gap-3'>
          <span className='tag-type1 !bg-gray-100'></span>
          <span className='tag-type1 !bg-gray-100'></span>
        </div>
      </div>
    </>
  );
}
