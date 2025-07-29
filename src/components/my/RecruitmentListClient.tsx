'use client';

import Pagination from '@/components/common/Pagination';
import ListMenu from '@/components/my/ListMenu';
import RecruitmentCard from '@/components/my/RecruitmentCard';
import { fetchMyRecruitmentList } from '@/lib/api/my';
import { MyRecruitmentListType } from '@/types/my';
import { useCallback, useEffect, useState } from 'react';
import RecruitmentCardSkeleton from './RecruitmentCardSkeleton';
import { MessageCircleDashed } from 'lucide-react';

const categoryMap: Record<string, string> = {
  전체: '',
  어학: 'LANGUAGE',
  IT: 'IT',
  '고시/자격증': 'EXAM',
  금융: 'FINANCE',
  경영: 'MANAGEMENT',
  디자인: 'DESIGN',
  예술: 'ART',
  '사진/영상': 'PHOTO_VIDEO',
  뷰티: 'BEAUTY',
  스포츠: 'SPORTS',
  취미: 'HOBBY',
  기타: 'ETC',
};

const studyTypeMap: Record<string, '' | 'ONLINE' | 'OFFLINE' | 'HYBRID'> = {
  '전체 방식': '',
  온라인: 'ONLINE',
  오프라인: 'OFFLINE',
  병행: 'HYBRID',
};

export default function RecruitmentListClient() {
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const [selectedStudyType, setSelectedStudyType] = useState('진행 방식');
  const [keyword, setKeyword] = useState('');

  const [myRecruitmentList, setMyRecruitmentList] = useState<
    MyRecruitmentListType['postInfos']
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filterList = useCallback(async () => {
    setIsLoading(true);
    try {
      const categoryValue = categoryMap[selectedCategory];
      const studyTypeValue = studyTypeMap[selectedStudyType];

      const query = {
        page,
        pageSize: 10,
        sort: 'DESC',
        ...(categoryValue ? { category: categoryValue } : {}),
        ...(studyTypeValue ? { studyType: studyTypeValue } : {}),
        ...(keyword ? { keyword } : {}),
      };

      const data = await fetchMyRecruitmentList(query);
      setMyRecruitmentList(data.postInfos);
      setTotalPages(data.totalPage);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedStudyType, keyword, page]);

  useEffect(() => {
    filterList();
  }, [selectedCategory, selectedStudyType, keyword, page, filterList]);

  return (
    <div className='w-full'>
      <div className='tb3'>내가 작성한 모집 글</div>
      <div className='mt-6'>
        <ListMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStudyType={selectedStudyType}
          setSelectedStudyType={setSelectedStudyType}
          setKeyword={setKeyword}
          setPage={setPage}
        />
      </div>
      {isLoading ? (
        <>
          <div className='flex flex-col gap-[30px] mt-[30px]'>
            {Array.from({ length: 3 }).map((_, i) => (
              <RecruitmentCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex flex-col gap-[30px] mt-[30px] relative ${
              myRecruitmentList.length === 0 &&
              'h-[calc(100vh-105px-113px-198px)]'
            }`}
          >
            {myRecruitmentList.length === 0 && (
              // <div className='flex justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 tm2 text-text1/80'>
              //   내가 작성한 모집 글이 없습니다.
              // </div>
              <div className='flex flex-col gap-3 justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <MessageCircleDashed
                  className='mx-auto mb-3 w-[50px] h-[50px] text-border2'
                  strokeWidth={1}
                />
                <p className='tm4 text-border2 mb-3'>
                  내가 작성한 모집 글이 없습니다.
                </p>
              </div>
            )}
            {myRecruitmentList.length !== 0 &&
              myRecruitmentList.map((post) => (
                <RecruitmentCard
                  key={post.recruitmentPostId}
                  type='my'
                  {...post}
                />
              ))}
          </div>
        </>
      )}
      <div className='mt-[30px]'>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
