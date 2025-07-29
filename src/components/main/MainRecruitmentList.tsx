'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RecruitmentCard from '../my/RecruitmentCard';
import { getRecruitments } from '@/lib/api/main/main';
import RecruitmentCardSkeleton from './RecruitmentCardSkeleton';
import MainPagination from './MainPagination';
import MainCategoriesModal from './MainCategoriesModal';
import MainOnlineModal from './MainOnlineModal';
import { categoryFormatting } from '@/utils/categoryFormatting';
import { studyTypeFormatting } from '@/utils/studyTypeFormatting';
import Link from 'next/link';
import { ChevronDown, Search, SearchX, X } from 'lucide-react';

export type MainPostType = {
  recruitmentPostId: number;
  subject: string;
  content: string;
  category: string;
  studyType: string;
  status: string;
  commentCount: number;
  createAt: string;
};

export default function MainRecruitmentList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  );
  const categoryParams = useMemo(
    () => searchParams.get('category') || '',
    [searchParams]
  );
  const studyTypeParams = useMemo(
    () => searchParams.get('studyType') || '',
    [searchParams]
  );
  const searchKeywordParams = useMemo(
    () => searchParams.get('keyword') || '',
    [searchParams]
  );

  const [page, setPage] = useState(pageParams || 1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParams || ''
  );
  const [selectedStudyType, setSelectedStudyType] = useState(
    studyTypeParams || ''
  );
  const [keyword, setKeyword] = useState(searchKeywordParams || '');
  const [posts, setPosts] = useState<MainPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStudyTypeOpen, setStudyTypeOpen] = useState(false);
  const isSelectedCategory = selectedCategory !== '';
  const isSelectedStudyType = selectedStudyType !== '';
  const categorySelectRef = useRef<HTMLDivElement>(null);
  const studyTypeSelectRef = useRef<HTMLDivElement>(null);

  // 카테고리 외부 클릭시 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categorySelectRef.current &&
        !categorySelectRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }

      if (
        studyTypeSelectRef.current &&
        !studyTypeSelectRef.current.contains(e.target as Node)
      ) {
        setStudyTypeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 모집글 fetch
  useEffect(() => {
    const fetchRecruitments = async () => {
      setIsLoading(true);
      try {
        const { data } = await getRecruitments(
          page - 1,
          categoryParams || '',
          studyTypeParams || '',
          searchKeywordParams || ''
        );
        setTotalPage(data.totalPage);
        setPosts(data.postInfos);
      } catch (error) {
        console.error('모집글 목록을 불러오는데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruitments();
  }, [page, categoryParams, studyTypeParams, searchKeywordParams]);

  // 페이지 변경
  const handlePage = (num: number) => {
    router.push(
      `/?page=${num}&category=${categoryParams}&studyType=${studyTypeParams}&keyword=${searchKeywordParams}`,
      { scroll: false }
    );
    setPage(num);
  };
  //카테고리 변경
  const handleCategory = (category: string) => {
    const newCategory = category === '전체' ? '' : category;
    setSelectedCategory(newCategory);
    setIsCategoryOpen(false);
    router.push(
      `/?page=1&category=${newCategory}&studyType=${studyTypeParams}&keyword=${searchKeywordParams}`,
      { scroll: false }
    );
  };
  //진행방식 변경
  const handleStudyType = (studyType: string) => {
    const newStudyType = studyType === '전체' ? '' : studyType;
    setSelectedStudyType(newStudyType);
    setStudyTypeOpen(false);
    router.push(
      `/?page=1&category=${categoryParams}&studyType=${newStudyType}&keyword=${searchKeywordParams}`,
      { scroll: false }
    );
  };
  // 키워드 검색
  const handleKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(
        `/?page=1&category=${categoryParams}&studyType=${selectedStudyType}&keyword=${keyword}`,
        { scroll: false }
      );
    }
  };
  // 키워드 리셋
  const handleKeywordReset = () => {
    setKeyword('');
    if (searchKeywordParams !== '') {
      router.push(
        `/?page=1&category=${categoryParams}&studyType=${selectedStudyType}&keyword=${''}`,
        { scroll: false }
      );
    }
  };

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
              <p className='mr-1'>
                {categoryFormatting(selectedCategory) || '카테고리'}
              </p>
              <ChevronDown className='w-4 h-4' />
            </button>

            {isCategoryOpen && (
              <div
                ref={categorySelectRef}
                className='absolute top-10 left-0 z-10'
              >
                <MainCategoriesModal
                  onSelect={(category: string) => handleCategory(category)}
                />
              </div>
            )}
          </div>

          <div className='relative'>
            <button
              className={`w-[132px] h-[34px] rounded-[50px] flex items-center justify-between p-3 border ${
                isSelectedStudyType
                  ? 'border-main text-text1 tm3'
                  : 'border-main/10 text-text1/50'
              }`}
              onClick={() => setStudyTypeOpen((prev) => !prev)}
            >
              <p className='mr-1'>
                {studyTypeFormatting(selectedStudyType) || '진행 방식'}
              </p>
              <ChevronDown className='w-4 h-4' />
            </button>

            {isStudyTypeOpen && (
              <div
                ref={studyTypeSelectRef}
                className='absolute top-10 left-0 z-10'
              >
                <MainOnlineModal
                  onSelect={(studyType: string) => handleStudyType(studyType)}
                />
              </div>
            )}
          </div>
        </div>

        <div className='w-[260px] h-[34px] bg-gray4 rounded-[50px] flex items-center gap-4 px-4 text-text1/50 mt-[35px]'>
          <Search className='w-4 h-4 shrink-0' />
          <input
            type='text'
            placeholder='검색어를 입력해주세요.'
            className='!w-full focus:outline-none'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyword}
          />
          {keyword !== '' && (
            <X
              onClick={handleKeywordReset}
              className='w-4 h-4 shrink-0 cursor-pointer'
            />
          )}
        </div>
      </div>

      <div className='min-h-[500px] mt-[34px] flex flex-col gap-[30px] mb-9'>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <RecruitmentCardSkeleton key={`skeleton${i}`} />
          ))
        ) : posts.length > 0 ? (
          posts.map((recruitment) => (
            <Link
              href={`/recruitment/detail/${recruitment.recruitmentPostId}`}
              key={recruitment.recruitmentPostId}
            >
              <RecruitmentCard
                subject={recruitment.subject}
                content={recruitment.content}
                createAt={recruitment.createAt}
                commentCount={recruitment.commentCount}
                category={recruitment.category}
                studyType={recruitment.studyType}
                status={recruitment.status}
                type={'my'}
              />
            </Link>
          ))
        ) : (
          <div className='w-full h-[500px] flex items-center justify-center text-gray3'>
            <div>
              <SearchX className='w-12 h-12 mx-auto mb-3' strokeWidth={1.5} />
              <div className='flex gap-2 items-center'>
                <span className='tb3'>
                  {categoryParams !== '' ? ` " ${categoryParams} " ` : ''}
                  {studyTypeParams !== '' ? ` " ${studyTypeParams} " ` : ''}
                  {searchKeywordParams !== ''
                    ? ` " ${searchKeywordParams} " `
                    : ''}
                </span>
                조회 결과가 없습니다.
              </div>
            </div>
          </div>
        )}
      </div>

      <MainPagination page={page} handlePage={handlePage} total={totalPage} />
    </>
  );
}
