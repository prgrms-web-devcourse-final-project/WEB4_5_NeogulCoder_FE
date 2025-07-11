'use client';

import { ChevronDown, Search } from 'lucide-react';

export default function ListMenu() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-[58px]">
        <div className="flex items-center">
          <select
            className={`t2 w-[86px] h-[38px] bg-white pl-[11px] py-1.5 rounded-[5px] cursor-pointer appearance-none outline-none`}
          >
            <option value="category">카테고리</option>
          </select>
          <ChevronDown className="cursor-pointer" />
        </div>
        <div className="flex items-center">
          <select
            className={`t2 w-[70px] h-[38px] bg-white pl-[11px] py-1.5 rounded-[5px] cursor-pointer appearance-none outline-none`}
          >
            <option value="recent">최신순</option>
            <option value="popular">인기순</option>
          </select>
          <ChevronDown className="cursor-pointer" />
        </div>
      </div>
      <div className="w-[250px] h-[38px] flex items-center gap-2 bg-gray4 rounded-[50px] px-3 py-2">
        <Search className="w-5 h-5 text-text1 opacity-70 cursor-pointer" />
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="t4 flex-grow text-text1 flex items-center outline-none placeholder:opacity-70"
        />
      </div>
    </div>
  );
}
