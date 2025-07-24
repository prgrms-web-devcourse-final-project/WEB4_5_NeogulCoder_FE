'use client';

import { EllipsisVertical } from 'lucide-react';
import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import { usePathname, useRouter } from 'next/navigation';
import AiQuiz from '@/components/study/AiQuiz';
import CommentList from '@/components/common/CommentList';
import { fetchStudyInfo } from '@/lib/api/study/fetchStudyInfo';
import { userAuthStore } from '@/stores/userStore';
import { fetchComment } from '@/lib/api/study/fetchComment';

export default function Page() {
  const pathname = usePathname();
  const me = userAuthStore((state) => state.user);
  const studyId = Number(pathname.split('/')[2]);
  const postId = Number(pathname.split('/').pop());
  const target = 'study';
  const [isOpen, setIsOpen] = useState(false);
  const [menuIsOpen, menuSetIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);

  type CommentType = {
    commentId: number;
    userId: number;
    nickname: string;
    profileImageUrl: string;
    content: string;
    createdAt: string;
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };
  const handleCommentAdd = () => {
    setCommentCount((prev) => prev + 1);
  };
  const fetchData = useCallback(async () => {
    try {
      const data = await fetchStudyInfo(postId);
      setCreatedDate(data.createdDate);
      setCategory(data.category);
      setUserName(data.username);
      setTitle(data.title);
      setContent(data.content);
      setCommentCount(data.commentCount);
    } catch (error) {
      console.error('데이터 불러오기 실패ㅠㅠ:', error);
    }
  }, [postId]);

  const fetchComments = useCallback(async () => {
    try {
      const data = await fetchComment(studyId, postId);
      setComments(data);
    } catch (error) {
      console.error('데이터 불러오기 실패ㅠㅠ:', error);
    }
  }, [studyId, postId]);

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
      fetchComments();
    }
  }, [studyId, postId, fetchData, fetchComments]);

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
            {menuIsOpen && (
              <ClickVerticalMenu
                title='내 게시물'
                studyId={studyId}
                postId={postId}
                target={target}
              />
            )}
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
            target={target}
            postId={postId}
            commentCount={commentCount}
            profileImageUrl={me?.profileImgUrl}
            onCommentAdd={handleCommentAdd}
          />
        </div>
        <div className='w-[898px]'>
          <CommentList postId={postId} comments={comments} />
        </div>
        {isOpen && (
          <Modal
            title=''
            onClose={() => setIsOpen(false)}
            className='w-[680px] h-auto'
          >
            <AiQuiz
              postId={1} // 더미 데이터
            />
          </Modal>
        )}
      </div>
    </>
  );
}
