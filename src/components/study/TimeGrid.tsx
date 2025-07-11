'use client';

import React from 'react';

const day = ['금', '토', '일', '월', '화', '수', '목'];
const date = ['7.4', '7.5', '7.6', '7.7', '7.8', '7.9', '7.10'];

export default function TimeGrid() {
  return (
    <div className="select-none flex flex-col gap-[30px] ">
      <div className="grid grid-cols-[6px_repeat(7,minmax(0,1fr))] place-items-center gap-x-4 gap-y-0 px-20">
        <div></div>
        {day.map((d) => (
          <div
            key={d}
            className="text-center tm2 text-text1 opacity-50 bg-white"
          >
            {d}
          </div>
        ))}

        <div></div>
        {date.map((d) => (
          <div
            key={d}
            className="text-center tm2 text-text1 opacity-50 py-2 bg-white"
          >
            {d}
          </div>
        ))}

        {[...Array(24)].map((_, hour) => (
          <React.Fragment key={hour}>
            <div className="text-right pt-0 transform -translate-y-[8px] leading-none w-[18px] h-9 t4 text-text1 opacity-50 bg-white">
              {hour}
            </div>
            {date.map((_, day) => {
              const selected = false;

              return (
                <div
                  key={`${day}-${hour}`}
                  className={`w-20 h-9 border-b border-b-border2 ${
                    selected ? 'bg-blue' : 'bg-[#fafafa] hover:bg-[#f1f1f1]'
                  } ${hour === 0 && 'rounded-t-xl'} ${
                    hour === 23 && 'rounded-b-xl border-none'
                  } cursor-pointer`}
                ></div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-end px-20">
        <button className="w-[235px] h-[48px] bg-main rounded-[10px] tm2 text-white">
          시간 제출
        </button>
      </div>
    </div>
  );
}
