'use client';

import { useCallback, useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';
import StudyCard from '@/components/my/StudyCard';
import SubMenuItem from '@/components/my/SubMenuItem';
import { MyStudyListType } from '@/types/my';
import { fetchMyStudyList } from '@/lib/api/my';
import StudyCardSkeleton from './StudyCardSkeleton';
import { BookMarked } from 'lucide-react';

const menuName = ['전체', '진행 중', '종료'];
const filterName = ['', 'false', 'true'];

export default function StudyListClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [myStudyList, setMyStudyList] = useState<MyStudyListType['studies']>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filterList = useCallback(async () => {
    setIsLoading(true);
    try {
      const finishedValue = filterName[activeIndex];

      const query = {
        page,
        size: 12,
        sort: 'DESC',
        ...(finishedValue ? { finished: finishedValue } : {}),
      };

      const data = await fetchMyStudyList(query);
      setMyStudyList(data.studies);
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
      <div className='tb3 max-[1024px]:hidden'>전체 스터디</div>
      {/* border-b border-b-[#e5e5e5] */}
      <div className='lg:mt-6'>
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
      {isLoading ? (
        <>
          <div className='grid min-[724px]:grid-cols-3 min-[1024px]:max-[1130px]:grid-cols-2 min-[470px]:grid-cols-2 grid-cols-1 place-items-center gap-[26px] mt-[30px]'>
            {Array.from({ length: 3 }).map((_, i) => (
              <StudyCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          {myStudyList.length === 0 && (
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
          {myStudyList.length !== 0 && (
            <div className='grid min-[724px]:grid-cols-3 min-[1024px]:max-[1130px]:grid-cols-2 min-[470px]:grid-cols-2 grid-cols-1 place-items-center gap-[26px] mt-[30px]'>
              {myStudyList.map((study) => (
                <StudyCard key={study.studyId} {...study} />
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
