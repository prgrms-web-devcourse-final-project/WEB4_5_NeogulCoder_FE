import CommunityCardSkeleton from './CommunityCardSkeleton';

export default function MyStudyInfoSkeleton() {
  return (
    <div className='w-full animate-pulse'>
      <div className='tb2 bg-gray-200 h-[28px] w-[180px] rounded max-[1024px]:hidden'></div>

      <div className='tm2 bg-gray-200 h-[24px] w-[160px] mt-[30px] rounded'></div>

      <div className='mt-6 h-[40px] bg-gray-100 rounded'></div>

      <div className='flex flex-col lg:gap-[30px] mt-[30px] max-[1024px]:mx-[-18px]'>
        {[...Array(2)].map((_, i) => (
          <CommunityCardSkeleton key={i} />
        ))}
      </div>

      <div className='mt-[45px] flex justify-center items-center'>
        <div className='w-[192px] h-[32px] bg-gray-200 rounded'></div>
      </div>

      <div className='mx-[-18px]'>
        <div className='w-full h-1.5 bg-gray4 mt-[40px] lg:hidden'></div>
      </div>

      <div className='mt-[40px] lg:mt-13'>
        <div className='tm2 bg-gray-200 h-[24px] w-[160px] rounded'></div>
        <hr className='mt-4 text-border2' />
        <div className='flex justify-between items-center mt-6'>
          <div className='bg-gray-100 h-[24px] w-[240px] rounded'></div>
          <div className='button-type2 bg-gray-200! h-[40px] w-[140px] rounded'></div>
        </div>
      </div>

      <div className='mt-[40px] lg:mt-13'>
        <div className='tm2 bg-gray-200 h-[24px] w-[160px] rounded'></div>
        <hr className='mt-4 text-border2' />
        <div className='flex justify-between items-center mt-6'>
          <div className='bg-gray-100 h-[24px] w-[240px] rounded'></div>
          <div className='button-type2 bg-gray-200! h-[40px] w-[140px] rounded'></div>
        </div>
      </div>
    </div>
  );
}
