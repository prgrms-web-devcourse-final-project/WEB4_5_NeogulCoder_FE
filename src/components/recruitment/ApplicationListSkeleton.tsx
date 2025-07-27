export default function ApplicationListSkeleton() {
  return (
    <div className='rounded-[10px] px-10 w-full animate-pulse'>
      <div className='flex space-x-6 items-center mb-10'>
        <div className='w-15 h-15 rounded-full bg-gray-300 mr-5' />
        <div className='flex flex-col space-y-2'>
          <div className='w-[120px] h-4 bg-gray-300 rounded' />
          <div className='flex space-x-4 items-center'>
            <div className='w-[40px] h-[40px] bg-gray-300 rounded-full' />
            <div className='w-[40px] h-4 bg-gray-300 rounded' />
            <div className='w-[60px] h-4 bg-gray-300 rounded ml-5' />
          </div>
        </div>
      </div>

      <div className='w-full h-[400px] bg-gray-200 rounded-[10px] mb-10' />
      <div className='flex space-x-[15px] justify-end mb-10'>
        <div className='w-[100px] h-11 bg-gray-300 rounded-md' />
        <div className='w-[100px] h-11 bg-gray-300 rounded-md' />
      </div>
    </div>
  );
}
