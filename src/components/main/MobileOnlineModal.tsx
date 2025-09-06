import { studyTypeFormatting } from '@/utils/studyTypeFormatting';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function MobileOnlineModal({
  onSelect,
  isStudyTypeOpen,
  selectedStudyType,
  closeFn,
}: {
  onSelect: (online: string) => void;
  isStudyTypeOpen: boolean;
  selectedStudyType: string;
  closeFn: () => void;
}) {
  const onlines = ['전체', 'ONLINE', 'OFFLINE', 'HYBRID'];
  const [select, setSelect] = useState(
    selectedStudyType == '' ? '전체' : selectedStudyType
  );
  return (
    <>
      <div
        className={`bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 transition-opacity duration-300 flex items-end justify-center overflow-hidden 
            ${
              isStudyTypeOpen
                ? 'bg-black/50 opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
        onClick={closeFn}
      >
        <div
          className={`w-full rounded-t-[24px] bg-white drop-shadow-md transform transition-transform duration-300 ease-out
          ${isStudyTypeOpen ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='py-4' onClick={closeFn}>
            <div className='w-[50px] h-[3px] bg-border1 rounded-[3px] mx-auto mb-4'></div>
          </div>
          <div className='min-h-[200px] max-h-[60vh] overflow-y-auto'>
            <div className='px-[18px] flex flex-wrap gap-3'>
              {onlines.map((online) => (
                <button
                  key={online}
                  className={`px-3.5 py-1 tm4 hover:bg-gray4 rounded-[20px] text-border2 border border-border2 ${
                    online === select && 'border-main text-main bg-gray4'
                  }`}
                  onClick={() => setSelect(online)}
                >
                  {studyTypeFormatting(online)}
                </button>
              ))}
            </div>
          </div>
          <div className='my-5 px-[18px] flex items-center'>
            <button
              className='flex w-[50%] justify-center items-center tm3 gap-2'
              onClick={() =>
                setSelect(selectedStudyType == '' ? '전체' : selectedStudyType)
              }
            >
              <RotateCcw className='w-4 h-4' /> 초기화
            </button>
            <button
              className='button-type3 w-full !h-10 lg:!h-12'
              onClick={() => onSelect(select)}
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
