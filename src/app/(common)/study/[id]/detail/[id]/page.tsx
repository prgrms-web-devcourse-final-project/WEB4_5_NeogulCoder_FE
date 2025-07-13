<<<<<<< HEAD
"use client";

import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Tally1,
} from "lucide-react";
import Comment from "@/components/common/Comment";
import WriteComment from "@/components/common/WriteComment";
import Modal from "@/components/common/Modal";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
=======
'use client';

import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import Comment from '@/components/common/Comment';
import WriteComment from '@/components/common/WriteComment';
import Modal from '@/components/common/Modal';
import { useEffect, useRef, useState } from 'react';
import ClickVerticalMenu from '@/components/common/ClickVerticalMenu';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuIsOpen, menuSetIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleGoToPr = () => {
    router.push('/profile/pr');
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
>>>>>>> dev

  return (
    <>
      <div className='w-[898px] mx-auto'>
        <div className='flex justify-between'>
<<<<<<< HEAD
          <button>
            <ChevronLeft />
          </button>
          <button>
            <EllipsisVertical />
          </button>
        </div>
        <div className='tag-type3 red tb5 mb-6 mt-10'>
          <span>공지</span>
        </div>
        <div className='tb1'>
          <span>오늘 공부한 내용 정리해서 올립니다!</span>
        </div>
        <div className='flex space-x-6 items-center my-10'>
          <div>
            <button className='w-15 h-15 rounded-full bg-gray-300 mr-5'></button>
          </div>
          <div className='tm2'>닉네임</div>
          <div className='text-[#111111] opacity-20'>
            <Tally1 />
          </div>
          <div>
            <span className='text-[#111111] opacity-50'>2025-07-02</span>
          </div>
        </div>
        <hr
          className='h-0.5 my-10'
          style={{ borderColor: "var(--color-border2)" }}
        />
        <div className='w-full h-[600px] mb-10'>내용</div>
        <div className='flex justify-end'>
          <button
            className='button-type4 mb-10'
=======
          <div className='tag-type3 red tb5'>
            <span>공지</span>
          </div>
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

        <div className='tb2 mt-5'>
          <span>오늘 공부한 내용 정리해서 올립니다!</span>
        </div>
        <div className='flex space-x-6 items-center my-10 justify-between'>
          <div className='flex justify-center items-center'>
            <button
              className='w-15 h-15 rounded-full bg-gray-300 mr-5'
              onClick={handleGoToPr}
            ></button>
            <button className='tm2 ' onClick={handleGoToPr}>
              닉네임
            </button>
          </div>

          <div>
            <span className='text-[#111111] opacity-50 mr-3'>2025-07-02</span>
          </div>
        </div>
        <div
          className='w-full h-[600px] my-10 border-[1px] rounded-[10px] p-5'
          style={{ borderColor: 'var(--color-border3)' }}
        >
          내용
        </div>
        <div className='flex justify-end'>
          <button
            className='button-type4 mb-10 hover:bg-[#292929]'
>>>>>>> dev
            onClick={() => setIsOpen(true)}
          >
            AI 퀴즈 풀기
          </button>
        </div>
        <div className='w-[898px]'>
          <WriteComment />
        </div>
        <div className='w-[898px]'>
          <Comment />
        </div>
        {isOpen && (
          <Modal
            title=''
            onClose={() => setIsOpen(false)}
<<<<<<< HEAD
            className='w-[680px] h-[450px]'
=======
            className='w-[680px] h-auto'
>>>>>>> dev
          >
            <div className='w-full'>
              <div className='p-3'>
                <span>
                  Q.HTML은 프로그래밍 언어이다. Q.HTML은 프로그래밍 언어이다.
                  Q.HTML은 프로그래밍 언어이다. Q.HTML은 프로그래밍 언어이다.
                </span>
              </div>
              <div className=' flex justify-between py-10'>
<<<<<<< HEAD
                <button>
                  <ChevronLeft />
                </button>
                <button>
=======
                <button className='flex w-10 h-10 rounded-full justify-center items-center hover:bg-[#f5f5f5]'>
                  <ChevronLeft />
                </button>
                <button className='flex w-10 h-10 rounded-full justify-center items-center hover:bg-[#f5f5f5]'>
>>>>>>> dev
                  <ChevronRight />
                </button>
              </div>
              <div className='flex justify-center items-center mx-auto space-x-5 py-2'>
                <button
<<<<<<< HEAD
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px]'
                  style={{ borderColor: "var(--color-border3)" }}
=======
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px] hover:bg-[#f5f5f5]'
                  style={{ borderColor: 'var(--color-border3)' }}
>>>>>>> dev
                >
                  <span className='text-[#90CFF1] font-bold text-[70px]'>
                    O
                  </span>
                </button>
                <button
<<<<<<< HEAD
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px]'
                  style={{ borderColor: "var(--color-border3)" }}
=======
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px] hover:bg-[#f5f5f5]'
                  style={{ borderColor: 'var(--color-border3)' }}
>>>>>>> dev
                >
                  <span className='text-[#FBAE8F] font-bold text-[70px] mx-auto'>
                    X
                  </span>
                </button>
              </div>
              <span className='flex tm3 justify-end'>2/3</span>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
