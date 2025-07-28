'use client';

import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import { usePathname, useRouter } from 'next/navigation';
import AiQuiz from '@/components/study/AiQuiz';
import CommentList from '@/components/common/CommentList';
import { fetchStudyInfo } from '@/lib/api/study/fetchStudyInfo';
import { userAuthStore } from '@/stores/userStore';
import { formatDate } from '@/utils/formatDate';
import ToastViewer from '@/components/common/ToastViewer';
import Image from 'next/image';
import basicBunny from '@/assets/images/basic-bunny.svg';
import StudyPostDetailSkeleton from '@/components/study/StudyPostDetailSkeleton';
import dynamic from 'next/dynamic';

export default function StudyCommunityDetailPage() {
  const EllipsisVertical = dynamic(
    () => import('lucide-react').then((m) => m.EllipsisVertical),
    { ssr: false }
  );
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
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    router.push(`/profile/pr/${userId}`);
  };

  const handleCommentAdd = () => {
    setCommentCount((prev) => prev + 1);
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchStudyInfo(postId);
      setCreatedDate(data.postInfo.createdDate);
      setCategory(data.postInfo.category);
      setNickname(data.postInfo.nickname);
      setTitle(data.postInfo.title);
      setContent(data.postInfo.content);
      setImageUrl(data.postInfo.imageUrl);
      setUserId(data.postInfo.userId);
      setCommentCount(data.commentCount);
      setComments(data.comments);
    } catch (error) {
      console.error('데이터 불러오기 실패ㅠㅠ:', error);
    }
  }, [postId]);

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
    try {
      if (!isNaN(studyId) && !isNaN(postId)) {
        fetchData();
      }
    } catch (error) {
      console.error('데이터 받아오기 에러', error);
    } finally {
      setIsLoading(false);
    }
  }, [studyId, postId, fetchData]);

  return (
    <>
      {isLoading ? (
        <StudyPostDetailSkeleton />
      ) : (
        <div className='w-[898px] mx-auto'>
          <div className='flex justify-between'>
            <div className='tag-type3 red tb5'>
              <span>{category === 'NOTICE' ? '공지' : '자유'}</span>
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
              <div>
                <button
                  className='w-[50px] h-[50px] rounded-full bg-gray-300 shrink-0 relative overflow-hidden mr-5'
                  onClick={handleGoToPr}
                >
                  <Image
                    src={imageUrl || basicBunny.src}
                    width={50}
                    height={50}
                    alt='예시 기본 프사'
                    className='absolute inset-0 w-full h-full object-cover object-center'
                  />
                </button>
              </div>
              <button className='tm3 ' onClick={handleGoToPr}>
                {nickname}
              </button>
            </div>

            <div>
              <span className='opacity-50 mr-3 tm4'>
                {formatDate(createdDate)}
              </span>
            </div>
          </div>
          <div
            className='w-full min-h-[600px] h-auto my-10 border-[1px] rounded-[10px] p-5 tm3'
            style={{ borderColor: 'var(--color-border3)' }}
          >
            {content && (
              <ToastViewer key={content} height='100%' initialValue={content} />
            )}
          </div>
          {category === 'FREE' && (
            <div className='flex justify-end'>
              <button
                className='button-type4 mb-10 hover:bg-[#292929] '
                onClick={() => setIsOpen(true)}
              >
                <span className='tm4'>AI 퀴즈 풀기</span>
              </button>
            </div>
          )}
          <div className='w-[898px]'>
            <WriteComment
              target={target}
              postId={postId}
              commentCount={commentCount}
              profileImageUrl={me?.profileImageUrl}
              onCommentAdd={handleCommentAdd}
              userId={me?.id}
            />
          </div>
          <div className='w-[898px]'>
            <CommentList postId={postId} comments={comments} target={target} />
          </div>
          {isOpen && (
            <Modal
              title=''
              onClose={() => setIsOpen(false)}
              className='w-[680px] h-auto'
            >
              <AiQuiz postId={postId} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
