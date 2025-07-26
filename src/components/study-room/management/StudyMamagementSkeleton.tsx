export default function StudyMamagementSkeleton() {
  return (
    <>
      <div className='mb-16'>
        <div className='w-[120px] h-[30px] bg-gray-100 animate-pulse rounded-md mb-6'></div>
        <div className='w-[120px] h-[120px] bg-gray-100 animate-pulse rounded-full mb-10 mx-auto'></div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[120px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
      </div>

      <div className='mb-16'>
        <div className='w-[120px] h-[30px] bg-gray-100 animate-pulse rounded-md mb-10'></div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-2.5'>
          <div className='h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='h-[60px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
      </div>

      <div>
        <div className='w-[120px] h-[30px] bg-gray-100 animate-pulse rounded-md mb-10'></div>
        <div className='flex justify-between items-center mb-2.5'>
          <div className='w-[400px] h-[20px] bg-gray-100 animate-pulse rounded-md'></div>
          <div className='w-[120px] h-[45px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
      </div>
    </>
  );
}
