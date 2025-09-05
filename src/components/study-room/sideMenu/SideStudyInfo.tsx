import Image from 'next/image';
// import studyDefault from '@/assets/images/study-default.svg';
import logoWibby from '@/assets/images/logo-wibby.svg';
import { studyTypeFormatting } from '@/utils/studyTypeFormatting';
import { Backpack, MapPin } from 'lucide-react';

export default function SideStudyInfo({
  studyInfo,
}: {
  studyInfo: StudyHeaderType;
}) {
  return (
    <>
      <div className='w-[215px] px-3.5 py-3.5 lg:w-full lg:px-5 lg:py-5 bg-gray4 rounded-[10px] mb-3 lg:static absolute'>
        <div className='flex gap-3 mb-3 items-center'>
          <div className='w-[46px] h-[46px] lg:w-[70px] lg:h-[70px] bg-white rounded-full shrink-0 overflow-hidden flex items-center justify-center'>
            <Image
              width={70}
              height={0}
              src={studyInfo.imageUrl ?? logoWibby}
              alt='예시 기본 프사'
              className={
                studyInfo.imageUrl
                  ? 'object-cover'
                  : 'object-contain scale-[0.6]'
              }
            />
          </div>
          <div>
            <p className='tb3 cursor-default'>{studyInfo.name}</p>
            <p className='t4 break-words whitespace-normal'>
              {studyInfo.introduction}
            </p>
          </div>
        </div>
        <div className='flex gap-x-4 justify-center mt-1.5'>
          <p className='t5 flex gap-1 items-center'>
            <Backpack className='w-[18px] h-[18px]' strokeWidth={1} />
            {`${studyTypeFormatting(studyInfo.studyType)} 스터디`}
          </p>
          {studyInfo.studyType !== 'ONLINE' && studyInfo.location && (
            <p className='t5 flex gap-1 items-center'>
              <MapPin className='w-[18px] h-[18px]' strokeWidth={1} />
              {studyInfo.location}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
