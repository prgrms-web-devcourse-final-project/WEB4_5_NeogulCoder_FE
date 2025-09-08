import TimeGridSkeleton from './TimeGridSkeleton';

export default function ScheduleSkeleton() {
  return (
    <div className='w-full relative'>
      <div className='flex justify-between items-center max-[1024px]:hidden'>
        <div className='w-40 h-8 bg-gray-200 rounded-md animate-pulse' />
        <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse' />
      </div>

      <div className='flex max-[538px]:flex-wrap justify-between items-center gap-4 mt-6'>
        <div className='w-80 h-6 bg-gray-200 rounded-md animate-pulse' />
        <div className='flex max-[538px]:flex-1 items-center gap-3'>
          <div className='max-[538px]:w-full max-[538px]:min-w-[90px] w-[90px] h-[30px] max-[538px]:h-9 bg-gray-200 lg:rounded-[10px] rounded-md animate-pulse' />
          <div className='max-[538px]:w-full max-[538px]:min-w-[90px] w-[90px] h-[30px] max-[538px]:h-9 bg-gray-200 lg:rounded-[10px] rounded-md animate-pulse' />
        </div>
      </div>

      <div className='mt-15 space-y-2'>
        <TimeGridSkeleton />
      </div>
    </div>
  );
}
