export default function NoticeItemSkeleton() {
  return (
    <div className='flex justify-between items-center w-full animate-pulse'>
      <div className='flex gap-3 items-center'>
        <span className='tag-type1 !bg-gray-200 animate-pulse'></span>
        <div className='h-5 w-[100px] min-[405px]:w-[160px] min-[560px]:w-[260px] bg-gray-200 rounded' />
      </div>
      <div className='h-4 w-[50px] min-[405px]:w-[80px] bg-gray-200 rounded' />
    </div>
  );
}
