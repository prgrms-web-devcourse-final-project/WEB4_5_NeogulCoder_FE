import { CalendarDays } from 'lucide-react';

export default function ChatDate({ date }: { date: string }) {
  return (
    <div>
      <div className='hidden relative z-1 justify-center my-10 lg:flex '>
        <span className='block w-full h-[1px] bg-gray5/30 absolute left-0 top-1/2 -z-1'></span>
        <div className='rounded-2xl bg-white border-border2 border inline-flex items-center gap-2 px-3 py-1'>
          <CalendarDays className='w-4 h-4 text-gray5' strokeWidth={1} />
          <span className='t6  text-gray5'>{date}</span>
        </div>
      </div>

      <div className='flex flex-col gap-2 my-4 lg:hidden'>
        <span className='t2 text-black'>{date}</span>
        <hr className='w-full border-t border-gray-200' />
      </div>
    </div>
  );
}
