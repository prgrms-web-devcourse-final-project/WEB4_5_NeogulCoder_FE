'use client';

import { useState } from 'react';
import Pagination from '@/components/common/Pagination';
import StudyCard from '@/components/my/StudyCard';
import SubMenuItem from '@/components/my/SubMenuItem';
import { StudyList } from '@/types/my';

export default function StudyListClient({
  studyList,
}: {
  studyList: StudyList;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const filterStatus = () => {
    if (activeIndex === 0) {
      return studyList.studies.filter((study) => !study.finished);
    } else {
      return studyList.studies.filter((study) => study.finished);
    }
  };

  return (
    <div className='w-full'>
      <div className='tb3'>전체 스터디</div>
      <div className='mt-6'>
        <SubMenuItem
          isActive={activeIndex === 0}
          onClick={() => setActiveIndex(0)}
        >
          진행 중
        </SubMenuItem>
        <SubMenuItem
          isActive={activeIndex === 1}
          onClick={() => setActiveIndex(1)}
        >
          종료
        </SubMenuItem>
      </div>
      <div className='grid grid-cols-3 gap-[26px] mt-[30px]'>
        {filterStatus().map((study) => (
          <StudyCard key={study.studyId} {...study} />
        ))}
      </div>
      <div className='mt-[30px]'>
        <Pagination />
      </div>
    </div>
  );
}
