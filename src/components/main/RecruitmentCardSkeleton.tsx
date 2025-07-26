export default function RecruitmentCardSkeleton() {
  return (
    <>
      <div className='flex flex-col justify-center w-full px-[24px] py-[24px] border-2 border-gray-100 rounded-[10px]'>
        <div className='flex justify-between items-center mb-[18px]'>
          <div className='h-[24px] w-1/3 bg-gray-100 rounded-[10px] animate-pulse'></div>
          <div className='h-[20px] w-[100px] bg-gray-100 rounded-[10px] animate-pulse'></div>
        </div>
        <div className='h-[20px] w-1/2 bg-gray-100 rounded-[10px] animate-pulse mb-[18px]'></div>
        <div className='flex justify-between'>
          <div className='flex gap-2.5'>
            <span className='tag-type1 !bg-gray-100 animate-pulse'></span>
            <span className='tag-type1 !bg-gray-100 animate-pulse'></span>
          </div>
          <div className=' h-[20px] w-[50px] bg-gray-100 rounded-[10px] animate-pulse'></div>
        </div>
      </div>
    </>
  );
}
