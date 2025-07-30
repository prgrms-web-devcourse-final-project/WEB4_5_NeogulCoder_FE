'use client';

import Pagination from '@/components/common/Pagination';
import ApplyingStudyCard from '@/components/my/ApplyingStudyCard';
import { MyApplicationListType } from '@/types/my';
import SubMenuItem from './SubMenuItem';
import { useCallback, useEffect, useState } from 'react';
import { fetchMyApplicationList } from '@/lib/api/my';
import { BookMarked } from 'lucide-react';
import ApplyingStudyCardSkeleton from './ApplyingStudyCardSkeleton';

const menuName = ['전체', '미완료', '승인', '거절'];
const filterName = ['', 'APPLYING', 'APPROVED', 'REJECTED'];

export default function ApplicationListClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [myApplicationList, setMyApplicationList] = useState<
    MyApplicationListType['applications']
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filterList = useCallback(async () => {
    setIsLoading(true);
    try {
      const statusValue = filterName[activeIndex];

      const query = {
        page,
        size: 12,
        sort: 'DESC',
        ...(statusValue ? { status: statusValue } : {}),
      };

      const data = await fetchMyApplicationList(query);
      setMyApplicationList(data.applications);
      setTotalPages(data.totalPage);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [activeIndex, page]);

  useEffect(() => {
    filterList();
  }, [page, filterList]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isLoading]);

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
      {isLoading ? (
        <>
          <div className='grid grid-cols-3 gap-[26px] mt-[30px]'>
            {Array.from({ length: 3 }).map((_, i) => (
              <ApplyingStudyCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          {myApplicationList.length === 0 && (
            <div
              className='flex flex-col gap-[30px] mt-[30px] relative 
                    h-[calc(100vh-105px-113px-198px)]'
            >
              {/* <div className='flex justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 tm2 text-text1/80'>
                스터디가 없습니다.
              </div> */}
              <div className='flex flex-col gap-3 justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <BookMarked
                  className='mx-auto mb-3 w-[50px] h-[50px] text-border3'
                  strokeWidth={1}
                />
                <p className='tm3 text-border3 mb-3'>스터디가 없습니다.</p>
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
