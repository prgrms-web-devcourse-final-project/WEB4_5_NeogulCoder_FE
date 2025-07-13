'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';

export default function SubmitScheduleModal({
  submitUsers,
  closeHandler,
}: {
  submitUsers: {
    image: string;
    name: string;
    submitted: boolean;
  }[];
  closeHandler: () => void;
}) {
  return (
    <>
      <div className="bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center">
        <div className="w-[517px] flex flex-col gap-6 px-9 py-7 rounded-[10px] bg-white drop-shadow-md">
          <div className="flex justify-between">
            <span className="tm1">제출 현황</span>
            <button onClick={closeHandler}>
              <X className="w-8 y-8" />
            </button>
          </div>
          <div className="flex flex-col gap-3 px-1">
            {submitUsers.map((user, i) => (
              <div
                key={i}
                className="w-full flex justify-between items-center px-4 py-2 rounded-[6px] border border-border3"
              >
                <div className="flex gap-3 items-center">
                  <Image
                    src={user.image ? user.image : musicBunny}
                    alt="사용자 이미지"
                    className="w-[34px] h-[34px] rounded-[50%] border border-border1"
                  />
                  <span>{user.name}</span>
                </div>
                {user.submitted ? (
                  <span className="tm3 text-green">제출완료</span>
                ) : (
                  <span className="tm3 text-red">제출미완료</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
