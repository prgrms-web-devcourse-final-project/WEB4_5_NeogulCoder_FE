'use client';

import { EllipsisVertical, Tally1 } from 'lucide-react';
import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import Image from 'next/image';
import buddyEnergy from '@/assets/images/buddy-energy.svg';
import { usePathname, useRouter } from 'next/navigation';
import CommentList from '@/components/common/CommentList';
// import { fetchInfo } from '@/lib/api/recruitment/fetchInfo';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };
  const recruitmentPostId = Number(pathname.split('/').pop());
  const [isOpen, setIsOpen] = useState(false);
  const [appIsOpen, setAppIsOpen] = useState(false);
  const [menuIsOpen, menuSetIsOpen] = useState(false);
  const [startedDate, setStartedDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recruitmentCount, setRecruitmentCount] = useState(0);
  const [category, setCategory] = useState('');
  const [studyType, setStudyType] = useState('');
  const [location, setLocation] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [userName, setUserName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  // 추후에 추가될 데이터 const [expireDate, setExpireDate] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);

  // api로 연결 할 예시
  // const fetchData = useCallback(async () => {
  //   try {
  //     const data = await fetchInfo(recruitmentPostId);
  //     setCategory(data.category);
  //     setLocation(data.location);
  //     setStudyType(data.studyType);
  //     setStartedDate(data.startedDate);
  //     setEndDate(data.endDate);
  //     setRecruitmentCount(data.recruitmentCount);
  //     setCreatedDate(data.createdDate);
  //     setUsername(data.username);
  //     setSubject(data.subject);
  //     setContent(data.content);
  //   } catch (error) {
  //     console.error('데이터 불러오기 실패ㅠㅠ:', error);
  //   }
  // }, [recruitmentPostId]);

  const fetchData = useCallback(async () => {
    try {
      // 실제 요청 대신 더미 데이터 사용
      const dummyResponse = {
        category: 'IT',
        location: '서울',
        studyType: '온/오프라인',
        startedDate: '2025-07-16',
        endDate: '2025-08-07',
        recruitmentCount: 3,
        createdDate: '2025-07-16',
        userName: '닉네임',
        subject: '너굴 코더 스터디를 모집 합니다',
        content: '이펙티브 자바를 정독 하는 것을 목표로 하는 스터디 입니다',
      };

      // 응답으로 받은 것처럼 state 세팅
      setCategory(dummyResponse.category);
      setLocation(dummyResponse.location);
      setStudyType(dummyResponse.studyType);
      setStartedDate(dummyResponse.startedDate);
      setEndDate(dummyResponse.endDate);
      setRecruitmentCount(dummyResponse.recruitmentCount);
      setCreatedDate(dummyResponse.createdDate);
      setUserName(dummyResponse.userName);
      setSubject(dummyResponse.subject);
      setContent(dummyResponse.content);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menuSetIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isNaN(recruitmentPostId)) {
      fetchData();
    }
  }, [recruitmentPostId, fetchData]);

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

        <div className='flex justify-between'>
          <div className='flex'>
            <span className='text-[25px] text-[#111111] font-bold'>
              {subject}
            </span>
          </div>
          <div className='relative' ref={menuRef}>
            <button
              className={`flex w-10 h-10 rounded-[10px] justify-center items-center ${
                menuIsOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
              }`}
              onClick={() => menuSetIsOpen((prev) => !prev)}
            >
              <EllipsisVertical />
            </button>
            {menuIsOpen && <ClickVerticalMenu title='내 게시물' />}
          </div>
        </div>

        <div className='flex space-x-6 items-center my-6 justify-between'>
          <div className='flex justify-center items-center'>
            <button
              className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'
              onClick={handleGoToPr}
            ></button>
            <button className='tm3' onClick={handleGoToPr}>
              {userName}
            </button>
          </div>

          <div>
            <span className='tm4 opacity-50 mr-3'>{createdDate}</span>
          </div>
        </div>
        <hr
          className='h-0.5 mb-10'
          style={{ borderColor: 'var(--color-border2)' }}
        />
        <div className='space-y-10'>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm3 opacity-50'>시작 날짜</span>
              <span className='tm3'>{startedDate}</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm3 opacity-50'>종료 날짜</span>
              <span className='tm3'>{endDate}</span>
            </div>
          </div>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm3 opacity-50 '>모집 인원</span>
              <span className='tm3'>{recruitmentCount}</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm3 opacity-50'>카테고리</span>
              <div className='tag-type1 tb5'>{category}</div>
            </div>
          </div>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm3 opacity-50'>진행 방식</span>
              <span className='tm3'>{studyType}</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm3 opacity-50'>지역</span>
              <span className='tm3'>{location}</span>
            </div>
          </div>
          <div className='flex w-[400px]'>
            <span className='mr-8 tm3 opacity-50'>모집 마감일</span>
            <span className='tm3'>2025-08-06</span>
            {/* <span className='tm3'>{expireDate}</span> */}
          </div>
        </div>
        <div
          className='w-full h-[600px] my-10 border-[1px] rounded-[10px] p-5'
          style={{ borderColor: 'var(--color-border3)' }}
        >
          {content}
        </div>
        {/* 반응형 */}
        <div className='2xl:hidden flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6 mb-10'>
          <button
            onClick={() => setAppIsOpen(true)}
            className='w-full h-[44px] bg-[#00C471] hover:bg-[#00B261] text-white tm3 rounded-[10px]'
          >
            모집 중
          </button>
          <button
            onClick={() => setIsOpen(true)}
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
          <CommentList studyId={1} postId={4} />
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
                  <div className='flex flex-col'>
                    <div className='tm3 cursor-pointer ml-3'>닉네임</div>
                    <div className='flex justify-center items-center'>
                      <div className='flex justify-center items-center'>
                        <Image
                          src={buddyEnergy}
                          alt='버디 에너지'
                          className='w-[40px] h-[40px]'
                        />
                        <div className='tm4 opacity-50 justify-center items-center'>
                          60%
                        </div>
                      </div>

                      <div className='tm4 opacity-20 ml-5'>
                        <Tally1 />
                      </div>
                      <div>
                        <span className='tm4 opacity-50'>2025-07-02</span>
                      </div>
                    </div>
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
              className='w-full h-[440px] border-[1px] p-5  my-6 rounded-[6px]'
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
