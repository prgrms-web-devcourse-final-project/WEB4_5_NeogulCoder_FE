'use client';
import { useState } from 'react';

export default function EditPr() {
  const [activeTab, setActiveTab] = useState<'정보' | '소개글'>('정보');
  return (
    <>
      <div className="tm1 mb-[34px]">PR 수정</div>
      <div className="flex items-center gap-5">
        <button
          onClick={() => setActiveTab('정보')}
          className={`tm4 w-[60px] h-[36px] rounded-full flex items-center justify-center ${
            activeTab === '정보'
              ? 'bg-main text-white'
              : 'text-text1/50 border border-main/10'
          }`}
        >
          정보
        </button>

        <button
          onClick={() => setActiveTab('소개글')}
          className={`tm4 w-[60px] h-[36px] rounded-full flex items-center justify-center ${
            activeTab === '소개글'
              ? 'bg-main text-white'
              : 'text-text1/50 border border-main/10'
          }`}
        >
          소개글
        </button>
      </div>
      {activeTab === '정보' && (
        <div className="flex flex-col mt-[35px] gap-[35px]">
          <div>
            <p className="pb-2 t4">지역</p>
            <input
              type="text"
              placeholder="지역 선택"
              className="input-type1 focus:outline-2 focus:outline-main"
            />
          </div>

          <div>
            <p className="pb-2 t4">URL</p>

            <div className="flex">
              <input
                type="text"
                placeholder="이름 1"
                className="input-type1 focus:outline-2 focus:outline-main"
              />
              <input
                type="text"
                placeholder="URL 1"
                className="input-type1 w-full focus:outline-2 focus:outline-main ml-[12px]"
              />
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                placeholder="이름 2"
                className="input-type1 focus:outline-2 focus:outline-main"
              />
              <input
                type="text"
                placeholder="URL 2"
                className="input-type1 w-full focus:outline-2 focus:outline-main ml-3"
              />
            </div>
            <div className="flex gap-5 mt-[30px] justify-end">
              <button
                type="button"
                className="border border-main h-11 w-[100px] rounded-md"
              >
                취소
              </button>
              <button type="button" className="button-type5">
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
