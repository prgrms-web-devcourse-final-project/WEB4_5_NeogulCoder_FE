'use client';

import { useEffect, useState } from 'react';
import StudyRoomExtendWrite from './StudyRoomExtendWrite';
import { getStudyExtendInfo } from '@/lib/api/study.api';

export default function StudyExtend({
  endDate,
  studyId,
}: {
  endDate: string;
  studyId: number;
}) {
  const [extendModal, setExtendModal] = useState(false);
  const [studyExtendInfo, setStudyExtendInfo] = useState<StudyExtendType>();

  const extendModalClose = () => {
    setExtendModal(false);
  };

  const extendModalOpen = () => {
    setExtendModal(true);
  };

  useEffect(() => {
    const fetchStudyExtendCheck = async () => {
      try {
        const { data } = await getStudyExtendInfo(studyId);
        setStudyExtendInfo(data);
      } catch (error) {
        console.error('스터디 연장정보를 불러오지 못했습니다', error);
      }
    };

    fetchStudyExtendCheck();
  }, [studyId]);

  const handleExtend = () => {
    setStudyExtendInfo((prev) => {
      if (!prev) return prev; // 또는 return undefined;
      return {
        ...prev,
        extended: true,
      };
    });
  };
  return (
    <>
      <div className='flex justify-between mb-6 pb-6 border-border1 border-b'>
        <h3 className='tb3 leading-none'>스터디 연장</h3>
      </div>
      {/* 한번 연장한 스터디는 다시 연장 할 수 없음 */}
      {studyExtendInfo && studyExtendInfo.extended ? (
        <div className='flex justify-between items-center '>
          <p className='t4 leading-none mt-1 text-red'>
            이미 스터디를 연장 하셨습니다.
          </p>
        </div>
      ) : (
        <div className='flex justify-between items-center '>
          <p className='t4 leading-none mt-1 text-red'>
            스터디 종료일자 7일 이내로 스터디 연장을 하실 수 있습니다.
          </p>
          <button className='button-type2' onClick={extendModalOpen}>
            <span>스터디 연장</span>
          </button>
        </div>
      )}
      {extendModal && (
        <StudyRoomExtendWrite
          endDate={endDate}
          closeFn={extendModalClose}
          studyId={studyId}
          handleExtend={handleExtend}
        />
      )}
    </>
  );
}
