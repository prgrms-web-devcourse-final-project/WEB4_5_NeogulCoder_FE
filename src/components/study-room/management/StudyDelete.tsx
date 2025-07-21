'use client';

import { useState, useTransition } from 'react';
import StudyDeleteCheckModal from './StudyDeleteCheckModal';
import { deleteStudy } from '@/lib/api/study.api';
import { useRouter } from 'next/navigation';

export default function StudyDelete({ studyId }: { studyId: number }) {
  const router = useRouter();
  const [checkModal, setCheckModal] = useState(false);
  const checkModalClose = () => {
    setCheckModal(false);
  };
  const checkModalOpen = () => {
    setCheckModal(true);
  };

  const [isPending, startTransition] = useTransition();

  const fetchDeleteStudy = async () => {
    startTransition(async () => {
      try {
        await deleteStudy(studyId);
      } catch (error) {
        console.error('스터디 연장정보를 불러오지 못했습니다', error);
      } finally {
        router.push('/');
      }
    });
  };

  return (
    <div className='mb-24'>
      <div className='flex justify-between mb-6 pb-6 border-border1 border-b'>
        <h3 className='tb3 leading-none'>스터디 삭제</h3>
      </div>
      <div className='flex justify-between items-center '>
        <p className='t4 leading-none mt-1 text-red'>
          스터디 종료일자 7일 이내로 스터디 연장을 하실 수 있습니다.
        </p>
        <button className='button-type2' onClick={checkModalOpen}>
          <span>스터디 연장</span>
        </button>
      </div>

      {checkModal && (
        <StudyDeleteCheckModal
          checkModalClose={checkModalClose}
          fetchDeleteStudy={fetchDeleteStudy}
          isPending={isPending}
        />
      )}
    </div>
  );
}
