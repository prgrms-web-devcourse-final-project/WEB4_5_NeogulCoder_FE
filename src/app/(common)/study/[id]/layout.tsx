import SideMenu from '@/components/study-room/sideMenu/SideMenu';
import { getStudyHeaderData } from '@/lib/api/study.api';

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const { data: StudyHeaderType } = await getStudyHeaderData(Number(id));

  const studyHeaderData = {
    name: '자바 스터디',
    introduction: '자바 스터디',
    imageUrl: 'http://localhost:8083/image.jpg',
    studyType: 'ONLINE',
    location: '서울',
  };
  return (
    <>
      <div className='flex'>
        <div className='w-[300px] mr-10 shrink-0'>
          <SideMenu studyHeaderData={studyHeaderData} />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
