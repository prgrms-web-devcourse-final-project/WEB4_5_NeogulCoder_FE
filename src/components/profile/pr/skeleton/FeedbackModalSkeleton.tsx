export default function FeedbackModalSkeleton() {
  return (
    <>
      <div className='flex flex-col gap-[10px]'>
        <div className='w-[470px] h-[110px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[470px] h-[110px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[470px] h-[110px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[470px] h-[110px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
      </div>
    </>
  );
}
