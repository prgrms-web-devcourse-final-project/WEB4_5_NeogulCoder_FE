export default function MannerSkeleton() {
  return (
    <div className='w-full max-w-[908px]'>
      <div className='flex justify-between items-center mb-4'>
        <div className='h-6 w-40 bg-gray-200 rounded animate-pulse' />
        <div className='h-6 w-6 bg-gray-200 rounded-full animate-pulse' />
      </div>

      <div className='max-w-[908px] overflow-hidden'>
        <div className='overflow-x-auto scroll-custom'>
          <div className='flex items-center gap-10 mt-6'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`study-skeleton-${i}`}
                className='w-15 h-15 bg-gray-200 rounded-md animate-pulse'
              />
            ))}
          </div>
        </div>
      </div>

      <div className='max-w-[908px] overflow-hidden mt-6'>
        <div className='overflow-x-auto scroll-custom'>
          <div className='flex items-center gap-6'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`user-skeleton-${i}`}
                className='w-24 h-12 bg-gray-200 rounded-md animate-pulse'
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mt-10 space-y-4'>
        <div className='flex flex-col gap-[50px] mt-[30px] animate-pulse'>
          <div>
            <div className='h-6 w-72 bg-gray-200 rounded mb-[26px]' />
            <div className='flex justify-around'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`stamp-${i}`}
                  className='flex flex-col justify-center items-center gap-3 w-[150px] h-[145px] bg-gray-200 rounded-[10px]'
                >
                  <div className='w-12 h-12 bg-white rounded-full' />
                  <div className='h-4 w-16 bg-white rounded' />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className='h-6 w-64 bg-gray-200 rounded mb-[26px]' />
            <div className='flex flex-col gap-6'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`checkbox-${i}`} className='flex items-center gap-5'>
                  <div className='w-5 h-5 bg-gray-300 rounded-sm' />
                  <div className='h-5 w-60 bg-gray-200 rounded' />
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='h-6 w-72 bg-gray-200 rounded mb-[26px]' />
            <div className='min-h-[137px] w-full bg-gray-200 rounded-[10px]' />
          </div>
        </div>

        <div className='flex justify-end mt-[30px]'>
          <div className='w-[100px] h-[40px] bg-gray-300 rounded' />
        </div>
      </div>
    </div>
  );
}
