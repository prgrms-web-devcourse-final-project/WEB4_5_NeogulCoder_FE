'use client';

import { EllipsisVertical, Tally1 } from 'lucide-react';
import Comment from '@/components/common/Comment';
import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import Image from 'next/image';
import buddyEnergy from '@/assets/images/buddy-energy.svg';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };
  const [isOpen, setIsOpen] = useState(false);
  const [appIsOpen, setAppIsOpen] = useState(false);
  const [menuIsOpen, menuSetIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menuSetIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      <div className='w-[852px] mx-auto'>
        <div className='hidden 2xl:flex flex-col fixed right-[15%] space-y-2.5'>
          <button
            onClick={() => setIsOpen(true)}
            className='w-[118px] h-[44px] bg-[#00C471] hover:bg-[#00B261] text-white tm3 rounded-[10px]'
          >
            모집 중
          </button>
          <button
            onClick={() => setAppIsOpen(true)}
            className='w-[118px] h-[44px] border bg-white hover:bg-gray-100 tm3 rounded-[10px]'
            style={{ borderColor: 'var(--color-gray2)' }}
          >
            신청 내역
          </button>
        </div>

        <div className='flex justify-end'>
          <div className='relative' ref={menuRef}>
            <button
              className={`flex w-10 h-10 rounded-full justify-center items-center ${
                isOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
              }`}
              onClick={() => menuSetIsOpen((prev) => !prev)}
            >
              <EllipsisVertical />
            </button>
            {menuIsOpen && <ClickVerticalMenu title='내 게시물' />}
          </div>
        </div>
        <div className='mt-10'>
          <span className='tb2'>
            너굴코더에서 프로젝트 같이 진행하실 웹 백엔드와 디자이너를 모집 중에
            있습니다!
          </span>
        </div>
        <div className='flex space-x-6 items-center my-10 justify-between'>
          <div className='flex justify-center items-center'>
            <button
              className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'
              onClick={handleGoToPr}
            ></button>
            <button className='tm3' onClick={handleGoToPr}>
              닉네임
            </button>
          </div>

          <div>
            <span className='tm4 opacity-50 mr-3'>2025-07-02</span>
          </div>
        </div>
        <hr
          className='h-0.5 my-10'
          style={{ borderColor: 'var(--color-border2)' }}
        />
        <div className='space-y-10'>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm3 opacity-50'>시작 날짜</span>
              <span className='tm3'>2025-07-05</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm3 opacity-50'>종료 날짜</span>
              <span className='tm3'>2025-08-06</span>
            </div>
          </div>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm3 opacity-50 '>모집 인원</span>
              <span className='tm3'>9명</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm3 opacity-50'>카테고리</span>
              <span className='tm3'>IT</span>
            </div>
          </div>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm3 opacity-50'>진행 방식</span>
              <span className='tm3'>온/오프라인</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm3 opacity-50'>지역</span>
              <span className='tm3'>서울</span>
            </div>
          </div>
          <div className='flex w-[400px]'>
            <span className='mr-8 tm3 opacity-50'>모집 마감일</span>
            <span className='tm3'>2025-08-06</span>
          </div>
        </div>
        <div
          className='w-full h-[600px] my-10 border-[1px] rounded-[10px] p-5'
          style={{ borderColor: 'var(--color-border3)' }}
        >
          내용
        </div>
        {/* 반응형 */}
        <div className='2xl:hidden flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6 mb-10'>
          <button
            onClick={() => setIsOpen(true)}
            className='w-full h-[44px] bg-[#00C471] hover:bg-[#00B261] text-white tm3 rounded-[10px]'
          >
            모집 중
          </button>
          <button
            onClick={() => setAppIsOpen(true)}
            className='w-full h-[44px] border bg-white hover:bg-gray-100 tm3 rounded-[10px]'
            style={{ borderColor: 'var(--color-gray2)' }}
          >
            신청 내역
          </button>
        </div>
        <div className='w-[852px]'>
          <WriteComment />
        </div>
        <div className='w-[852px]'>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        {isOpen && (
          <Modal
            title=''
            className='w-[1020px] h-auto'
            onClose={() => setIsOpen(false)}
          >
            <div className='rounded-[10px] px-10 w-full'>
              <div className='flex justify-between w-full'>
                <div className='flex space-x-6 items-center mb-10'>
                  <div className='w-15 h-15 rounded-full bg-gray-300 mr-5 cursor-pointer'></div>
                  <div className='tm3 cursor-pointer'>닉네임</div>
                  <div className='flex justify-center items-center'>
                    <Image
                      src={buddyEnergy}
                      alt='버디 에너지'
                      className='w-[70px] h-auto'
                    />
                    <div className='text-[#111111] opacity-50'>60%</div>
                  </div>

                  <div className='text-[#111111] opacity-20'>
                    <Tally1 />
                  </div>
                  <div>
                    <span className='text-[#111111] opacity-50'>
                      2025-07-02
                    </span>
                  </div>
                </div>
              </div>
              <div
                className='w-full h-[400px] border-[1px] rounded-[10px] p-5 mb-10'
                style={{ borderColor: 'var(--color-border3)' }}
              >
                지원 동기는 어쩌구 저쩌구입니다.
              </div>
              <div className='flex space-x-[15px] justify-end'>
                <button className='w-[100px] h-11 rounded-md text-white tm3 bg-[#B2B2B2] hover:bg-[#9A9A9A]'>
                  거절
                </button>
                <button className='w-[100px] h-11 rounded-md text-white tm3 bg-[#2d90ff] hover:bg-[#217AEC]'>
                  승인
                </button>
              </div>
              {/* <hr
                className='h-0.5 my-10'
                style={{ borderColor: 'var(--color-border2)' }}
              /> */}
            </div>
          </Modal>
        )}
        {appIsOpen && (
          <Modal
            title='모집 신청하기'
            className='w-[1020px] h-auto'
            onClose={() => setAppIsOpen(false)}
          >
            <div
              className='w-full h-[440px] border-[1px] p-5  my-10 rounded-[6px]'
              style={{ borderColor: 'var(--color-border3)' }}
            >
              <span>지원 동기를 입력해주세요</span>
            </div>
            <div className='flex justify-end '>
              <button className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'>
                취소
              </button>
              <button className='button-type5 hover:bg-[#292929]'>확인</button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
