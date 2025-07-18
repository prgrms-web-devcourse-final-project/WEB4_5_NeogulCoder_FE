'use client';

import Pagination from '@/components/common/Pagination';
import ApplyingStudyCard from '@/components/my/ApplyingStudyCard';
import ListMenu from '@/components/my/ListMenu';
import { ApplicationList } from '@/types/my';

export default function ApplicationListClient({
  applicationList,
}: {
  applicationList: ApplicationList;
}) {
  return (
    <div className='w-full'>
      <div className='tb3'>내가 신청한 스터디</div>
      <div className='mt-6'>
        <ListMenu />
      </div>
      <div className='grid grid-cols-3 gap-[26px] mt-[30px]'>
        {applicationList.applications.map((app, i) => (
          <ApplyingStudyCard key={`${app.name} - ${i}`} {...app} />
        ))}
      </div>
      <div className='mt-[30px]'>
        <Pagination />
      </div>
    </div>
  );
}
