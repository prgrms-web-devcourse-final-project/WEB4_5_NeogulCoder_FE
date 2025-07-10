import { CalendarDays } from 'lucide-react';

export default function ChatDate({ date }: { date: string }) {
  return (
    <>
      <div className='relative z-1 flex justify-center my-10'>
        <span className='block w-full h-[1px] bg-gray5 absolute left-0 top-1/2 -z-1'></span>
        <div className='rounded-2xl bg-white border-border2 border inline-flex items-center gap-2 px-3 py-1'>
          <CalendarDays className='w-4 h-4 text-gray5' strokeWidth={1} />
          <span className='t6 h-3 text-gray5'>{date}</span>
        </div>
      </div>
    </>
  );
}
