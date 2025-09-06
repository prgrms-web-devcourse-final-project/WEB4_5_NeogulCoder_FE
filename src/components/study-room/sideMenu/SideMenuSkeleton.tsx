export default function SideMenuSkeleton() {
  return (
    <>
      <div className='w-full h-[140px] bg-gray-100 animate-pulse rounded-md mb-3 hidden lg:block'></div>
      <div className='flex gap-[20px] pl-[18px] lg:pl-0 lg:block w-full overflow-hidden mt-2 lg:mt-0'>
        <div className='w-[32px] h-[32px] lg:w-full lg:h-[40px] bg-gray-100 animate-pulse rounded-md lg:mb-8 shrink-0'></div>
        <div className='w-full h-[30px] bg-gray-100 animate-pulse rounded-md mb-3'></div>
        <div className='w-full h-[30px] bg-gray-100 animate-pulse rounded-md mb-3'></div>
        <div className='w-full h-[30px] bg-gray-100 animate-pulse rounded-md mb-3'></div>
        <div className='w-full h-[30px] bg-gray-100 animate-pulse rounded-md mb-3'></div>
        <div className='w-full h-[30px] bg-gray-100 animate-pulse rounded-md mb-3'></div>
        <div className='w-full h-[30px] bg-gray-100 animate-pulse rounded-md mb-3'></div>
      </div>
    </>
  );
}
