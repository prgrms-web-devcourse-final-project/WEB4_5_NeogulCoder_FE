'use client';
import { postDelegate } from '@/lib/api/study.api';
import { userAuthStore } from '@/stores/userStore';
import axios from 'axios';
import Image from 'next/image';
import { useTransition } from 'react';
import defaultUserProfileImage from '@/assets/images/basic-bunny.svg';
import { useRouter } from 'next/navigation';
import { useStudyStore } from '@/stores/studyInfoStore';
import { Crown } from 'lucide-react';
import { toast } from 'react-toastify';

export default function MemberCard({
  member,
  studyId,
}: {
  member: StudyMemberType;
  studyId: number;
}) {
  const router = useRouter();
  const authId = userAuthStore().user?.id;
  const setLeader = useStudyStore().setLeader;
  const [isPending, startTransition] = useTransition();
  const handleDelegate = (newLeaderId: number) => {
    startTransition(async () => {
      try {
        await postDelegate(studyId, newLeaderId);
        setLeader(false);
        router.push(`/study/${studyId}/dashboard`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.';
          console.error(message);
          toast.error('오류가 발생했습니다.');
        }
      }
    });
  };

  if (!authId) return;

  return (
    <>
      <div className='w-full flex flex-col lg:flex-row items-center justify-between border border-border1 rounded-[10px] gap-2 lg:gap-0 px-3 lg:px-4 py-3'>
        <div className='flex flex-col lg:flex-row items-center gap-0 lg:gap-3'>
          <div className='w-9 h-9 lg:w-10 lg:h-10 overflow-hidden rounded-full border border-border1 shrink-0'>
            <Image
              src={member.profileImageUrl ?? defaultUserProfileImage}
              width={40}
              height={0}
              alt={`${member.nickname} 프로필 이미지`}
              loading='lazy'
            />
          </div>
          <div className='leading-none mt-1 text-sm md:text-base'>
            {member.nickname}
          </div>
        </div>
        {member.userId === authId ? (
          <div className=' flex items-center gap-1 lg:gap-2 t5 text-gray5'>
            나
            <Crown className='text-[#FBE175] w-3.5 h-3.5 lg:w-5 lg:h-5' />
          </div>
        ) : (
          <div className='flex gap-x-1.5 shrink-0'>
            <button
              className='inline-flex items-center justify-center t5 px-1.5 lg:py-1 py-0.5 text-gray1 border border-gray1 rounded-md'
              onClick={() => handleDelegate(member.userId)}
              disabled={isPending}
            >
              스터디장 위임
            </button>
          </div>
        )}
      </div>
    </>
  );
}
