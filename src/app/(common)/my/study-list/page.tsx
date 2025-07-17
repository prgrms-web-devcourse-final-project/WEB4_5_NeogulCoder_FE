'use client';

import Pagination from '@/components/common/Pagination';
import StudyCard from '@/components/my/StudyCard';
import SubMenuItem from '@/components/my/SubMenuItem';
import { useState } from 'react';

export default function StudyList() {
  const [activeIndex, setActiveIndex] = useState(0);

  const studyType = {
    studyName: '알고리즘 알고가자',
    studyLeader: '한유빙',
    currentMemberCount: 5,
    totalMemberCount: 6,
    startDate: '2025.06.24',
    studyIntro: '알고리즘은 알고 가야 하지 않겠니',
    category: 'IT',
    studyWay: '온라인',
  };

  return (
    <div className='w-full'>
      <div className='tb3'>전체 스터디</div>
      <div className='mt-6'>
        {['진행 중', '종료'].map((status, i) => (
          <SubMenuItem
            key={i}
            isActive={i === activeIndex}
            onClick={() => setActiveIndex(i)}
          >
            {status}
          </SubMenuItem>
        ))}
      </div>
      <div className='grid grid-cols-3 gap-[26px] mt-[30px]'>
        {[...Array(12)].map((_, i) => (
          <StudyCard key={i} {...studyType} />
        ))}
      </div>
      <div className='mt-[30px]'>
        <Pagination />
      </div>
    </div>
  );
}
