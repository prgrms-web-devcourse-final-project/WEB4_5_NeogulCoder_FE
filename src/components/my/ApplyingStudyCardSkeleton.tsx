export default function ApplyingStudyCardSkeleton() {
  return (
    <>
      <div className='flex flex-col justify-center w-[274px] px-[30px] py-[30px] bg-white border-2 border-border1 rounded-[30px]'>
        <div className='h-[24px] animate-pulse rounded-[10px] bg-gray-100'></div>
        <div className='flex my-5 justify-between'>
          <div className='flex flex-col gap-2.5'>
            <div className='w-[120px] h-[20px]  animate-pulse rounded-[10px] bg-gray-100'></div>
            <div className='w-[120px] h-[20px]  animate-pulse rounded-[10px] bg-gray-100'></div>
            <div className='w-[120px] h-[20px]  animate-pulse rounded-[10px] bg-gray-100'></div>
          </div>
          <div className='w-[60px] h-[60px] animate-pulse rounded-full bg-gray-100'></div>
        </div>
        <div className='flex gap-3 justify-end mb-[10px]'>
          <span className='tag-type1 !bg-gray-100'></span>
          <span className='tag-type1 !bg-gray-100'></span>
        </div>
        <div className='rounded-[10px] h-[53px] bg-gray-100 mb-5'></div>
        <div className='flex justify-between'>
          <span className='tag-type1 !bg-gray-100 w-[102px]'></span>
          <span className='tag-type1 !bg-gray-100 w-[72px]'></span>
        </div>
      </div>
    </>
  );
}
