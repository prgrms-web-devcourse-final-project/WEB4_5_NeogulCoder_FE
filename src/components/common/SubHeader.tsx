'use client';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import CreateStudyModal from '../study/CreateStudyModal';
import Modal from './Modal';
import Link from 'next/link';
import { getHeaderStudies } from '@/lib/api/header/header.api';
export default function SubHeader() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleHome = () => {
    router.push('/');
  };
  const [studies, setStudies] = useState<HeaderStudiesType[]>([]);
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const { data } = await getHeaderStudies();
        setStudies(data);
      } catch (error) {
        console.error('스터디 목록을 불러오지 못했습니다.', error);
      }
    };
    fetchStudies();
  }, []);

  return (
    <>
      <div className='w-full flex justify-center text-text1'>
        <div className='w-full max-w-[1280px] flex items-center justify-between mt-4 px-4'>
          <div className='flex gap-[50px] tm3'>
            <button type='button' onClick={handleHome}>
              홈
            </button>
            <button type='button'>모집</button>
            <button type='button' onClick={() => setIsOpen(true)}>
              스터디 생성
            </button>
          </div>
          <div className='flex gap-6 cursor-pointer'>
            {studies &&
              studies.map((study) => (
                <Link
                  key={study.studyId}
                  href={`/study/${study.studyId}/dashboard`}
                  type='button'
                  className='group w-8 h-8 rounded-[12px] relative bg-gray3 flex items-center justify-center 
             shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:drop-shadow'
                >
                  <Image
                    src={study.imageUrl ?? musicBunny}
                    alt={study.name ?? '스터디 이미지'}
                    className='w-[38px] h-[38px]'
                    width={38}
                    height={38}
                  />
                  <span className='absolute bg-white p-1 tl5 border border-border1 rounded-sm whitespace-nowrap bottom-0 right-0 translate-y-1/2 hidden group-hover:block'>
                    {study.name ?? '임시 이름입니다.'}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          className='w-[680px] h-[700px]'
          title='스터디 생성'
        >
          <CreateStudyModal />
        </Modal>
      )}
      <hr className='mt-[10px] border-main/10' />
    </>
  );
}
