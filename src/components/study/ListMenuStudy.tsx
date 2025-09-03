'use client';

import { ChevronDown, Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import CategoryStudyModal from './CategoryStudyModal';
import SortingTypeModal from './SortingTypeModal';

export default function ListMenuStudy({
  selectedCategory,
  setSelectedCategory,
  selectedSortingType,
  setSelectedSortingType,
  keyword,
  setKeyword,
  setPage,
}: {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedSortingType: string;
  setSelectedSortingType: (v: string) => void;
  keyword: string;
  setKeyword: (v: string) => void;
  setPage: (page: number) => void;
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortingTypeOpen, setIsSortingTypeOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setKeyword(value);
      setPage(0);
    }, 300);
  };

  const handleKeywordReset = () => {
    setKeyword('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleCloseCategoryModal = () => setIsCategoryOpen(false);
  const handleCloseSortingTypeModal = () => setIsSortingTypeOpen(false);

  return (
    <div className='flex max-[494px]:flex-wrap justify-between gap-4 lg:mt-8'>
      <div className='flex gap-3 min-[477px]:gap-4 relative'>
        <div className='relative'>
          <button
            type='button'
            className={`w-[105px] min-[577px]:w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
              selectedCategory !== '카테고리'
                ? 'border-main text-text1 tm4'
                : 'border-main/10 text-text1/50 tm4'
            }`}
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            <p className='mr-1'>{selectedCategory}</p>
            <ChevronDown className='w-4 h-4' />
          </button>

          {isCategoryOpen && (
            <div className='absolute top-10 left-0 z-30'>
              <CategoryStudyModal
                selectedCategory={selectedCategory}
                onSelect={(category: string) => {
                  setSelectedCategory(category);
                  setIsCategoryOpen(false);
                  setPage(0);
                }}
                onClose={handleCloseCategoryModal}
              />
            </div>
          )}
        </div>

        <div className='relative'>
          <button
            className={`w-[105px] min-[577px]:w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
              selectedSortingType !== '최신순'
                ? 'border-main text-text1 tm4'
                : 'border-main/10 text-text1/50 tm4'
            }`}
            onClick={() => setIsSortingTypeOpen((prev) => !prev)}
          >
            <p className='mr-1'>{selectedSortingType}</p>
            <ChevronDown className='w-4 h-4' />
          </button>

          {isSortingTypeOpen && (
            <div className='absolute top-10 left-0 z-30'>
              <SortingTypeModal
                selectedSortingType={selectedSortingType}
                onSelect={(sorting: string) => {
                  setSelectedSortingType(sorting);
                  setIsSortingTypeOpen(false);
                  setPage(0);
                }}
                onClose={handleCloseSortingTypeModal}
              />
            </div>
          )}
        </div>
      </div>

      <div className='max-[494px]:flex-1 min-w-[216px] w-[220px] min-[577px]:w-[245px] md:w-[260px] h-[34px] bg-gray4 rounded-[50px] flex justify-between items-center gap-2 min-[577px]:gap-4 px-4 tm4 text-text1/50'>
        <div className='w-full flex gap-2 items-center'>
          <Search className='w-[14px] h-[14px] min-[577px]:w-4 min-[577px]:h-4 shrink-0' />
          <input
            type='text'
            ref={inputRef}
            placeholder='검색어를 입력해주세요.'
            className='w-full min-w-[130px] focus:outline-none'
            onChange={handleKeywordInput}
          />
        </div>
        {keyword !== '' && (
          <X
            onClick={handleKeywordReset}
            className='w-[14px] h-[14px] min-[577px]:w-4 min-[577px]:h-4 shrink-0 cursor-pointer'
          />
        )}
      </div>
    </div>
  );
}
