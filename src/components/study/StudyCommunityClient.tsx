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
import Link from 'next/link';
import { MessageCircleDashed, PencilLine } from 'lucide-react';
import { useStudyStore } from '@/stores/studyInfoStore';

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

  const isProgress = useStudyStore().isProgress;

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
        size: 10,
        // attributeName: sortingValue,
        sort: `${sortingValue},DESC`,
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isLoading]);

  return (
    <div className='w-full relative'>
      <div className='flex justify-between items-center max-[1024px]:hidden'>
        <div className='tb2 text-text1'>커뮤니티</div>
        <div className='text-right'>
          {isProgress && (
            <Link
              href={`/study/${studyId}/study-community/write`}
              className='button-sm-type1'
            >
              게시글 작성
            </Link>
          )}
        </div>
      </div>
      {isProgress && (
        <Link
          href={`/study/${studyId}/study-community/write`}
          className='w-12 h-12 bg-main flex justify-center items-center text-white rounded-full fixed bottom-20 right-5 z-10 lg:hidden'
        >
          <PencilLine />
        </Link>
      )}
      <div className='mt-6'>
        <ListMenuStudy
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSortingType={selectedSortingType}
          setSelectedSortingType={setSelectedSortingType}
          keyword={keyword}
          setKeyword={setKeyword}
          setPage={setPage}
        />
      </div>
      <div className='flex flex-col gap-3 lg:gap-4 p-6 bg-[#fafafa] rounded-lg mt-[30px]'>
        {isLoading ? (
          <>
            {Array.from({ length: 2 }).map((_, i) => (
              <NoticeItemSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {studyNoticeList.length === 0 && (
              <div className='text-center'>
                <MessageCircleDashed
                  className='mx-auto mb-3 w-[50px] h-[50px] text-border2'
                  strokeWidth={1}
                />
                <p className='tm4 text-border2 mb-3'>공지글이 없습니다.</p>
              </div>
            )}
            {studyNoticeList.length !== 0 &&
              studyNoticeList.map((notice) => (
                <NoticeItem key={notice.postId} studyId={studyId} {...notice} />
              ))}
          </>
        )}
      </div>
      <div
        className={`flex flex-col lg:gap-[30px] mt-[30px] max-[1024px]:mx-[-18px] relative ${
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
              <div className='flex flex-col gap-3 justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <MessageCircleDashed
                  className='mx-auto mb-3 w-[50px] h-[50px] text-border3'
                  strokeWidth={1}
                />
                <p className='tm3 text-border3 mb-3'>게시글이 없습니다.</p>
              </div>
            )}
            {studyCommunityList.length !== 0 &&
              studyCommunityList.map((post) => (
                <RecruitmentCard
                  key={post.id}
                  type='study'
                  studyId={studyId}
                  {...post}
                />
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
