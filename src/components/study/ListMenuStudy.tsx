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
  const [isSortingTypeOpen, setSortingTypeOpen] = useState(false);

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

  return (
    <div className='flex justify-between mt-8'>
      <div className='flex gap-4 relative'>
        <div className='relative'>
          <button
            type='button'
            className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
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
            <div className='absolute top-10 left-0 z-10'>
              <CategoryStudyModal
                onSelect={(category: string) => {
                  setSelectedCategory(category);
                  setIsCategoryOpen(false);
                  setPage(0);
                }}
              />
            </div>
          )}
        </div>

        <div className='relative'>
          <button
            className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
              selectedSortingType !== '최신순'
                ? 'border-main text-text1 tm4'
                : 'border-main/10 text-text1/50 tm4'
            }`}
            onClick={() => setSortingTypeOpen((prev) => !prev)}
          >
            <p className='mr-1'>{selectedSortingType}</p>
            <ChevronDown className='w-4 h-4' />
          </button>

          {isSortingTypeOpen && (
            <div className='absolute top-10 left-0 z-10'>
              <SortingTypeModal
                onSelect={(sorting: string) => {
                  setSelectedSortingType(sorting);
                  setSortingTypeOpen(false);
                  setPage(0);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className='w-[260px] h-[34px] bg-gray4 rounded-[50px] flex items-center gap-4 px-4 mr-4 tm4 text-text1/50'>
        <Search className='w-4 h-4 shrink-0' />
        <input
          type='text'
          ref={inputRef}
          placeholder='검색어를 입력해주세요.'
          className='focus:outline-none'
          onChange={handleKeywordInput}
        />
        {keyword !== '' && (
          <X
            onClick={handleKeywordReset}
            className='w-4 h-4 shrink-0 cursor-pointer'
          />
        )}
      </div>
    </div>
  );
}
