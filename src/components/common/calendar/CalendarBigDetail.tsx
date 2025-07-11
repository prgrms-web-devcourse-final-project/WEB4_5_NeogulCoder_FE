import { X } from 'lucide-react';
import CalendarBigDetailItem from './CalendarBigDetailItem';

export default function CalendarBigDetail({ closeHandler }: { closeHandler: () => void }) {
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='pt-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px]'>
          <div className='flex justify-between mb-8 px-9 '>
            {/* 모달헤더 */}
            <h3 className='tm1'>일정 상세</h3>
            <button onClick={closeHandler}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            {/* 내용 */}
            <p className='tm2 mb-6 px-9 '>7월 4일 금요일</p>
            <div className='overflow-auto max-h-[calc(90vh-160px)] flex flex-col gap-5 px-9 pb-7'>
              <CalendarBigDetailItem />
              <CalendarBigDetailItem />
              <CalendarBigDetailItem />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
