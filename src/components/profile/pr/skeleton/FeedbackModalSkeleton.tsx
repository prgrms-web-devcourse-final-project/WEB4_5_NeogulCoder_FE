export default function FeedbackModalSkeleton() {
  return (
    <>
      <div className='flex flex-col gap-[30px]'>
        <div className='w-[470px] h-[75px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[470px] h-[75px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[470px] h-[75px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[470px] h-[75px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[470px] h-[75px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
      </div>
    </>
  );
}
