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
import { fetchInfo } from '@/lib/api/recruitment/fetchInfo';
import { formatDate } from '@/utils/formatIsoDate';
import { userAuthStore } from '@/stores/userStore';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import { changeStatus } from '@/lib/api/recruitment/changeStatus';
import { studyApplication } from '@/lib/api/recruitment/studyApplication';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const me = userAuthStore((state) => state.user);
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };
  const target = 'recruitment';
  const recruitmentPostId = Number(pathname.split('/').pop());
  const [isOpen, setIsOpen] = useState(false);
  const [appIsOpen, setAppIsOpen] = useState(false);
  const [menuIsOpen, menuSetIsOpen] = useState(false);
  const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
  const [startedDate, setStartedDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recruitmentCount, setRecruitmentCount] = useState(0);
  const [category, setCategory] = useState('');
  const [studyType, setStudyType] = useState('');
  const [location, setLocation] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);
  const [applicationReason, setApplicationReason] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  type CommentType = {
    userId: number;
    nickname: string;
    imageUrl: string;
    content: string;
    createdAt: string;
    commentId: number;
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchInfo(recruitmentPostId);
      setCategory(data.postDetailsInfo.category);
      setLocation(data.postDetailsInfo.location);
      setStudyType(data.postDetailsInfo.studyType);
      setStartedDate(data.postDetailsInfo.startedDate);
      setEndDate(data.postDetailsInfo.endDate);
      setRecruitmentCount(data.postDetailsInfo.recruitmentCount);
      setCreatedDate(data.postDetailsInfo.createdDate);
      setNickname(data.postDetailsInfo.nickname);
      setSubject(data.postDetailsInfo.subject);
      setContent(data.postDetailsInfo.content);
      setProfileImageUrl(data.postDetailsInfo.profileImageUrl);
      setExpiredDate(data.postDetailsInfo.expiredDate);
      setCommentCount(data.commentCount);
      setComments(data.commentsWithWriterInfos);
    } catch (error) {
      console.error('데이터 불러오기 실패ㅠㅠ:', error);
    }
  }, [recruitmentPostId]);

  const handleStudyAppSubmit = async () => {
    try {
      const appData = await studyApplication(
        recruitmentPostId,
        applicationReason
      );
      console.log('생성 완료', appData);
    } catch (error) {
      console.error('생성 실패', error);
    }
  };

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
            onClick={() => {
              if (me?.nickname === nickname) {
                setStatusModalIsOpen(true);
              } else {
                setAppIsOpen(true);
              }
            }}
            className='w-[118px] h-[44px] bg-[#00C471] hover:bg-[#00B261] text-white tm3 rounded-[10px]'
          >
            {me?.nickname === nickname ? '모집 중' : '모집 신청'}
          </button>
          {me?.nickname === nickname && (
            <button
              onClick={() => setIsOpen(true)}
              className='w-[118px] h-[44px] border bg-white hover:bg-gray-100 tm3 rounded-[10px]'
              style={{ borderColor: 'var(--color-gray2)' }}
            >
              신청 내역
            </button>
          )}
        </div>

        <div className='flex justify-between'>
          <div className='flex'>
            <span className='text-[25px] text-[#111111] font-bold'>
              {subject}
            </span>
          </div>
          {me?.nickname === nickname && (
            <div className='relative' ref={menuRef}>
              <button
                className={`flex w-10 h-10 rounded-[10px] justify-center items-center ${
                  menuIsOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
                }`}
                onClick={() => menuSetIsOpen((prev) => !prev)}
              >
                <EllipsisVertical />
              </button>
              {menuIsOpen && (
                <ClickVerticalMenu
                  title='내 게시물'
                  recruitmentPostId={recruitmentPostId}
                />
              )}
            </div>
          )}
        </div>

        <div className='flex space-x-6 items-center my-6 justify-between'>
          <div className='flex justify-center items-center'>
            <button
              className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'
              onClick={handleGoToPr}
            >
              {profileImageUrl}
            </button>
            <button className='tm3' onClick={handleGoToPr}>
              {nickname}
            </button>
          </div>

          <div>
            <span className='tm4 opacity-50 mr-3'>
              {formatDate(createdDate)}
            </span>
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
              <span className='tm3'>{formatDate(startedDate)}</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm3 opacity-50'>종료 날짜</span>
              <span className='tm3'>{formatDate(endDate)}</span>
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
            <span className='tm3'>{formatDate(expiredDate)}</span>
          </div>
        </div>
        <div
          className='w-full h-[600px] my-10 border-[1px] rounded-[10px] p-5 tm3'
          style={{ borderColor: 'var(--color-border3)' }}
        >
          {content && (
            <Viewer key={content} height='100%' initialValue={content} />
          )}
        </div>
        <div className='2xl:hidden flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6 mb-10'>
          <button
            onClick={() => {
              if (me?.nickname === nickname) {
                setStatusModalIsOpen(true);
              } else {
                setAppIsOpen(true);
              }
            }}
            className='w-full h-[44px] bg-[#00C471] hover:bg-[#00B261] text-white tm3 rounded-[10px]'
          >
            {me?.nickname === nickname ? '모집 중' : '모집 신청'}
          </button>
          {me?.nickname === nickname && (
            <button
              onClick={() => setIsOpen(true)}
              className='w-full h-[44px] border bg-white hover:bg-gray-100 tm3 rounded-[10px]'
              style={{ borderColor: 'var(--color-gray2)' }}
            >
              신청 내역
            </button>
          )}
        </div>
        <div className='w-[852px]'>
          <WriteComment
            target={target}
            postId={recruitmentPostId}
            commentCount={commentCount}
            profileImageUrl={me?.profileImgUrl}
            onCommentAdd={fetchData}
          />
        </div>
        <div className='w-[852px]'>
          <CommentList postId={recruitmentPostId} comments={comments} />
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
            <textarea
              className='w-full h-[440px] border-[1px] p-5  my-6 rounded-[6px]'
              placeholder='지원 동기를 입력해주세요'
              style={{ borderColor: 'var(--color-border3)' }}
              value={applicationReason}
              onChange={(e) => setApplicationReason(e.target.value)}
            ></textarea>
            <div className='flex justify-end '>
              <button className='button-type6 mr-[15px] hover:bg-[#f5f5f5]'>
                취소
              </button>
              <button
                className='button-type5 hover:bg-[#292929]'
                onClick={handleStudyAppSubmit}
              >
                확인
              </button>
            </div>
          </Modal>
        )}
        {statusModalIsOpen && (
          <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
            <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
              <p className='mb-7 tm3 text-center'>
                스터디 모집을 완료하시겠습니까? <br />
                모집 완료로 변경하면 더 이상 신청을 받을 수 없습니다.
              </p>
              <div className='flex gap-4 justify-center'>
                <button
                  className='button-type6 w-[120px]!'
                  onClick={() => setStatusModalIsOpen(false)}
                >
                  취소
                </button>
                <button
                  className='button-type5 w-[120px]! bg-red! text-white! hover:bg-[#e14d4a]!'
                  onClick={async () => {
                    changeStatus(recruitmentPostId);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
