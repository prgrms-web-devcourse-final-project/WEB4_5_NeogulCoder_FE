import TimeGridSkeleton from './TimeGridSkeleton';

export default function ScheduleSkeleton() {
  return (
    <div className='w-full relative'>
      <div className='flex justify-between items-center'>
        <div className='w-40 h-8 bg-gray-200 rounded-md animate-pulse' />
        <div className='w-6 h-6 bg-gray-200 rounded-full animate-pulse' />
      </div>

      <div className='flex justify-between items-center mt-6'>
        <div className='w-80 h-6 bg-gray-200 rounded-md animate-pulse' />
        <div className='flex items-center gap-3'>
          <div className='w-[90px] h-[30px] bg-gray-200 rounded-[10px] animate-pulse' />
          <div className='w-[90px] h-[30px] bg-gray-200 rounded-[10px] animate-pulse' />
        </div>
      </div>

      <div className='mt-[60px] space-y-2'>
        <TimeGridSkeleton />
      </div>
    </div>
  );
}
