"use client";

import { ChevronLeft, EllipsisVertical, Tally1 } from "lucide-react";
import Comment from "@/components/common/Comment";
import WriteComment from "@/components/common/WriteComment";
import Modal from "@/components/common/Modal";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [appIsOpen, setAppIsOpen] = useState(false);

  return (
    <>
      <div className='w-[852px] mx-auto'>
        <div className='fixed flex flex-col right-[15%] space-y-2.5'>
          <button
            onClick={() => setIsOpen(true)}
            className='w-[118px] h-[44px] bg-[#00C471] text-white tm1 rounded-[10px]'
          >
            모집 중
          </button>
          <button
            onClick={() => setAppIsOpen(true)}
            className='w-[118px] h-[44px] border-[1px] bg-white tm1 rounded-[10px]'
            style={{ borderColor: "var(--color-gray2)" }}
          >
            신청 내역
          </button>
        </div>
        <div className='flex justify-between'>
          <button>
            <ChevronLeft />
          </button>
          <button>
            <EllipsisVertical />
          </button>
        </div>
        <div className='mt-10'>
          <span className='text-[28px] font-bold'>
            너굴코더에서 프로젝트 같이 진행하실 웹 백엔드와 디자이너를 모집 중에
            있습니다!
          </span>
        </div>
        <div className='flex space-x-6 items-center my-10'>
          <div className='w-15 h-15 rounded-full bg-gray-300 mr-5'></div>
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
        <div className='space-y-10'>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm1 opacity-50'>시작 날짜</span>
              <span className='tm1'>2025-07-05</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm1 opacity-50'>종료 날짜</span>
              <span className='tm1'>2025-08-06</span>
            </div>
          </div>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm1 opacity-50 '>모집 인원</span>
              <span className='tm1'>9명</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm1 opacity-50'>카테고리</span>
              <span className='tm1'>IT</span>
            </div>
          </div>
          <div className='flex space-x-12'>
            <div className='flex w-[400px]'>
              <span className='mr-8 tm1 opacity-50'>진행 방식</span>
              <span className='tm1'>온/오프라인</span>
            </div>
            <div className='flex w-[400px]'>
              <span className=' mr-8 tm1 opacity-50'>지역</span>
              <span className='tm1'>서울</span>
            </div>
          </div>
          <div className='flex w-[400px]'>
            <span className='mr-8 tm1 opacity-50'>모집 마감일</span>
            <span className='tm1'>2025-08-06</span>
          </div>
        </div>
        <hr
          className='h-0.5 my-10'
          style={{ borderColor: "var(--color-border2)" }}
        />
        <div className='w-full h-[600px] mb-10'>내용</div>
        <div className='w-[852px]'>
          <WriteComment />
        </div>
        <div className='w-[852px]'>
          <Comment />
        </div>
        {isOpen && (
          <Modal
            title=''
            className='w-[1020px] h-[800px]'
            onClose={() => setIsOpen(false)}
          >
            <div className='rounded-[10px] px-10 w-full'>
              <div className='flex justify-between w-full'>
                <div className='flex space-x-6 items-center mb-10'>
                  <div className='w-15 h-15 rounded-full bg-gray-300 mr-5'></div>
                  <div className='tm2'>닉네임</div>
                  <div>토끼</div>
                  <div className='text-[#111111] opacity-50'>60%</div>
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
                style={{ borderColor: "var(--color-border3)" }}
              >
                지원 동기는 어쩌구 저쩌구입니다.
              </div>
              <div className='flex space-x-[15px] justify-end'>
                <button className='w-[100px] h-11 rounded-md text-white tm3 bg-[#B2B2B2]'>
                  거절
                </button>
                <button
                  className='w-[100px] h-11 rounded-md text-white tm3'
                  style={{ background: "var(--color-blue)" }}
                >
                  승인
                </button>
              </div>
              <hr
                className='h-0.5 my-10'
                style={{ borderColor: "var(--color-border2)" }}
              />
            </div>
          </Modal>
        )}
        {appIsOpen && (
          <Modal
            title='모집 신청하기'
            className='w-[1020px] h-[700px]'
            onClose={() => setAppIsOpen(false)}
          >
            <div
              className='w-full h-[440px] border-[1px] p-5  my-10 rounded-[6px]'
              style={{ borderColor: "var(--color-border3)" }}
            >
              <span>지원 동기를 입력해주세요</span>
            </div>
            <div className='flex justify-end '>
              <button className='button-type6 mr-[15px]'>취소</button>
              <button className='button-type5'>확인</button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
