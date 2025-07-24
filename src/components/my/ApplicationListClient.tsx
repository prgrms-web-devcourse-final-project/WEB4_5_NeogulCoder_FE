'use client';

import Pagination from '@/components/common/Pagination';
import ApplyingStudyCard from '@/components/my/ApplyingStudyCard';
import { MyApplicationListType } from '@/types/my';
import SubMenuItem from './SubMenuItem';
import { useCallback, useEffect, useState } from 'react';
import { fetchMyApplicationList } from '@/lib/api/my';

const menuName = ['전체', '미완료', '승인', '거절'];
const filterName = ['', 'APPLYING', 'APPROVED', 'REJECTED'];

export default function ApplicationListClient({
  initialApplicationListData,
}: {
  initialApplicationListData: MyApplicationListType;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [myApplicationList, setMyApplicationList] = useState<
    MyApplicationListType['applications']
  >(initialApplicationListData.applications);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(
    initialApplicationListData.totalPage
  );

  const filterList = useCallback(async () => {
    const finishedValue = filterName[activeIndex];

    const query = {
      page,
      pageSize: 12,
      sort: 'DESC',
      ...(finishedValue ? { finished: finishedValue } : {}),
    };

    const data = await fetchMyApplicationList(query);
    // setMyApplicationList(data.applications);
    setMyApplicationList([
      {
        applicationId: 1,
        name: '자바 스터디',
        leaderNickname: '너굴',
        capacity: 4,
        currentCount: 3,
        startDate: '2025-07-15T00:00:00',
        imageUrl: 'http://localhost:8083/image.jpg',
        introduction: '자바 스터디입니다.',
        category: 'IT',
        studyType: 'ONLINE',
        isRead: true,
        status: 'PENDING',
      },
    ]);
    // setTotalPages(data.totalPage);
    setTotalPages(2);
  }, [activeIndex, page]);

  useEffect(() => {
    filterList();
  }, [page, filterList]);

  return (
    <div className='w-full'>
      <div className='tb3'>내가 신청한 스터디</div>
      {/* border-b border-b-[#e5e5e5] */}
      <div className='mt-6'>
        {[...Array(4)].map((_, i) => (
          <SubMenuItem
            key={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(i)}
          >
            {menuName[i]}
          </SubMenuItem>
        ))}
      </div>
      {myApplicationList.length === 0 && (
        <div
          className='flex flex-col gap-[30px] mt-[30px] relative 
                    h-[calc(100vh-105px-113px-198px)]'
        >
          <div className='flex justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 tm2 text-text1/80'>
            스터디가 없습니다.
          </div>
        </div>
      )}
      {myApplicationList.length !== 0 && (
        <div className='grid grid-cols-3 gap-[26px] mt-[30px]'>
          {myApplicationList.map((study) => (
            <ApplyingStudyCard key={study.applicationId} {...study} />
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
