'use client';

import { EllipsisVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ClickVerticalMenu from './ClickVerticalMenu';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/formatIsoDate';
import Image from 'next/image';
import { updateComments } from '@/lib/api/comment/update';
import { deleteComments } from '@/lib/api/comment/delete';
import { userAuthStore } from '@/stores/userStore';
import basicBunny from '@/assets/images/basic-bunny.svg';

type CommentProps = {
  commentId: number;
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  content: string;
  createdAt?: string;
  onUpdate?: (commentId: number, updatedContent: string) => void;
  target: string;
};

export default function Comment({
  commentId,
  userId,
  nickname,
  profileImageUrl,
  content,
  createdAt,
  onUpdate,
  target,
}: CommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const me = userAuthStore((state) => state.user);

  const handleGoToPr = () => {
    router.push(`/profile/pr/${userId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdate = async () => {
    try {
      await updateComments(commentId, editedContent, target);
      setIsEditing(false);
      if (onUpdate) {
        onUpdate(commentId, editedContent);
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComments(commentId, target);

      if (onUpdate) {
        onUpdate(commentId, '');
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const isMyComment = me?.nickname === nickname;

  return (
    <div className='flex w-full my-3 items-start mb-6'>
      <div>
        <button
          className='w-[50px] h-[50px] rounded-full bg-white border-[1px] shrink-0 relative overflow-hidden mr-5'
          style={{ borderColor: 'var(--color-border1)' }}
          onClick={handleGoToPr}
        >
          <Image
            src={profileImageUrl ?? basicBunny.src}
            width={50}
            height={50}
            alt='예시 기본 프사'
            className='absolute inset-0 w-full h-full object-cover object-center'
          />
        </button>
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex justify-between items-start'>
          <div className='flex'>
            <button
              className='tm4'
              onClick={handleGoToPr}
              style={{ color: 'var(--color-text1)' }}
            >
              {nickname}
            </button>
            {createdAt && (
              <div
                className='tm5 ml-[6px] mt-[2px] opacity-50'
                style={{ color: 'var(--color-text1)' }}
              >
                {formatDate(createdAt)}
              </div>
            )}
          </div>
          {isMyComment && (
            <div className='relative' ref={menuRef}>
              <button
                className={`flex w-10 h-10 rounded-[10px] justify-center items-center ${
                  isOpen ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
                }`}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <EllipsisVertical className='w-5 h-5' />
              </button>
              {isOpen && (
                <ClickVerticalMenu
                  title='내 댓글'
                  onEditClick={() => {
                    setIsEditing(true);
                    setIsOpen(false);
                  }}
                  onDeleteClick={() => {
                    setIsOpen(false);
                    handleDelete();
                  }}
                />
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className='flex gap-2 items-start'>
            <input
              className='w-full border-[1px] rounded-md p-2.5 tm3'
              style={{ borderColor: 'var(--color-border3)' }}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button
              onClick={handleUpdate}
              className='button-type5 text-white px-3 py-1 tm3'
            >
              저장
            </button>
          </div>
        ) : (
          <div
            className={`tm4 ${isMyComment ? 'mt-[-11px]' : 'mt-[4px]'}`}
            style={{ color: 'var(--color-text1)' }}
          >
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
