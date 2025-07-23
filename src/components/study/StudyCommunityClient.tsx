'use client';

import Pagination from '@/components/common/Pagination';
import RecruitmentCard from '@/components/my/RecruitmentCard';
import ListMenuStudy from '@/components/study/ListMenuStudy';
import NoticeItem from '@/components/study/NoticeItem';
import { fetchStudyCommunityList } from '@/lib/api/community';
import { StudyCommunityData } from '@/types/community';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const categoryMap: Record<string, '' | 'NOTICE' | 'FREE'> = {
  전체: '',
  공지: 'NOTICE',
  자유: 'FREE',
};

const sortingMap: Record<string, 'createDateTime' | 'commentCount'> = {
  최신순: 'createDateTime',
  댓글순: 'commentCount',
};

export default function StudyCommunityClient({
  initialStudyCommunityData,
}: {
  initialStudyCommunityData: StudyCommunityData;
}) {
  const { id } = useParams();
  const studyId = Number(id);

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSortingType, setSelectedSortingType] = useState('최신순');
  const [keyword, setKeyword] = useState('');

  const [studyCommunityList, setStudyCommunityList] = useState<
    StudyCommunityData['postInfos']
  >(initialStudyCommunityData.postInfos);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(
    initialStudyCommunityData.totalPage
  );

  const filterList = useCallback(async () => {
    const body = {
      page,
      pageSize: 10,
      category: categoryMap[selectedCategory],
      content: keyword,
      attributeName: sortingMap[selectedSortingType],
      sort: 'DESC',
    };
    const data = await fetchStudyCommunityList(studyId, body);
    setStudyCommunityList(data.postInfos);
    setTotalPages(data.totalPage);
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
        {initialStudyCommunityData.noticePostInfos.map((notice) => (
          <NoticeItem key={notice.postId} {...notice} />
        ))}
      </div>
      <div className='flex flex-col gap-[30px] mt-[30px]'>
        {studyCommunityList.map((post) => (
          <RecruitmentCard key={post.id} type='study' {...post} />
        ))}
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
