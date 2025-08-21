import { Calendar1, NotepadText, UserRound } from 'lucide-react';

export default function StudyInfoCard({
  title,
  type,
  data,
  subData,
}: {
  title: string;
  type: string;
  data: string;
  subData?: string;
}) {
  return (
    <>
      <div className='flex flex-col justify-between w-full border border-border1 rounded-[10px] lg:p-6 p-3.5 text-gray5'>
        <p className='tm4 mb-4'>{title}</p>
        <div className='lg:flex justify-between items-end'>
          <div>
            {type === 'day' && (
              <Calendar1 className='w-[18px] h-[18px]' strokeWidth={1} />
            )}
            {type === 'personnel' && (
              <UserRound className='w-[18px] h-[18px]' strokeWidth={1} />
            )}
            {type === 'post' && (
              <NotepadText className='w-[18px] h-[18px]' strokeWidth={1} />
            )}
          </div>
          <p className='justify-end tm1 flex items-end leading-none text-text1 gap-1'>
            {data}
            {type === 'day' && <span className='tm4'>일</span>}
            {type === 'personnel' && (
              <span className='tm4'>/ {subData} 명</span>
            )}
            {type === 'post' && <span className='tm4'>개</span>}
          </p>
        </div>
      </div>
    </>
  );
}
