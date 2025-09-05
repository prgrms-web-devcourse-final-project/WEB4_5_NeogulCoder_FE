export default function MannerSkeleton() {
  return (
    <div className='w-full lg:max-w-[908px]'>
      <div className='h-6 w-40 bg-gray-200 rounded mb-4 max-[1024px]:hidden animate-pulse' />

      <div className='lg:max-w-[908px] max-[1024px]:mt-4'>
        <div className='flex items-center gap-10 mt-6'>
          <div className='w-1/3 h-15 bg-gray-200 rounded-md animate-pulse' />
        </div>
      </div>

      <div className='lg:max-w-[908px] mt-6'>
        <div className='flex items-center gap-6'>
          <div className='w-2/3 h-12 bg-gray-200 rounded-md animate-pulse' />
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
                  className='w-[150px] h-[145px] bg-gray-200 rounded-[10px]'
                />
              ))}
            </div>
          </div>

          <div>
            <div className='h-6 w-64 bg-gray-200 rounded mb-[26px]' />
            <div className='flex flex-col gap-6'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`checkbox-${i}`}
                  className='h-10 w-80 bg-gray-200 rounded'
                />
              ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='h-6 w-72 bg-gray-200 rounded mb-[26px]' />
            <div className='min-h-[137px] w-full bg-gray-200 rounded-[10px]' />
          </div>
        </div>

        <div className='flex justify-end mt-[30px]'>
          <div className='w-[100px] max-[1024px]:w-full h-[40px] bg-gray-300 rounded' />
        </div>
      </div>
    </div>
  );
}
