import RecruitmentCardSkeleton from '../my/RecruitmentCardSkeleton';

export default function MyStudyInfoSkeleton() {
  return (
    <div className='w-full animate-pulse'>
      <div className='tb2 bg-gray-200 h-[28px] w-[180px] rounded'></div>

      <div className='tm2 bg-gray-200 h-[24px] w-[160px] mt-[30px] rounded'></div>

      <div className='mt-6 h-[40px] bg-gray-100 rounded'></div>

      <div className='flex flex-col gap-[30px] mt-[30px]'>
        {[...Array(3)].map((_, i) => (
          // <div key={i} className='h-[160px] bg-gray-100 rounded'></div>
          <RecruitmentCardSkeleton key={i} />
        ))}
      </div>

      <div className='mt-[45px] flex justify-center gap-2'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='w-[32px] h-[32px] bg-gray-200 rounded'></div>
        ))}
      </div>

      <div className='mt-13'>
        <div className='tm2 bg-gray-200 h-[24px] w-[160px] rounded'></div>
        <hr className='mt-4 text-border2' />
        <div className='flex justify-between items-center mt-6'>
          <div className='bg-gray-100 h-[24px] w-[240px] rounded'></div>
          <div className='button-type2 bg-gray-200 h-[40px] w-[140px] rounded'></div>
        </div>
      </div>

      <div className='mt-13'>
        <div className='tm2 bg-gray-200 h-[24px] w-[160px] rounded'></div>
        <hr className='mt-4 text-border2' />
        <div className='flex justify-between items-center mt-6'>
          <div className='bg-gray-100 h-[24px] w-[240px] rounded'></div>
          <div className='button-type2 bg-gray-200 h-[40px] w-[140px] rounded'></div>
        </div>
      </div>
    </div>
  );
}
