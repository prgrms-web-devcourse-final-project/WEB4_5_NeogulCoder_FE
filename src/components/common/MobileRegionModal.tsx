import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function MobileRegionModal({
  onSelect,
  selectedRegion,
  isOpenRegionModal,
  closeFn,
}: {
  onSelect: (region: string | null) => void;
  selectedRegion: string;
  isOpenRegionModal: boolean;
  closeFn: () => void;
}) {
  const regions = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '강원도',
    '제주도',
  ];
  const [select, setSelect] = useState(
    selectedRegion == '' ? '전체' : selectedRegion
  );
  return (
    <>
      <div
        className={`bg-black/50 fixed inset-0 top-0 bottom-0 left-0 right-0 z-31 transition-opacity duration-300 flex items-end justify-center overflow-hidden 
            ${
              isOpenRegionModal
                ? 'bg-black/50 opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
        onClick={closeFn}
      >
        <div
          className={`rounded-t-[24px] bg-white drop-shadow-md transform transition-transform duration-300 ease-out
          ${isOpenRegionModal ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='py-4' onClick={closeFn}>
            <div className='w-[50px] h-[3px] bg-border1 rounded-[3px] mx-auto mb-4'></div>
          </div>
          <div className='min-h-[200px] max-h-[60vh] overflow-y-auto'>
            <div className='px-[18px] flex flex-wrap gap-3'>
              {regions.map((region) => (
                <button
                  key={region}
                  className={`px-3.5 py-1 tm4 hover:bg-gray4 rounded-[20px] text-border2 border border-border2 ${
                    region === select && 'border-main text-main bg-gray4'
                  }`}
                  onClick={() => setSelect(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
          <div className='my-5 px-[18px] flex items-center'>
            <button
              className='flex w-[50%] justify-center items-center tm3 gap-2'
              onClick={() => setSelect(selectedRegion)}
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
