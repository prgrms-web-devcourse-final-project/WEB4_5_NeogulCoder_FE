'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/logo-wibby.svg';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateStudyModal from '../study/CreateStudyModal';
import Link from 'next/link';
import { userAuthStore } from '@/stores/userStore';
import Modal from '@/components/common/Modal';
import { useStudiesStore } from '@/stores/useStudiesStore';
import {
  BookMarked,
  CopyPlus,
  House,
  Layers,
  Settings,
  SquarePen,
} from 'lucide-react';
import MobileStudyListMenu from './MobileStudyListMenu';

export default function SubHeader() {
  const router = useRouter();
  const user = userAuthStore().user;
  const { studies, fetchStudies } = useStudiesStore();
  const [studyOpen, setStudyOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const hiddenPath = [
    '/profile/pr',
    '/profile/edit-profile',
    '/profile/withdrawal',
  ];
  const isHidden = hiddenPath.some((p) => pathname.startsWith(p));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleHome = () => {
    router.push('/');
  };

  useEffect(() => {
    if (!user) return;
    fetchStudies();
  }, [user, fetchStudies]);

  const isStudyPage = pathname.startsWith('/study');

  return (
    <>
      <div
        className={`w-full flex justify-center text-text1 fixed lg:static left-0 bottom-0 shadow-[0_-1px_12px_rgba(0,0,0,0.1)] bg-white lg:shadow-none h-[60px] lg:h-auto ${
          isHidden ? 'hidden lg:flex' : ''
        }`}
        onMouseLeave={() => setStudyOpen(false)}
      >
        <div className='w-full min-h-[32px] max-w-[1280px] flex items-center justify-between mt-2 lg:mt-4 px-4'>
          <div className='tm3 text-xs md:text-sm lg:text-base flex justify-around lg:justify-start w-full gap-2 lg:gap-[50px]'>
            <button
              type='button'
              onClick={handleHome}
              className='flex flex-col justify-center items-center order-3 lg:order-1 gap-1'
            >
              <div>
                <House className='w-4 h-4 lg:hidden' strokeWidth={1.7} />
              </div>
              홈
            </button>
            <Link
              href={`/#recruit`}
              className='flex flex-col justify-center items-center order-1 lg:order-2  gap-1'
            >
              <div>
                <BookMarked className='w-4 h-4 lg:hidden' strokeWidth={1.7} />
              </div>
              모집글
            </Link>

            {user && (
              <>
                <Link
                  href={`/recruitment/write`}
                  className='flex flex-col justify-center items-center order-2  lg:order-3  gap-1'
                >
                  <div>
                    <SquarePen
                      className='w-4 h-4 lg:hidden'
                      strokeWidth={1.7}
                    />
                  </div>
                  모집글 작성
                </Link>
                <button
                  type='button'
                  onClick={() => setIsOpen(true)}
                  className='flex flex-col justify-center items-center order-4  gap-1'
                >
                  <div>
                    <CopyPlus className='w-4 h-4 lg:hidden' strokeWidth={1.7} />
                  </div>
                  스터디 생성
                </button>
              </>
            )}
            {user && user.role === 'ROLE_ADMIN' && (
              <Link
                href={`/manager`}
                className='flex flex-col justify-center items-center order-5 gap-1'
              >
                <Settings className='w-4 h-4 lg:hidden' strokeWidth={1.7} />
                관리자
              </Link>
            )}
            {user && (
              <div className='lg:hidden order-6'>
                <button
                  onClick={() => setMobileOpen(true)}
                  className='flex flex-col justify-center items-center gap-1'
                >
                  <Layers className='w-4 h-4' strokeWidth={1.7} />
                  <p>내 스터디</p>
                </button>
                <MobileStudyListMenu
                  studies={studies}
                  mobileOpen={mobileOpen}
                  closeFn={() => setMobileOpen(false)}
                />
              </div>
            )}
          </div>
          {user && (
            <>
              <div
                className='hidden lg:flex gap-[18px] cursor-pointer'
                onMouseEnter={() => setStudyOpen(true)}
              >
                {studies && studies.length >= 5 ? (
                  <div className='relative w-[32px] h-[32px]'>
                    {studies.map((study, i) => (
                      <Link
                        key={study.studyId}
                        href={`/study/${study.studyId}/dashboard`}
                        type='button'
                        className='group w-8 h-8 rounded-[12px] absolute bg-white flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.18)] transition-all duration-300 ease-in-out'
                        style={{
                          right: studyOpen
                            ? `${(studies.length - i - 1) * 50}px`
                            : '0px',
                          zIndex: studyOpen ? 1 : -1,
                          opacity: studyOpen ? 1 : 0,
                        }}
                      >
                        <Image
                          src={study.imageUrl ?? logoWibby}
                          alt={study.name}
                          // className='w-8 h-8 rounded-[12px] group-hover:drop-shadow'
                          width={38}
                          height={38}
                          className={`rounded-[12px] group-hover:drop-shadow ${
                            study.imageUrl
                              ? 'w-8 h-8'
                              : 'object-contain scale-[0.6]'
                          }`}
                        />
                        <span className='absolute bg-white p-1 px-2 tl5 border border-border1 rounded-sm whitespace-nowrap bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 hidden group-hover:block  group-hover:drop-shadow z-2'>
                          {study.name}
                        </span>
                      </Link>
                    ))}
                    {/* 보여주기 폴더형식 */}
                    {!studyOpen && (
                      <div className='w-[32px] h-[32px] rounded-[6px] items-center justify-center flex-wrap border border-border1 flex gap-0.5 p-[2px] bg-white'>
                        {studies.slice(0, 4).map((study) => (
                          <Image
                            key={`${study.studyId}이미지`}
                            src={study.imageUrl ?? logoWibby}
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
                      className='group w-8 h-8 rounded-[12px] relative bg-white flex items-center justify-center 
             shadow-[0_1px_4px_rgba(0,0,0,0.18)]'
                    >
                      <Image
                        src={study.imageUrl ?? logoWibby}
                        alt={study.name}
                        // className='w-8 h-8 rounded-[12px] group-hover:drop-shadow'
                        width={32}
                        height={32}
                        className={`rounded-[12px] group-hover:drop-shadow ${
                          study.imageUrl
                            ? 'w-8 h-8'
                            : 'object-contain scale-[0.6]'
                        }`}
                      />
                      <span className='absolute bg-white p-1 px-2 tl5 border border-border1 rounded-sm whitespace-nowrap bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 hidden group-hover:block  group-hover:drop-shadow z-2'>
                        {study.name}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          className='w-full h-full lg:w-[680px] lg:h-[700px]'
          title='스터디 생성'
        >
          <CreateStudyModal onClose={() => setIsOpen(false)} />
        </Modal>
      )}
      {!isStudyPage && (
        <hr className='lg:mt-[10px] border-main/10 relative -z-1' />
      )}
    </>
  );
}
