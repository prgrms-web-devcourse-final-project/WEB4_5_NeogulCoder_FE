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
          alert(message);
        }
      }
    });
  };

  if (!authId) return;

  return (
    <>
      <div className='w-full flex items-center justify-between border border-border1 rounded-[10px] px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 overflow-hidden rounded-full border border-border1 shrink-0'>
            <Image
              src={member.profileImageUrl ?? defaultUserProfileImage}
              width={40}
              height={0}
              alt={`${member.nickname} 프로필 이미지`}
              loading='lazy'
            />
          </div>
          <div className='leading-none mt-1'>{member.nickname}</div>
        </div>
        {member.userId === authId ? (
          <div className=' flex items-center gap-2 t5 text-gray5'>
            나
            <Crown className='text-[#FBE175] w-5 h-5' />
          </div>
        ) : (
          <div className='flex gap-x-1.5 shrink-0'>
            <button
              className='inline-flex items-center justify-center t5 px-1.5 py-1 text-gray1 border border-gray1 rounded-md'
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
