import { categoryFormatting } from '@/utils/categoryFormatting';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function MobileCategoryModal({
  onSelect,
  isCategoryOpen,
  selectedCategory,
  closeFn,
}: {
  onSelect: (category: string) => void;
  isCategoryOpen: boolean;
  selectedCategory: string;
  closeFn: () => void;
}) {
  const category = [
    '전체',
    'LANGUAGE',
    'IT',
    'EXAM',
    'FINANCE',
    'MANAGEMENT',
    'DESIGN',
    'ART',
    'PHOTO_VIDEO',
    'BEAUTY',
    'SPORTS',
    'HOBBY',
    'ETC',
  ];

  const [select, setSelect] = useState(
    selectedCategory == '' ? '전체' : selectedCategory
  );
  return (
    <>
      <div
        className={`bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 transition-opacity duration-300 flex items-end justify-center overflow-hidden 
            ${
              isCategoryOpen
                ? 'bg-black/50 opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
        onClick={closeFn}
      >
        <div
          className={`w-full rounded-t-[24px] bg-white drop-shadow-md transform transition-transform duration-300 ease-out
          ${isCategoryOpen ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='py-4' onClick={closeFn}>
            <div className='w-[50px] h-[3px] bg-border1 rounded-[3px] mx-auto mb-4'></div>
          </div>
          <div className='min-h-[200px] max-h-[60vh] overflow-y-auto'>
            <div className='px-[18px] flex flex-wrap gap-3'>
              {category.map((category) => (
                <button
                  key={category}
                  className={`px-3.5 py-1 tm4 hover:bg-gray4 rounded-[20px] text-border2 border border-border2 ${
                    category === select && 'border-main text-main bg-gray4'
                  }`}
                  onClick={() => setSelect(category)}
                >
                  {categoryFormatting(category)}
                </button>
              ))}
            </div>
          </div>
          <div className='my-5 px-[18px] flex items-center'>
            <button
              className='flex w-[50%] justify-center items-center tm3 gap-2'
              onClick={() =>
                setSelect(selectedCategory == '' ? '전체' : selectedCategory)
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
