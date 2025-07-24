'use client';

import { useCallback, useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';
import StudyCard from '@/components/my/StudyCard';
import SubMenuItem from '@/components/my/SubMenuItem';
import { MyStudyListType } from '@/types/my';
import { fetchMyStudyList } from '@/lib/api/my';

const menuName = ['전체', '진행 중', '종료'];
const filterName = ['', 'false', 'true'];

export default function StudyListClient({
  initialStudyListData,
}: {
  initialStudyListData: MyStudyListType;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [myStudyList, setMyStudyList] = useState<MyStudyListType['studies']>(
    initialStudyListData.studies
  );

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(initialStudyListData.totalPage);

  const filterList = useCallback(async () => {
    const finishedValue = filterName[activeIndex];

    const query = {
      page,
      pageSize: 12,
      sort: 'DESC',
      ...(finishedValue ? { finished: finishedValue } : {}),
    };

    const data = await fetchMyStudyList(query);
    setMyStudyList(data.studies);
    setTotalPages(data.totalPage);
  }, [activeIndex, page]);

  useEffect(() => {
    filterList();
  }, [page, filterList]);

  return (
    <div className='w-full'>
      <div className='tb3'>전체 스터디</div>
      {/* border-b border-b-[#e5e5e5] */}
      <div className='mt-6'>
        {[...Array(3)].map((_, i) => (
          <SubMenuItem
            key={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(i)}
          >
            {menuName[i]}
          </SubMenuItem>
        ))}
      </div>
      {myStudyList.length === 0 && (
        <div
          className='flex flex-col gap-[30px] mt-[30px] relative 
            h-[calc(100vh-105px-113px-198px)]'
        >
          <div className='flex justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 tm2 text-text1/80'>
            스터디가 없습니다.
          </div>
        </div>
      )}
      {myStudyList.length !== 0 && (
        <div className='grid grid-cols-3 gap-[26px] mt-[30px]'>
          {myStudyList.map((study) => (
            <StudyCard key={study.studyId} {...study} />
          ))}
        </div>
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
