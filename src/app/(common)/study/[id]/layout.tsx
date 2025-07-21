'use client';

import SideMenu from '@/components/study-room/sideMenu/SideMenu';
import { useParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const studyId = Number(params.id);

  return (
    <>
      <div className='flex'>
        <div className='w-[300px] mr-10 shrink-0'>
          <SideMenu studyId={studyId} />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
