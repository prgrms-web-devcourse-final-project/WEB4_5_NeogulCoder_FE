'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import CategoryStudyModal from './CategoryStudyModal';
import SortingTypeModal from './SortingTypeModal';

export default function ListMenuStudy() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const isSelectedCategory = selectedCategory !== '카테고리';

  const [isSortingTypeOpen, setSortingTypeOpen] = useState(false);
  const [selectedSortingType, setSelectedSortingType] = useState('정렬');
  const isSelectedSortingType = selectedSortingType !== '정렬';

  return (
    <div className="flex justify-between mt-8">
      <div className="flex gap-4 relative">
        <div className="relative">
          <button
            type="button"
            className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
              isSelectedCategory
                ? 'border-main text-text1 tm4'
                : 'border-main/10 text-text1/50 tm4'
            }`}
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            <p className="mr-1">{selectedCategory}</p>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isCategoryOpen && (
            <div className="absolute top-10 left-0 z-10">
              <CategoryStudyModal
                onSelect={(category: string) => {
                  setSelectedCategory(category);
                  setIsCategoryOpen(false);
                }}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
              isSelectedSortingType
                ? 'border-main text-text1 tm4'
                : 'border-main/10 text-text1/50 tm4'
            }`}
            onClick={() => setSortingTypeOpen((prev) => !prev)}
          >
            <p className="mr-1">{selectedSortingType}</p>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isSortingTypeOpen && (
            <div className="absolute top-10 left-0 z-10">
              <SortingTypeModal
                onSelect={(sorting: string) => {
                  setSelectedSortingType(sorting);
                  setSortingTypeOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-[260px] h-[34px] bg-gray4 rounded-[50px] flex items-center gap-4 px-4 mr-4 tm4 text-text1/50">
        <Search className="w-4 h-4" />
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className="focus:outline-none"
        />
      </div>
    </div>
  );
}
