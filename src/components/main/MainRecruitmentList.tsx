'use client';
import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import CategoryModal from './CategoryModal';
import MeetingTypeModal from './MeetingTypeModal';
import RecruitmentCard from '../my/RecruitmentCard';
import { getRecruitments } from '@/lib/api/main/main';
import { userAuthStore } from '@/stores/userStore';
import RecruitmentCardSkeleton from './RecruitmentCardSkeleton';
import Pagination from '../common/Pagination';

export type MainPostType = {
  subject: string;
  content: string;
  category: string;
  studyType: string;
  status: string;
  commentCount: number;
  createAt: string;
};

export default function MainRecruitmentList() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const isSelectedCategory = selectedCategory !== '카테고리';

  const [isMeetingTypeOpen, setMeetingTypeOpen] = useState(false);
  const [selectedMeetingType, setSelectedMeetingType] = useState('진행 방식');
  const isSelectedMeetingType = selectedMeetingType !== '진행 방식';

  const user = userAuthStore().user;
  const [posts, setPosts] = useState<MainPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // 스터디 fetch
  useEffect(() => {
    if (!user) return;
    const fetchRecruitments = async () => {
      setIsLoading(true);
      try {
        const { data } = await getRecruitments();
        setPosts(data.postInfos);
      } catch (error) {
        console.error('모집글 목록을 불러오는데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruitments();
  }, [user]);

  return (
    <>
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

      <div className='mt-[34px] flex flex-col gap-[30px] mb-9'>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <RecruitmentCardSkeleton key={`skeleton${i}`} />
            ))
          : posts.map((recruitment, index) => (
              <RecruitmentCard
                key={index}
                title={recruitment.subject}
                content={recruitment.content}
                createdAt={recruitment.createAt}
                commentCount={recruitment.commentCount}
                category={recruitment.category}
                studyWay={recruitment.studyType}
                status={recruitment.status}
                type={'my'}
              />
            ))}
      </div>

      <Pagination />
    </>
  );
}
