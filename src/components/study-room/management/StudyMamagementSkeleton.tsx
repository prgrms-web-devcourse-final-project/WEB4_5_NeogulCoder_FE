export default function StudyMamagementSkeleton() {
  return (
    <>
      <div className='mb-16'>
        <div className='w-[120px] h-[30px] bg-gray-100 animate-pulse rounded-md mb-6'></div>
        <div className='w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] bg-gray-100 animate-pulse rounded-full mb-10 mx-auto'></div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[69px] lg:h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[69px] lg:h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[69px] lg:h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[69px] lg:h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[69px] lg:h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[69px] lg:h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
      </div>

      <div className='mb-16'>
        <div className='w-[120px] h-[30px] bg-gray-100 animate-pulse rounded-md mb-10'></div>
        <div className='grid grid-cols-3 lg:grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[100px] lg:h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[100px] lg:h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className=' lg:hidden h-[100px] lg:h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
        <div className='hidden lg:grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[100px] lg:h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[100px] lg:h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
      </div>

      <div>
        <div className='w-[120px] h-[30px] bg-gray-100 animate-pulse rounded-md mb-10'></div>
        <div className='flex justify-between items-center mb-2.5'>
          <div className='w-[300px] lg:w-[400px] h-[20px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='w-[120px] h-[45px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
      </div>
    </>
  );
}
