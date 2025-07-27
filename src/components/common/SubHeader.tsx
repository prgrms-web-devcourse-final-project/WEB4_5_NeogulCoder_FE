'use client';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateStudyModal from '../study/CreateStudyModal';
import Link from 'next/link';
import { userAuthStore } from '@/stores/userStore';
import Modal from '@/components/common/modal';
import { useStudiesStore } from '@/stores/useStudiesStore';

export default function SubHeader() {
  const router = useRouter();
  const user = userAuthStore().user;
  const { studies, fetchStudies } = useStudiesStore();
  const [studyOpen, setStudyOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleHome = () => {
    router.push('/');
  };

  useEffect(() => {
    if (!user) return;
    fetchStudies();
  }, [user, fetchStudies]);

  return (
    <>
      <div
        className='w-full flex justify-center text-text1'
        onMouseLeave={() => setStudyOpen(false)}
      >
        <div className='w-full min-h-[32px] max-w-[1280px] flex items-center justify-between mt-4 px-4'>
          <div className='flex gap-[50px] tm3'>
            <button type='button' onClick={handleHome}>
              홈
            </button>
            <Link href={`/#recruit`}>모집</Link>
            <button type='button' onClick={() => setIsOpen(true)}>
              스터디 생성
            </button>
            {user && user.role === 'ROLE_ADMIN' && (
              <Link href={`/manager`}>관리자</Link>
            )}
          </div>
          {user && (
            <div
              className='flex gap-[18px] cursor-pointer'
              onMouseEnter={() => setStudyOpen(true)}
            >
              {studies && studies.length >= 5 ? (
                <div className=' relative w-[32px] h-[32px]'>
                  {studies.map((study, i) => (
                    <Link
                      key={study.studyId}
                      href={`/study/${study.studyId}/dashboard`}
                      type='button'
                      className='group w-8 h-8 rounded-[12px] absolute bg-gray3 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out'
                      style={{
                        right: studyOpen
                          ? `${(studies.length - i - 1) * 50}px`
                          : '0px',
                        zIndex: studyOpen ? 1 : -1,
                        opacity: studyOpen ? 1 : 0,
                      }}
                    >
                      <Image
                        src={study.imageUrl ?? musicBunny}
                        alt={study.name}
                        className='w-8 h-8 rounded-[12px] group-hover:drop-shadow'
                        width={38}
                        height={38}
                      />
                      <span className='absolute bg-white p-1 px-2 tl5 border border-border1 rounded-sm whitespace-nowrap bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 hidden group-hover:block  group-hover:drop-shadow z-2'>
                        {study.name}
                      </span>
                    </Link>
                  ))}
                  {/* 보여주기 폴더형식 */}
                  {!studyOpen && (
                    <div className='w-[32px] h-[32px] rounded-[6px] flex-wrap border border-border1 flex gap-0.5 p-[2px] bg-white'>
                      {studies.slice(0, 4).map((study) => (
                        <Image
                          key={`${study.name}이미지`}
                          src={study.imageUrl ?? musicBunny}
                          width={10}
                          height={10}
                          alt={`${study.name}이미지`}
                          className='rounded-[5px]'
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                studies.map((study) => (
                  <Link
                    key={study.studyId}
                    href={`/study/${study.studyId}/dashboard`}
                    type='button'
                    className='group w-8 h-8 rounded-[12px] relative bg-gray3 flex items-center justify-center 
             shadow-[0_1px_4px_rgba(0,0,0,0.12)]'
                  >
                    <Image
                      src={study.imageUrl ?? musicBunny}
                      alt={study.name}
                      className='w-8 h-8 rounded-[12px] group-hover:drop-shadow'
                      width={38}
                      height={38}
                    />
                    <span className='absolute bg-white p-1 px-2 tl5 border border-border1 rounded-sm whitespace-nowrap bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 hidden group-hover:block  group-hover:drop-shadow z-2'>
                      {study.name}
                    </span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          className='w-[680px] h-[700px]'
          title='스터디 생성'
        >
          <CreateStudyModal onClose={() => setIsOpen(false)} />
        </Modal>
      )}
      <hr className='mt-[10px] border-main/10' />
    </>
  );
}
