'use client';

import { EllipsisVertical } from 'lucide-react';
import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import { usePathname, useRouter } from 'next/navigation';
import AiQuiz from '@/components/study/AiQuiz';
import CommentList from '@/components/common/CommentList';
// import { fetchStudyInfo } from '@/lib/api/study/fetchStudyInfo';

export default function Page() {
  const pathname = usePathname();
  const studyId = Number(pathname.split('/')[2]);
  const postId = Number(pathname.split('/').pop());
  const [isOpen, setIsOpen] = useState(false);
  const [menuIsOpen, menuSetIsOpen] = useState(false);
  // const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };

  // api로 연결 할 예시
  // const fetchData = useCallback(async () => {
  //   try {
  //     const data = await fetchStudyInfo(studyId, postId);
  //     setId(data.id);
  //     setCreatedDate(data.createdDate);
  //     setCategory(data.category);
  //     setUserName(data.username);
  //     setTitle(data.title);
  //     setContent(data.content);
  //     setCommentCount(data.commentCount)
  //   } catch (error) {
  //     console.error('데이터 불러오기 실패ㅠㅠ:', error);
  //   }
  // }, [studyId, postId]);

  const fetchData = useCallback(async () => {
    try {
      // 실제 요청 대신 더미 데이터 사용
      const dummyResponse = {
        category: '공지',
        createdDate: '2025-07-16',
        userName: '닉네임',
        title: '너굴 코더 스터디를 모집 합니다',
        content: '이펙티브 자바를 정독 하는 것을 목표로 하는 스터디 입니다',
        commentCount: 11,
        profileImageUrl: 'https://cdn.example.com/profile.jpg',
      };

      // 응답으로 받은 것처럼 state 세팅
      setCategory(dummyResponse.category);
      setCreatedDate(dummyResponse.createdDate);
      setUserName(dummyResponse.userName);
      setTitle(dummyResponse.title);
      setContent(dummyResponse.content);
      setCommentCount(dummyResponse.commentCount);
      setProfileImageUrl(dummyResponse.profileImageUrl);
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
    if (!isNaN(studyId) && !isNaN(postId)) {
      fetchData();
    }
  }, [studyId, postId, fetchData]);

  return (
    <>
      <div className='w-[898px] mx-auto'>
        <div className='flex justify-between'>
          <div className='tag-type3 red tb5'>
            <span>{category}</span>
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

        <div className='tb2'>
          <span>{title}</span>
        </div>
        <div className='flex space-x-6 items-center my-6 justify-between'>
          <div className='flex justify-center items-center'>
            <button
              className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'
              onClick={handleGoToPr}
            ></button>
            <button className='tm3 ' onClick={handleGoToPr}>
              {userName}
            </button>
          </div>

          <div>
            <span className='opacity-50 mr-3 tm4'>{createdDate}</span>
          </div>
        </div>
        <div
          className='w-full h-[600px] my-10 border-[1px] rounded-[10px] p-5'
          style={{ borderColor: 'var(--color-border3)' }}
        >
          {content}
        </div>
        <div className='flex justify-end'>
          <button
            className='button-type4 mb-10 hover:bg-[#292929] '
            onClick={() => setIsOpen(true)}
          >
            <span className='tm4'>AI 퀴즈 풀기</span>
          </button>
        </div>
        <div className='w-[898px]'>
          <WriteComment
            commentCount={commentCount}
            profileImageUrl={profileImageUrl}
          />
        </div>
        <div className='w-[898px]'>
          <CommentList studyId={1} postId={4} />
        </div>
        {isOpen && (
          <Modal
            title=''
            onClose={() => setIsOpen(false)}
            className='w-[680px] h-auto'
          >
            <AiQuiz
              postId={'1'} // 더미 데이터
              postCategory='자유 게시글'
              postContent='자바에서 클래스와 객체의 차이에 대해 설명한 스터디 요약입니다.'
            />
          </Modal>
        )}
      </div>
    </>
  );
}
