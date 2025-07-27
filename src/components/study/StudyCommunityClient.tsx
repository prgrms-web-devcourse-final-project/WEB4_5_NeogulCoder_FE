'use client';

import Pagination from '@/components/common/Pagination';
import RecruitmentCard from '@/components/my/RecruitmentCard';
import ListMenuStudy from '@/components/study/ListMenuStudy';
import NoticeItem from '@/components/study/NoticeItem';
import { fetchStudyCommunityList } from '@/lib/api/community';
import { StudyListType } from '@/types/community';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import NoticeItemSkeleton from './NoticeItemSkeleton';
import CommunityCardSkeleton from './CommunityCardSkeleton';

const categoryMap: Record<string, '' | 'NOTICE' | 'FREE'> = {
  전체: '',
  공지: 'NOTICE',
  자유: 'FREE',
};

const sortingMap: Record<string, 'createDateTime' | 'commentCount'> = {
  최신순: 'createDateTime',
  댓글순: 'commentCount',
};

export default function StudyCommunityClient() {
  const { id } = useParams();
  const studyId = Number(id);

  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const [selectedSortingType, setSelectedSortingType] = useState('최신순');
  const [keyword, setKeyword] = useState('');

  const [studyNoticeList, setStudyNoticeList] = useState<
    StudyListType['noticePostInfos']
  >([]);
  const [studyCommunityList, setStudyCommunityList] = useState<
    StudyListType['postInfos']
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filterList = useCallback(async () => {
    setIsLoading(true);
    try {
      const categoryValue = categoryMap[selectedCategory];
      const sortingValue = sortingMap[selectedSortingType];

      const query = {
        page,
        pageSize: 10,
        attributeName: sortingValue,
        sort: 'DESC',
        ...(categoryValue ? { category: categoryValue } : {}),
        ...(keyword ? { keyword } : {}),
      };

      const data = await fetchStudyCommunityList(studyId, query);
      setStudyNoticeList(data.noticePostInfos);
      setStudyCommunityList(data.postInfos);
      setTotalPages(data.totalPage);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedSortingType, keyword, page, studyId]);

  useEffect(() => {
    filterList();
  }, [selectedCategory, selectedSortingType, keyword, page, filterList]);

  return (
    <div className='w-full'>
      <div className='tb2 text-text1'>커뮤니티</div>
      <div className='mt-6'>
        <ListMenuStudy
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSortingType={selectedSortingType}
          setSelectedSortingType={setSelectedSortingType}
          setKeyword={setKeyword}
          setPage={setPage}
        />
      </div>
      <div className='flex flex-col gap-4 p-6 bg-[#fafafa] rounded-[8px] mt-[30px]'>
        {isLoading ? (
          <>
            {Array.from({ length: 2 }).map((_, i) => (
              <NoticeItemSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {studyNoticeList.length === 0 && (
              <div className='text-center tm3 text-text1/80'>
                공지가 없습니다.
              </div>
            )}
            {studyNoticeList.length !== 0 &&
              studyNoticeList.map((notice) => (
                <NoticeItem key={notice.postId} {...notice} />
              ))}
          </>
        )}
      </div>
      <div
        className={`flex flex-col gap-[30px] mt-[30px] relative ${
          studyCommunityList.length === 0 && 'h-[calc(100vh-105px-113px-198px)]'
        }`}
      >
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <CommunityCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {studyCommunityList.length === 0 && (
              <div className='flex justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 tm2 text-text1/80'>
                게시글이 없습니다.
              </div>
            )}
            {studyCommunityList.length !== 0 &&
              studyCommunityList.map((post) => (
                <RecruitmentCard key={post.id} type='study' {...post} />
              ))}
          </>
        )}
      </div>
      <div className='mt-[45px]'>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
