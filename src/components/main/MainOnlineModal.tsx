import { studyTypeFormatting } from '@/utils/studyTypeFormatting';

export default function OnlineModal({
  onSelect,
  customCss,
}: {
  onSelect: (online: string) => void;
  customCss?: string;
}) {
  const online = ['전체', 'ONLINE', 'OFFLINE', 'HYBRID'];
  return (
    <div
      className={`w-[160px] border border-main/10 bg-white rounded-[10px] shadow-sm overflow-hidden tm4 p-3 ${
        customCss ? customCss : ''
      }`}
    >
      <div className='grid grid-cols-1 gap-2 items-center justify-center'>
        {online.map((online) => (
          <button
            type='button'
            key={online}
            className='px-4 py-2 text-tm3 text-left hover:bg-gray4 rounded-[10px]'
            onClick={() => onSelect(online)}
          >
            {studyTypeFormatting(online)}
          </button>
        ))}
      </div>
    </div>
  );
}
