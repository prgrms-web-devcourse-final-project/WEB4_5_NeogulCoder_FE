import { Backpack, MapPin } from 'lucide-react';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';

export default function SideStudyInfo({
  studyHeaderData,
}: {
  studyHeaderData: StudyHeaderType;
}) {
  return (
    <>
      <div className='px-5 py-5 bg-gray4 rounded-[10px] mb-3'>
        <div className='flex gap-3 mb-3 items-center'>
          <div className='w-[70px] h-[70px] bg-white rounded-full shrink-0'>
            <Image width={70} src={musicBunny} alt='예시 기본 프사' />
          </div>
          <div>
            <p className='tb3 cursor-default'>{studyHeaderData.name}</p>
            <p className='t4 break-words whitespace-normal'>
              {studyHeaderData.introduction}
            </p>
          </div>
        </div>
        <div className='flex gap-x-4 justify-center mt-1.5'>
          <p className='t5 flex gap-1 items-center'>
            <Backpack className='w-[18px] h-[18px]' strokeWidth={1} />
            {studyHeaderData.studyType === 'ONLINE'
              ? '온라인'
              : studyHeaderData.studyType === 'OFFLINE'
              ? '오프라인'
              : '온/오프라인'}{' '}
            스터디
          </p>
          {studyHeaderData.studyType !== 'ONLINE' &&
            studyHeaderData.location && (
              <p className='t5 flex gap-1 items-center'>
                <MapPin className='w-[18px] h-[18px]' strokeWidth={1} />
                {studyHeaderData.location}
              </p>
            )}
        </div>
      </div>
    </>
  );
}
