'use client';
import Modal from '@/components/common/Modal';
import CreateStudyModal from '@/components/study/CreateStudyModal';
import { useState } from 'react';

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

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          className='w-[680px] h-[700px]'
          title='스터디 생성'
        >
          <CreateStudyModal />
        </Modal>
      )}
    </>
  );
}
