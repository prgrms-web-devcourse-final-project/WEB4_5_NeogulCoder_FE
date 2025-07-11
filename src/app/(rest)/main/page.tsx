'use client';
import Image from 'next/image';
import banner from '@/assets/images/banner.svg';
import { ChevronDown } from 'lucide-react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import CategoryModal from '@/components/main/CategoryModal';
import MeetingTypeModal from '@/components/main/MeetingTypeModal';

export default function Main() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const isSelectedCategory = selectedCategory !== '카테고리';

  const [isMeetingTypeOpen, setMeetingTypeOpen] = useState(false);
  const [selectedMeetingType, setSelectedMeetingType] = useState('진행 방식');
  const isSelectedMeetingType = selectedMeetingType !== '진행 방식';

  return (
    <>
      <div>
        <Image src={banner} alt="banner" className="w-full rounded-[40px]" />

        <div className="mt-[110px]">
          <p className="tb1">내 스터디</p>
        </div>

        <div className="mt-[110px]">
          <p className="tb1">모집 중인 스터디</p>

          <div className="flex justify-between">
            <div className="flex gap-4 mt-[35px] relative">
              <div className="relative">
                <button
                  type="button"
                  className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
                    isSelectedCategory
                      ? 'border-main text-text1 tm3'
                      : 'border-main/10 text-text1/50'
                  }`}
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                >
                  <p className="mr-1">{selectedCategory}</p>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-10 left-0 z-10">
                    <CategoryModal
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
                    isSelectedMeetingType
                      ? 'border-main text-text1 tm3'
                      : 'border-main/10 text-text1/50'
                  }`}
                  onClick={() => setMeetingTypeOpen((prev) => !prev)}
                >
                  <p className="mr-1">{selectedMeetingType}</p>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isMeetingTypeOpen && (
                  <div className="absolute top-10 left-0 z-10">
                    <MeetingTypeModal
                      onSelect={(meeting: string) => {
                        setSelectedMeetingType(meeting);
                        setMeetingTypeOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="w-[260px] h-[34px] bg-gray4 rounded-[50px] flex items-center gap-4 px-4 text-text1/50 mt-[35px]">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                className="focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
