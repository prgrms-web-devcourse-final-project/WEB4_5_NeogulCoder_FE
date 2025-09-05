'use client';

import { useState, useTransition } from 'react';
import StudyDeleteCheckModal from './StudyDeleteCheckModal';
import { deleteStudy } from '@/lib/api/study.api';
import { useRouter } from 'next/navigation';
import { useStudiesStore } from '@/stores/useStudiesStore';
import { toast } from 'react-toastify';

export default function StudyDelete({ studyId }: { studyId: number }) {
  const router = useRouter();
  const deleteStudies = useStudiesStore().deleteStudy;
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
        toast.success('스터디를 삭제 했습니다.');
        router.push('/');
        deleteStudies(studyId);
      } catch (error) {
        toast.error(`스터디 삭제 실패 ${error}`);
        console.error('스터디 삭제 실패', error);
      }
    });
  };

  return (
    <div className='mb-10 lg:mb-24'>
      <div className='flex justify-between mb-4 pb-4 lg:mb-6 lg:pb-6 border-border1 border-b'>
        <h3 className='tb3 leading-none'>스터디 삭제</h3>
      </div>
      <div className='flex justify-between items-center gap-4'>
        <p className='t4 leading-none mt-1 text-red'>
          현재 스터디를 삭제하면 되돌릴 수 없습니다.
        </p>
        <button className='button-type2' onClick={checkModalOpen}>
          <span>스터디 삭제</span>
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
