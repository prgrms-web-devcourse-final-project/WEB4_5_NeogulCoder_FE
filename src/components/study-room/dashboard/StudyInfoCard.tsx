import dynamic from 'next/dynamic';

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
  const Calendar1 = dynamic(
    () => import('lucide-react').then((m) => m.Calendar1),
    {
      ssr: false,
    }
  );
  const NotepadText = dynamic(
    () => import('lucide-react').then((m) => m.NotepadText),
    {
      ssr: false,
    }
  );
  const UserRound = dynamic(
    () => import('lucide-react').then((m) => m.UserRound),
    {
      ssr: false,
    }
  );
  return (
    <>
      <div className='border border-border1 rounded-[10px] p-6 text-gray5'>
        <p className='tm4 mb-4'>{title}</p>
        <div className='flex justify-between items-end'>
          {type === 'day' && <Calendar1 strokeWidth={1} />}
          {type === 'personnel' && <UserRound strokeWidth={1} />}
          {type === 'post' && <NotepadText strokeWidth={1} />}
          <p className='tm1 flex items-end leading-none text-text1 gap-1'>
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
