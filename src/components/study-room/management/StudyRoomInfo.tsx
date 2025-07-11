import Image from 'next/image';
import StudyRoomInfoCard from './StudyRoomInfoCard';
import { PenLine } from 'lucide-react';

export default async function StudyRoomInfo() {
  const infos = [
    {
      title: '이름',
      conent: '너굴코더',
    },
    {
      title: '카테고리',
      conent: '개발/IT',
    },
    {
      title: '인원수',
      conent: '6명',
    },
    {
      title: '진행방식',
      conent: '온/오프라인, 서울시',
    },
    {
      title: '기간',
      conent: '2025.07.07 ~ 2025.07.31',
    },
    {
      title: '한줄소개',
      conent: ' 안녕하세요. 너굴코더 스터디입니다.안녕하세요. 너굴코더 스터디입니다.안녕하세요. 너굴코더 스터디입니다.',
    },
  ];
  return (
    <>
      <div className='flex justify-between mb-10'>
        <h3 className='tm1 leading-none'>스터디 정보</h3>
        <button>
          <PenLine className='w-5 h-5' />
        </button>
      </div>
      <div className='w-[120px] h-[120px] overflow-hidden rounded-full border border-border1 mb-14 mx-auto'>
        <Image
          src='https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg'
          width={120}
          height={0}
          alt='스터디이미지'
        />
      </div>
      <div className='w-full grid grid-cols-2 gap-5'>
        {infos.map((info, i) => (
          <StudyRoomInfoCard key={`info${i}`} title={info.title} content={info.conent} />
        ))}
      </div>
    </>
  );
}
