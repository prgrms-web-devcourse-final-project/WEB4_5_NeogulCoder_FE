'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import RegionModal from '@/components/common/RegionModal';
import { userPrStore } from '@/stores/prStore';
import { toast } from 'react-toastify';
import { ChevronDown } from 'lucide-react';

import axiosInstance from '@/lib/api/axiosInstance';
import dynamic from 'next/dynamic';
const IntroductionEditor = dynamic(
  () => import('@/components/profile/pr/IntroEditor'),
  {
    ssr: false,
  }
);

export default function EditPrClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'정보' | '소개글'>('정보');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const isSelectedRegion = !!selectedRegion;
  const [urlErrorMsg, setUrlErrorMsg] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const urlInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [prUrls, setPrUrls] = useState([
    { urlName: '', prUrl: '' },
    { urlName: '', prUrl: '' },
  ]);

  const [introduction, setIntroduction] = useState('');
  const { pr, fetchMyPr } = userPrStore();

  // PR 정보 불러오기
  useEffect(() => {
    fetchMyPr();
  }, [fetchMyPr]);

  useEffect(() => {
    if (pr && !initialized) {
      setSelectedRegion(pr.userLocationAndLinks?.[0]?.location || null);

      const links =
        pr.userLocationAndLinks?.[0]?.links.map((link) => ({
          urlName: link.linkName,
          prUrl: link.link,
        })) || [];

      const filledLinks = [...links];
      while (filledLinks.length < 2) {
        filledLinks.push({ urlName: '', prUrl: '' });
      }
      setPrUrls(filledLinks);
      setIntroduction(pr.introduction || '');
      setInitialized(true);
    }
  }, [pr, initialized]);

  // URL 유효성 검사
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleGoToPr = async () => {
    await fetchMyPr();
    router.back();
  };

  const handleSave = async () => {
    for (let i = 0; i < prUrls.length; i++) {
      const url = prUrls[i].prUrl;
      if (url && !isValidUrl(url)) {
        setUrlErrorMsg(`URL ${i + 1} 형식이 올바르지 않습니다.`);
        urlInputRefs[i].current?.focus();
        return;
      }
    }
    setUrlErrorMsg('');

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const filteredUrls = [...prUrls];

      while (filteredUrls.length < 2) {
        filteredUrls.push({ urlName: '', prUrl: '' });
      }
      await axiosInstance.put('/api/template/update/template', {
        location: selectedRegion,
        prUrls: filteredUrls,
      });

      await axiosInstance.put('/api/template/update/introduction', {
        introduction,
      });
      toast.success('저장이 완료되었습니다.');
      router.back();
    } catch (error) {
      console.error('저장 실패: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className='hidden tb3 mb-[30px] lg:block'>PR 작성 및 수정</div>
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
              className={`w-full h-[45px] rounded-[10px] flex items-center justify-between p-5 border t4 lg:w-[200px] ${
                isSelectedRegion
                  ? 'text-text1 tm3 border-main'
                  : 'border-main/10 text-text1/50'
              }`}
              onClick={() => setIsOpenModal((prev) => !prev)}
            >
              <p>{selectedRegion || '지역을 등록해 주세요.'}</p>
              <ChevronDown className='w-4 h-4' />
            </button>
          </div>
          {isOpenModal && (
            <>
              <div className='hidden lg:block absolute top-20 z-10'>
                <RegionModal
                  selectedRegion={selectedRegion}
                  onSelect={(region) => {
                    setSelectedRegion(region);
                    setIsOpenModal(false);
                  }}
                />
              </div>

              <div
                className={` fixed bottom-0 left-0 w-full h-[35vh] bg-white rounded-t-[20px] p-5 z-50 transform transition-transform duration-300 ${
                  isOpenModal ? 'translate-y-0' : 'translate-y-full'
                } lg:hidden drop-shadow-2xl`}
              >
                <RegionModal
                  selectedRegion={selectedRegion}
                  onSelect={(region) => {
                    setSelectedRegion(region);
                    setIsOpenModal(false);
                  }}
                />
              </div>
            </>
          )}

          <div>
            <p className='pb-2 t4'>URL</p>
            {[0, 1].map((i) => (
              <div
                className='mt-4 flex flex-col gap-1 items-start lg:flex-row'
                key={i}
              >
                <div className='flex flex-col w-full lg:w-[200px]'>
                  <input
                    type='text'
                    placeholder={`이름 ${i + 1}`}
                    value={prUrls[i].urlName ?? ''}
                    onChange={(e) => {
                      const updated = [...prUrls];
                      updated[i].urlName = e.target.value;
                      setPrUrls(updated);
                    }}
                    className='input-type1 focus:outline-1 focus:outline-main w-full lg:w-[200px]'
                  />
                </div>
                <input
                  ref={urlInputRefs[i]}
                  type='url'
                  placeholder={`URL ${i + 1}`}
                  value={prUrls[i].prUrl ?? ''}
                  onChange={(e) => {
                    const updated = [...prUrls];
                    updated[i].prUrl = e.target.value;
                    setPrUrls(updated);
                  }}
                  className='input-type1 w-full focus:outline-1 focus:outline-main lg:ml-3'
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === '소개글' && (
        <IntroductionEditor value={introduction} onChange={setIntroduction} />
      )}

      <p
        className={`text-red-500 t5 mt-5 h-5 ${urlErrorMsg ? '' : 'invisible'}`}
      >
        {urlErrorMsg || '\u00A0'}
      </p>

      <div className='flex gap-5 mt-10 justify-center lg:justify-end '>
        <button
          type='button'
          className='hidden border border-main h-[44px] w-[100px] rounded-md hover:bg-[#f5f5f5] lg:block'
          onClick={handleGoToPr}
        >
          취소
        </button>
        <button
          type='button'
          className='button-type5 hover:bg-[#292929] !w-full lg:!w-[100px]'
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </>
  );
}
