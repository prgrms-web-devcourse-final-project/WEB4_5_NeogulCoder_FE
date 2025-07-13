import { ChevronRight } from 'lucide-react';
import CalendarSmallDetailItem from './CalendarSmallDetailItem';

export default function CalendarSmallDetail() {
  return (
    <>
      <div className='w-full grid grid-rows-[auto_1fr] h-full px-9 border-l border-border1'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='tb2'>9월</h3>
          <button className='flex items-center tm4'>
            전체보기
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>
        <div className='flex h-full overflow-auto flex-col gap-5'>
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
          <CalendarSmallDetailItem />
        </div>
        {/* 값이 없을 때 */}
        {/* <div className='flex h-full justify-center flex-col gap-5'>
          <div className='text-center'>
            <CalendarDays className='mx-auto mb-3 w-[50px] h-[50px] text-border2' strokeWidth={1} />
            <p className='tm4 text-border2'>해당 날짜에 등록된 일정이 없습니다.</p>
          </div>
        </div> */}
      </div>
    </>
  );
}
