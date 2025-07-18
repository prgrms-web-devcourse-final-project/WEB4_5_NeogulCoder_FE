'use client';
import Image from 'next/image';
import banner1 from '@/assets/images/banner1.svg';
import { ChevronDown } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import CategoryModal from '@/components/main/CategoryModal';
import MeetingTypeModal from '@/components/main/MeetingTypeModal';
import StudyCard from '@/components/my/StudyCard';
import RecruitmentCard from '@/components/my/RecruitmentCard';

export default function Main() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const isSelectedCategory = selectedCategory !== '카테고리';

  const [isMeetingTypeOpen, setMeetingTypeOpen] = useState(false);
  const [selectedMeetingType, setSelectedMeetingType] = useState('진행 방식');
  const isSelectedMeetingType = selectedMeetingType !== '진행 방식';

  const studyList = Array.from({ length: 4 }, () => ({
    studyName: '주말이 이렇게 방가울수가',
    studyLeader: '서영이',
    currentMemberCount: 3,
    totalMemberCount: 5,
    startDate: '2025-09-21',
    category: 'IT',
    studyWay: '온라인',
  }));

  const recruitmentList = Array.from({ length: 10 }, () => ({
    title: '낭만',
    content:
      '사랑이라 믿었던 것들은 어린 날의 추억일 뿐 추억이라 믿었던 것들은 오래 썩는 기억일 뿐 기억이라 믿었던 것들은 지금 너와 나의 기쁨 깊은 곳에서 숨 쉬는 불행들의 연료일 뿐',
    createdAt: '2025-09-21',
    commentCount: 921,
    category: 'IT',
    studyWay: 'online',
    status: '모집 중',
    type: 'my',
  }));

  return (
    <>
      <div>
        <Image src={banner1} alt='banner' className='w-full rounded-[10px]' />

        <div className='mt-[105px]'>
          <div className='flex items-center justify-between mt-[6px]'>
            <p className='text-[22px] font-bold'>내 스터디</p>
            <div className='flex gap-2'>
              <button
                type='button'
                className='w-[30px] h-[30px] border border-border1 rounded-full flex justify-center items-center'
              >
                <ChevronLeft className='opacity-20 w-5 h-5' />
              </button>
              <button
                type='button'
                className='w-[30px] h-[30px] border border-border1 rounded-full flex justify-center items-center'
              >
                <ChevronRight className='opacity-20 w-5 h-5' />
              </button>
            </div>
          </div>
          <div className='mt-[30px] flex gap-[52px]'>
            {studyList.map((study, index) => (
              <StudyCard
                key={index}
                studyName={study.studyName}
                studyLeader={study.studyLeader}
                currentMemberCount={study.currentMemberCount}
                totalMemberCount={study.totalMemberCount}
                startDate={study.startDate}
                category={study.category}
                studyWay={study.studyWay}
              />
            ))}
          </div>
        </div>

        <div className='mt-[110px]'>
          <p className='text-[22px] font-bold'>모집 중인 스터디</p>

          <div className='flex justify-between'>
            <div className='flex gap-4 mt-[35px] relative'>
              <div className='relative'>
                <button
                  type='button'
                  className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
                    isSelectedCategory
                      ? 'border-main text-text1 tm3'
                      : 'border-main/10 text-text1/50'
                  }`}
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                >
                  <p className='mr-1'>{selectedCategory}</p>
                  <ChevronDown className='w-4 h-4' />
                </button>

                {isCategoryOpen && (
                  <div className='absolute top-10 left-0 z-10'>
                    <CategoryModal
                      onSelect={(category: string) => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className='relative'>
                <button
                  className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
                    isSelectedMeetingType
                      ? 'border-main text-text1 tm3'
                      : 'border-main/10 text-text1/50'
                  }`}
                  onClick={() => setMeetingTypeOpen((prev) => !prev)}
                >
                  <p className='mr-1'>{selectedMeetingType}</p>
                  <ChevronDown className='w-4 h-4' />
                </button>

                {isMeetingTypeOpen && (
                  <div className='absolute top-10 left-0 z-10'>
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

            <div className='w-[260px] h-[34px] bg-gray4 rounded-[50px] flex items-center gap-4 px-4 text-text1/50 mt-[35px]'>
              <Search className='w-4 h-4' />
              <input
                type='text'
                placeholder='검색어를 입력해주세요.'
                className='focus:outline-none'
              />
            </div>
          </div>

          <div className='mt-[34px] flex flex-col gap-[30px]'>
            {recruitmentList.map((recruitment, index) => (
              <RecruitmentCard
                key={index}
                title={recruitment.title}
                content={recruitment.content}
                createdAt={recruitment.createdAt}
                commentCount={recruitment.commentCount}
                category={recruitment.category}
                studyWay={recruitment.studyWay}
                status={recruitment.status}
                type={recruitment.type}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
