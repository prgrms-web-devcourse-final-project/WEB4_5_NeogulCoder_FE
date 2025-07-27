export default function PrSkeleton() {
  return (
    <>
      <div className='h-8 w-16 bg-neutral-100 rounded-md animate-pulse' />

      <div className='flex items-center justify-end mt-[26px]'>
        <div className='h-9 w-[140px] bg-neutral-100 rounded-md animate-pulse' />
      </div>

      <div className='flex items-center justify-between gap-3 mt-[14px]'>
        <div className='w-1/2 h-[180px]  bg-neutral-100 rounded-md animate-pulse' />
        <div className='w-1/2 h-[180px]  bg-neutral-100 rounded-md animate-pulse' />
      </div>

      <div className='flex items-center justify-between gap-3 mt-[14px]'>
        <div className='w-1/2 h-[260px] bg-neutral-100 rounded-md animate-pulse' />
        <div className='w-1/2 h-[260px] bg-neutral-100 rounded-md animate-pulse' />
      </div>

      <div className='flex items-center justify-between mt-[14px]'>
        <div className='w-full h-[385px] bg-neutral-100 rounded-md animate-pulse' />
      </div>
    </>
  );
}
