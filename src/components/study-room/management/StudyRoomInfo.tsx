'use client';

import Image from 'next/image';
import StudyRoomInfoCard from './StudyRoomInfoCard';
import { PenLine } from 'lucide-react';
import StudyRoomInfoWrite from './StudyRoomInfoWrite';
import musicBunny from '@/assets/images/music-bunny.svg';
import { useState } from 'react';
import dayjs from 'dayjs';
import { categoryFormatting } from '@/utils/categoryFormatting';
import { studyTypeFormatting } from '@/utils/studyTypeFormatting';

export default function StudyRoomInfo({
  studyInfoData,
  studyId,
}: {
  studyInfoData: StudyInfoType;
  studyId: number;
}) {
  const [infoModal, setInfoModal] = useState(false);
  const infoModalOpen = () => {
    setInfoModal(true);
  };
  const infoModalClose = () => {
    setInfoModal(false);
  };
  const infos = [
    {
      title: '이름',
      content: studyInfoData.name,
    },
    {
      title: '카테고리',
      content: categoryFormatting(studyInfoData.category),
    },
    {
      title: '인원수',
      content: `${studyInfoData.members.length}/${studyInfoData.capacity}명`,
    },
    {
      title: '진행방식',
      content: studyTypeFormatting(studyInfoData.studyType),
    },
    {
      title: '기간',
      content: `${dayjs(studyInfoData.startDate).format(
        'YYYY-MM-DD'
      )} ~ ${dayjs(studyInfoData.endDate).format('YYYY-MM-DD')}`,
    },
    {
      title: '한줄소개',
      content: studyInfoData.introduction,
    },
  ];
  return (
    <>
      <div className='flex justify-between mb-10'>
        <h3 className='tb3 leading-none'>스터디 정보</h3>
        <button onClick={infoModalOpen}>
          <PenLine className='w-5 h-5' />
        </button>
      </div>
      <div className='w-[120px] h-[120px] overflow-hidden rounded-full border border-border1 mb-14 mx-auto'>
        <Image
          src={studyInfoData.imageUrl ?? musicBunny}
          width={120}
          height={0}
          alt='스터디이미지'
        />
      </div>
      <div className='w-full grid grid-cols-2 gap-5'>
        {infos.map((info, i) => (
          <StudyRoomInfoCard
            key={`info${i}`}
            title={info.title}
            content={info.content}
          />
        ))}
      </div>
      {infoModal && (
        <StudyRoomInfoWrite
          studyId={studyId}
          studyInfoData={studyInfoData}
          // handleUpdate={handleUpdate}
          closeFn={infoModalClose}
        />
      )}
    </>
  );
}
