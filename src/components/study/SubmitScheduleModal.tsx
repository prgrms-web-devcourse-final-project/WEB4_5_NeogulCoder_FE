'use client';

// import { CircleCheck, CircleX, X } from 'lucide-react';
import Image from 'next/image';
// import musicBunny from '@/assets/images/music-bunny.svg';
import basicBunny from '@/assets/images/basic-bunny.svg';
import { TimeVoteSubmissionsType } from '@/types/schedule';
import dynamic from 'next/dynamic';

const CircleCheck = dynamic(
  () => import('lucide-react').then((m) => m.CircleCheck),
  { ssr: false }
);
const CircleX = dynamic(() => import('lucide-react').then((m) => m.CircleX), {
  ssr: false,
});
const X = dynamic(() => import('lucide-react').then((m) => m.X), {
  ssr: false,
});

export default function SubmitScheduleModal({
  timeVoteSubmissions,
  onClose,
}: {
  timeVoteSubmissions: TimeVoteSubmissionsType;
  onClose: () => void;
}) {
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='w-[517px] flex flex-col gap-6 px-9 py-7 rounded-[10px] bg-white drop-shadow-md'>
          <div className='flex justify-between'>
            <span className='tm2'>제출 현황</span>
            <button onClick={onClose}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div className='flex flex-col gap-3 px-1'>
            {timeVoteSubmissions.map((user) => (
              <div
                key={user.studyMemberId}
                className='w-full flex justify-between items-center px-4 py-2 rounded-[6px] border border-border3'
              >
                <div className='flex gap-3 items-center'>
                  <Image
                    src={
                      user.profileImageUrl ? user.profileImageUrl : basicBunny
                    }
                    alt='사용자 이미지'
                    width={34}
                    height={34}
                    priority
                    className='w-[34px] h-[34px] rounded-[50%] border border-border1'
                  />
                  <span className='t4'>{user.nickname}</span>
                </div>
                {user.submitted ? (
                  <CircleCheck className='text-green' />
                ) : (
                  <CircleX className='text-red' />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
