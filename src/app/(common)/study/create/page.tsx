<<<<<<< HEAD
"use client";
import Modal from "@/components/common/Modal";
import { ChevronDown, Camera } from "lucide-react";
import { useState } from "react";
=======
'use client';
import Modal from '@/components/common/Modal';
import CreateStudyModal from '@/components/study/CreateStudyModal';
import { useState } from 'react';
>>>>>>> dev

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='w-[120px] h-[50px] bg-[#00C471] text-white tm1 rounded-[10px]'
      >
        스터디 생성
      </button>

<<<<<<< HEAD
      <div className='w-[920px]  mx-auto'>
        {isOpen && (
          <Modal
            onClose={() => setIsOpen(false)}
            className='w-[680px] h-[700px]'
            title='스터디 생성'
          >
            <div className='relative w-fit mx-auto my-10'>
              <button>
                <div className='w-25 h-25 rounded-full bg-gray-300'></div>

                <div className='w-[30px] h-[30px] rounded-full bg-[#111111] absolute bottom-0 right-0 flex justify-center items-center'>
                  <Camera color='#FFFFFF' size={18} />
                </div>
              </button>
            </div>
            <div className='flex flex-col w-full'>
              <div>
                <span className='tm-0 mb-2.5'>이름 </span>
                <span className='tm5 text-[#ff5955]'>(필수)</span>
              </div>
              <input
                className='border-[1px]  h-15 rounded-[10px] p-5 mb-10'
                placeholder='이름을 입력해주세요'
                style={{ borderColor: "var(--color-border3)" }}
              ></input>
            </div>
            <div className='flex space-x-5'>
              <div className='flex flex-col w-full'>
                <div>
                  <span className='tm-0 mb-2.5'>시작 날짜 </span>
                  <span className='tm5 text-[#ff5955]'>(필수)</span>
                </div>
                <input
                  type='date'
                  className='border-[1px]  h-15 rounded-[10px] p-5 mb-10'
                  style={{ borderColor: "var(--color-border3)" }}
                ></input>
              </div>
              <div className='flex flex-col w-full'>
                <div>
                  <span className='tm-0 mb-2.5'>종료 날짜 </span>
                  <span className='tm5 text-[#ff5955]'>(필수)</span>
                </div>
                <input
                  type='date'
                  className='border-[1px]  h-15 rounded-[10px] p-5 mb-10'
                  style={{ borderColor: "var(--color-border3)" }}
                ></input>
              </div>
            </div>
            <div className='flex space-x-5'>
              <div className='flex flex-col w-full mb-10'>
                <div>
                  <span className='tm-0 mb-2.5'>인원 수 </span>
                  <span className='tm5 text-[#ff5955]'>(필수)</span>
                </div>
                <div className='relative inline-block w-full '>
                  <input
                    className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                    name='PersonCount'
                    placeholder='인원 수를 입력해주세요'
                    style={{ borderColor: "var(--color-border3)" }}
                  ></input>
                </div>
              </div>
              <div className='flex flex-col w-full mb-10'>
                <div>
                  <span className='tm-0 mb-2.5'>카테고리 </span>
                  <span className='tm5 text-[#ff5955]'>(필수)</span>
                </div>
                <div className='relative inline-block w-full '>
                  <select
                    className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                    name='selectedRecruitmentCategory'
                    defaultValue=''
                    style={{ borderColor: "var(--color-border3)" }}
                  >
                    <option value='' disabled hidden>
                      카테고리
                    </option>
                    <option value='category0'>어학</option>
                    <option value='category1'>IT</option>
                    <option value='category2'>고시/자격증</option>
                    <option value='category3'>금융</option>
                    <option value='category4'>경영</option>
                    <option value='category5'>디자인</option>
                    <option value='category6'>예술</option>
                    <option value='category7'>사진/영상</option>
                    <option value='category8'>뷰티</option>
                    <option value='category9'>스포츠</option>
                    <option value='category10'>취미</option>
                    <option value='category10'>기타</option>
                  </select>

                  <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex space-x-5 '>
              <div className='flex flex-col w-full mb-10'>
                <div>
                  <span className='tm-0 mb-2.5'>진행 방식 </span>
                  <span className='tm5 text-[#ff5955]'>(필수)</span>
                </div>
                <div className='relative inline-block w-full '>
                  <select
                    className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                    name='selectedRecruitmentPerson'
                    defaultValue=''
                    style={{ borderColor: "var(--color-border3)" }}
                  >
                    <option value='' disabled hidden>
                      진행 방식
                    </option>
                    <option value='online'>온라인</option>
                    <option value='offline'>오프라인</option>
                    <option value='onofflune'>온/오프라인</option>
                  </select>

                  <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div className='flex flex-col w-full mb-10'>
                <div>
                  <span className='tm-0 mb-2.5'>지역</span>
                </div>
                <div className='relative inline-block w-full '>
                  <select
                    className='w-full h-[60px] border-[1px]  pl-4 pr-10 appearance-none rounded-[10px] '
                    name='selectedRecruitmentPerson'
                    defaultValue=''
                    style={{ borderColor: "var(--color-border3)" }}
                  >
                    <option value='' disabled hidden>
                      지역
                    </option>
                    <option value='country0'>서울</option>
                    <option value='country1'>부산</option>
                    <option value='country2'>대구</option>
                    <option value='country3'>인천</option>
                    <option value='country4'>광주</option>
                    <option value='country5'>대전</option>
                    <option value='country6'>울산</option>
                    <option value='country7'>세종</option>
                    <option value='country8'>경기도</option>
                    <option value='country9'>충청북도</option>
                    <option value='country10'>충청남도</option>
                    <option value='country11'>전라북도</option>
                    <option value='country12'>전라남도</option>
                    <option value='country13'>경상북도</option>
                    <option value='country14'>경상남도</option>
                    <option value='country15'>강원도</option>
                    <option value='country16'>제주도</option>
                  </select>

                  <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full'>
              <span className='tm-0 mb-2.5'>스터디 한 줄 소개</span>
              <textarea
                className='border-[1px]  h-[90px] rounded-[10px] p-2 mb-10'
                placeholder='스터디 한 줄 소개를 입력해주세요'
                style={{ borderColor: "var(--color-border3)" }}
              ></textarea>
            </div>
            <button className='button-modal1'>등록</button>
          </Modal>
        )}
      </div>
=======
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          className='w-[680px] h-[700px]'
          title='스터디 생성'
        >
          <CreateStudyModal />
        </Modal>
      )}
>>>>>>> dev
    </>
  );
}
