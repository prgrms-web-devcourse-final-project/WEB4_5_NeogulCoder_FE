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

  return (
    <>
      <div className='w-[898px] mx-auto'>
        <div className='flex justify-between'>
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
            className='w-[680px] h-[450px]'
          >
            <div className='w-full'>
              <div className='p-3'>
                <span>
                  Q.HTML은 프로그래밍 언어이다. Q.HTML은 프로그래밍 언어이다.
                  Q.HTML은 프로그래밍 언어이다. Q.HTML은 프로그래밍 언어이다.
                </span>
              </div>
              <div className=' flex justify-between py-10'>
                <button>
                  <ChevronLeft />
                </button>
                <button>
                  <ChevronRight />
                </button>
              </div>
              <div className='flex justify-center items-center mx-auto space-x-5 py-2'>
                <button
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px]'
                  style={{ borderColor: "var(--color-border3)" }}
                >
                  <span className='text-[#90CFF1] font-bold text-[70px]'>
                    O
                  </span>
                </button>
                <button
                  className='w-[200px] h-[104px] border-[1px] rounded-[10px]'
                  style={{ borderColor: "var(--color-border3)" }}
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
