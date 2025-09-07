import Image from 'next/image';
import { useEffect, useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { userPrStore } from '@/stores/prStore';
import basicBunny from '@/assets/images/basic-bunny.svg';

export default function FeedbackSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const { pr } = userPrStore();
  if (!pr) return null;

  return (
    <>
      <div className='lg:h-[260px] lg:border lg:border-main/10 lg:rounded-[10px] p-5 flex flex-col'>
        <div className='flex justify-between items-center'>
          <p className='tm3'>피드백</p>
          {pr.reviewContents.length > 0 && (
            <button
              type='button'
              className='text-text1/30 cursor-pointer t5'
              onClick={() => setIsModalOpen(true)}
            >
              더보기
            </button>
          )}
        </div>
        <hr className='block lg:hidden w-full border-t border-gray-200 mt-2 mb-8' />

        {pr.reviewContents.length === 0 ? (
          <div className='flex flex-1 justify-center items-center text-text1/50 t4'>
            받은 피드백이 없습니다
          </div>
        ) : (
          <div className='flex flex-1 items-center'>
            <div className='flex flex-col gap-2 lg:w-full lg:h-[120px] lg:border lg:border-main/10 lg:rounded-[10px] lg:p-4'>
              <div className='flex gap-3 items-center w-full'>
                <div className='w-[50px] h-[50px] bg-white rounded-full overflow-hidden flex-shrink-0 border border-border1'>
                  <Image
                    src={pr.reviewContents[0]?.reviewUserImgUrl ?? basicBunny}
                    alt='유저 프로필'
                    width={50}
                    height={50}
                  />
                </div>

                <div className='flex flex-col justify-center'>
                  <p className='tm4'>
                    {pr.reviewContents[0]?.reviewUserNickname}
                  </p>
                  <p className='t5 text-text1/50'>
                    {pr.reviewContents[0]?.reviewDate}
                  </p>
                </div>
              </div>

              <p className='t4 text-text1 pl-[62px]'>
                {pr.reviewContents[0]?.reviewComment}
              </p>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-main opacity-80' />
            <div className='relative z-10'>
              <FeedbackModal onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
