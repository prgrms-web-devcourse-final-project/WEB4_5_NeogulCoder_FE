'use client';

import MyEditor from '@/components/common/Editor';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RegionModal from '@/components/profile/pr/RegionModal';

export default function EditPr() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'정보' | '소개글'>('정보');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('지역');
  const isSelectedRegion = selectedRegion !== '지역';

  const handleGoToPr = () => {
    router.push('/profile/pr');
  };
  return (
    <>
      <div className='tb2 mb-[30px]'>PR 작성 및 수정</div>
      <div className='flex items-center gap-5 mb-[35px]'>
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
          className={`tm4 w-[60px] h-[36px] rounded-full flex items-center justify-center  ${
            activeTab === '소개글'
              ? 'bg-main text-white'
              : 'text-text1/50 border border-main/10'
          }`}
        >
          소개글
        </button>
      </div>
      {activeTab === '정보' && (
        <div className='flex flex-col gap-[35px] relative'>
          <div>
            <p className='pb-2 t4'>지역</p>
            <button
              type='button'
              className={`w-[200px] h-[45px] rounded-[10px] flex items-center justify-between p-5 border t4 ${
                isSelectedRegion
                  ? 'text-text1 tm3 border-main'
                  : 'border-main/10 text-text1/50'
              }`}
              onClick={() => setIsOpenModal((prev) => !prev)}
            >
              <p>{selectedRegion}</p>
              <ChevronDown className='w-4 h-4' />
            </button>
          </div>
          {isOpenModal && (
            <div className='absolute top-20 z-10'>
              <RegionModal
                onSelect={(region: string) => {
                  setSelectedRegion(region);
                  setIsOpenModal(false);
                }}
              />
            </div>
          )}

          <div>
            <p className='pb-2 t4'>URL</p>
            <div className='flex'>
              <input
                type='text'
                placeholder='이름 1'
                className='input-type1 w-[200px] focus:outline-1 focus:outline-main'
              />
              <input
                type='text'
                placeholder='URL 1'
                className='input-type1 w-full focus:outline-1 focus:outline-main ml-3'
              />
            </div>
            <div className='mt-4 flex'>
              <input
                type='text'
                placeholder='이름 2'
                className='input-type1 w-[200px] focus:outline-1 focus:outline-main'
              />
              <input
                type='text'
                placeholder='URL 2'
                className='input-type1 w-full focus:outline-1 focus:outline-main ml-3'
              />
            </div>
          </div>
        </div>
      )}
      {activeTab === '소개글' && <MyEditor />}

      <div className='flex gap-5 mt-5 justify-end'>
        <button
          type='button'
          className='border border-main h-[44px] w-[100px] rounded-md hover:bg-[#f5f5f5]'
          onClick={handleGoToPr}
        >
          취소
        </button>
        <button type='button' className='button-type5 hover:bg-[#292929]'>
          저장
        </button>
      </div>
    </>
  );
}
