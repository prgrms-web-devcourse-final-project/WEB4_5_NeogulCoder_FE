export default function MannerModalSkeleton() {
  return (
    <>
      <div className='flex flex-col gap-[30px]'>
        <div className='w-[640px] h-[174px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[640px] h-[174px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
        <div className='w-[640px] h-[174px] bg-neutral-100 animate-pulse rounded-[6px] items-center' />
      </div>
    </>
  );
}
