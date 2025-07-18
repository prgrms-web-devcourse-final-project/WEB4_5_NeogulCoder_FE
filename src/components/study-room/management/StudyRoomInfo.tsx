'use client';

import Image from 'next/image';
import StudyRoomInfoCard from './StudyRoomInfoCard';
import { PenLine } from 'lucide-react';
import StudyRoomInfoWrite from './StudyRoomInfoWrite';
import { useState } from 'react';

export default function StudyRoomInfo({
  studyInfoData,
}: {
  studyInfoData: StudyInfoType;
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
      content: studyInfoData.category,
    },
    {
      title: '인원수',
      content: `${studyInfoData.capacity}명`,
    },
    {
      title: '진행방식',
      content: `${
        studyInfoData.studyType === 'ONLINE'
          ? '온라인'
          : studyInfoData.studyType === 'OFFLINE'
          ? '오프라인'
          : '온/오프라인'
      } ${
        studyInfoData.studyType !== 'ONLINE'
          ? ', ' + studyInfoData.location
          : ''
      }`,
    },
    {
      title: '기간',
      content: `${studyInfoData.startDate} ~ ${studyInfoData.endDate}`,
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
          src={studyInfoData.imageUrl}
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
          studyInfoData={studyInfoData}
          closeFn={infoModalClose}
        />
      )}
    </>
  );
}
