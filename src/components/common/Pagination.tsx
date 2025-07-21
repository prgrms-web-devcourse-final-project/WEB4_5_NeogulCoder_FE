import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
  return (
    <>
      <div className='flex gap-5 justify-center items-center'>
        <ChevronLeft className='w-6 h-6 cursor-pointer' />
        <div className='flex items-center gap-3 tl2 text-text1'>
          <button className='flex justify-center items-center bg-main text-white w-6 h-6 rounded-[50%]'>
            1
          </button>
          <button className='flex justify-center items-center bg-none text-text1 w-6 h-6 rounded-[50%]'>
            2
          </button>
          <button className='flex justify-center items-center bg-none text-text1 w-6 h-6 rounded-[50%]'>
            3
          </button>
          <button className='flex justify-center items-center bg-none text-text1 w-6 h-6 rounded-[50%]'>
            4
          </button>
          <button className='flex justify-center items-center bg-none text-text1 w-6 h-6 rounded-[50%]'>
            5
          </button>
        </div>
        <ChevronRight className='w-6 h-6 cursor-pointer' />
      </div>
    </>
  );
}
