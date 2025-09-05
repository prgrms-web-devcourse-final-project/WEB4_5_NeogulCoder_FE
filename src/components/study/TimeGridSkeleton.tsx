import React from 'react';

export default function TimeGridSkeleton() {
  return (
    <div className='select-none flex flex-col gap-[30px] animate-pulse'>
      {/* px-20 */}
      <div className='grid grid-cols-[6px_repeat(7,minmax(0,1fr))] place-items-center gap-x-4 gap-y-0 '>
        <div></div>
        {[...Array(7)].map((_, i) => (
          <div
            key={`day-${i}`}
            className='w-6 h-6 bg-gray-200 rounded-md mb-1'
          ></div>
        ))}

        <div></div>
        {[...Array(7)].map((_, i) => (
          <div
            key={`date-${i}`}
            className='w-16 h-6 max-[540px]:w-12 max-[420px]:w-10 bg-gray-100 rounded-md mb-1'
          ></div>
        ))}

        {/* 그냥 한 줄로 보이게 수정 ? */}
        {/* {[...Array(24)].map((_, hour) => (
          <React.Fragment key={`hour-${hour}`}>
            <div className='relative w-[18px] h-9'>
              <span className='absolute right-0 top-0 w-4 h-3 bg-gray-200 rounded-lg'></span>
            </div> */}
        <div></div>
        {[...Array(7)].map((_, col) => (
          <div
            // key={`cell-${hour}-${col}`}
            key={`cell-${col}`}
            className='w-20 h-216 max-[720px]:w-16 max-[540px]:w-12 max-[420px]:w-10 bg-gray-100 border-b border-border1 rounded-lg'
          ></div>
        ))}
        {/* </React.Fragment>
        ))} */}
      </div>

      {/* px-20 */}
      <div className='flex lg:justify-end gap-[10px] '>
        {[...Array(2)].map((_, i) => (
          <div
            key={`button-${i}`}
            className='lg:w-[235px] w-full h-[48px] bg-gray-300 rounded-lg'
          ></div>
        ))}
      </div>
    </div>
  );
}
