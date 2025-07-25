export default function CalendarBigDetailItemSkeleton() {
  return (
    <>
      <div className='border border-border1 rounded p-4'>
        <div className='h-6 w-96 bg-neutral-100 animate-pulse rounded mb-3'></div>
        <div className='flex justify-between mb-3'>
          <div className='h-[40px] w-1/2 bg-neutral-100 animate-pulse rounded'></div>
          <div className='h-[46px] w-[46px] bg-neutral-100 animate-pulse rounded-full'></div>
        </div>
        <div className='w-full h-8 bg-neutral-100 animate-pulse rounded'></div>
      </div>
    </>
  );
}
