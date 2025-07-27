export default function CommunityCardSkeleton() {
  return (
    <>
      <div className='flex flex-col justify-center w-full px-[24px] py-[24px] border-2 border-gray-100 rounded-[10px]'>
        <div className='flex justify-between items-center mb-[18px]'>
          <div className='h-[24px] w-1/3 bg-gray-100 rounded-[10px] animate-pulse'></div>
          <div className='h-[20px] w-[100px] bg-gray-100 rounded-[10px] animate-pulse'></div>
        </div>

        <div className='flex justify-between'>
          <div className='h-[20px] w-1/2 bg-gray-100 rounded-[10px] animate-pulse'></div>
          <div className=' h-[20px] w-[50px] bg-gray-100 rounded-[10px] animate-pulse'></div>
        </div>
      </div>
    </>
  );
}
