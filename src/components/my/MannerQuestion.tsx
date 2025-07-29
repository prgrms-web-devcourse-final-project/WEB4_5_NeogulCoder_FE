'use client';

import Image from 'next/image';
import excellent from '@/assets/images/excellent-stamp.svg';
import good from '@/assets/images/good-stamp.svg';
import bad from '@/assets/images/bad-stamp.svg';
import excellentGray from '@/assets/images/excellent-stamp-gray.svg';
import goodGray from '@/assets/images/good-stamp-gray.svg';
import badGray from '@/assets/images/bad-stamp-gray.svg';
import { useState } from 'react';
import { postReviews } from '@/lib/api/manners';
import { toast } from 'react-toastify';

type MannerOptionType = 'BAD' | 'GOOD' | 'EXCELLENT';

const MANNER_OPTIONS: Record<
  MannerOptionType,
  { title: string; items: string[] }
> = {
  BAD: {
    title: '어떤 점이 아쉬웠나요?',
    items: [
      '약속된 일정에 자주 늦거나 참여율이 낮았어요.',
      '소통이 원활하지 않아 협업에 어려움이 있었어요.',
      '역할에 대한 책임감이 부족해 보였어요.',
      '팀 작업보다 개인 일에 더 집중한 느낌이었어요.',
    ],
  },
  GOOD: {
    title: '어떤 점이 좋았나요?',
    items: [
      '주어진 역할은 무리 없이 잘 해냈어요.',
      '협업 중 큰 문제가 없어서 편하게 함께할 수 있었어요.',
      '일정에 맞춰 참여했고, 필요한 만큼 소통했어요.',
      '스터디 분위기를 잘 따라왔고, 팀에 잘 녹아들었어요.',
    ],
  },
  EXCELLENT: {
    title: '어떤 점이 최고였나요?',
    items: [
      '항상 먼저 도와주고 분위기를 이끌어주는 팀원이었어요.',
      '책임감이 넘치고 맡은 일 이상으로 기여해줘서 감동이었어요.',
      '꼼꼼하고 빠른 진행 덕분에 팀 전체가 수월하게 움직였어요.',
      '커뮤니케이션도 최고, 실력도 최고! 이런 팀원은 흔치 않아요.',
    ],
  },
};

const STAMP_ICONS = [
  {
    type: 'BAD',
    label: '별로예요',
    active: bad,
    inactive: badGray,
  },
  {
    type: 'GOOD',
    label: '좋아요',
    active: good,
    inactive: goodGray,
  },
  {
    type: 'EXCELLENT',
    label: '최고예요',
    active: excellent,
    inactive: excellentGray,
  },
] as const;

export default function MannerQuestion({
  currentStudyId,
  currentUserId,
  currentUserName,
  getUserList,
}: {
  currentStudyId: number;
  currentUserId: number;
  currentUserName: string;
  getUserList: (studyId: number) => Promise<void>;
}) {
  const [reviewType, setReviewType] = useState<MannerOptionType>('GOOD');
  const [reviewTag, setReviewTag] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const currentOption = MANNER_OPTIONS[reviewType];

  const handleTagToggle = (item: string, checked: boolean) => {
    setReviewTag((prev) =>
      checked ? [...prev, item] : prev.filter((tag) => tag !== item)
    );
  };

  const reset = () => {
    setReviewType('GOOD');
    setReviewTag([]);
    setContent('');
  };

  const handleSubmit = async () => {
    try {
      const data = await postReviews(
        currentStudyId,
        currentUserId,
        reviewType,
        reviewTag,
        content
      );
      console.log('제출 성공:', data);
      console.log({
        studyId: currentStudyId,
        targetUserId: currentUserId,
        reviewType,
        reviewTag,
        content,
      });
      toast.success('평가 완료되었습니다.');
      reset();
      await getUserList(currentStudyId);
    } catch (e) {
      console.error('제출 실패:', e);
      toast.error('오류가 발생했습니다. 다시 시도해주세요!');
    }
  };

  return (
    <>
      <div className='flex flex-col gap-[50px] mt-[30px]'>
        <div>
          <div className='flex gap-2 items-center'>
            <span className='tm3 text-text1'>
              {currentUserName}님과의 스터디는 어떠셨나요?
            </span>
            <span className='tm5 text-red'>*필수</span>
          </div>
          <div className='flex justify-around mt-[26px]'>
            {STAMP_ICONS.map(({ type, label, active, inactive }) => (
              <div
                key={type}
                className='flex flex-col justify-center items-center gap-3 w-[150px] h-[145px] bg-white rounded-[10px] cursor-pointer'
                onClick={() => {
                  setReviewType(type);
                  setReviewTag([]);
                }}
              >
                <Image
                  src={reviewType === type ? active : inactive}
                  alt={label}
                  priority
                />
                <span
                  className={`t3 ${
                    reviewType === type ? 'text-text1' : 'text-text1/20'
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className='flex gap-2 items-center'>
            <span className='tm3 text-text1'>{currentOption.title}</span>
            <span className='tm5 text-red'>*필수</span>
          </div>
          <div className='flex flex-col gap-6 mt-[26px]'>
            {currentOption.items.map((item, i) => {
              const inputId = `${reviewType}-${i + 1}`;
              return (
                <label
                  key={inputId}
                  htmlFor={inputId}
                  className='t3 flex items-center gap-5 cursor-pointer'
                >
                  <div className='relative text-[0px]'>
                    <input
                      id={inputId}
                      type='checkbox'
                      className='w-5 h-5 peer border border-border1 appearance-none rounded-sm checked:bg-main checked:border-main cursor-pointer'
                      onChange={(e) => handleTagToggle(item, e.target.checked)}
                    />
                    <span className='pointer-events-none absolute left-[7px] top-0.5 w-1.5 h-3 border-white border-r-2 border-b-2 rotate-45 opacity-0 peer-checked:opacity-100'></span>
                  </div>
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className='flex flex-col'>
          <span className='tm3 text-text1'>자세한 피드백을 남겨주세요!</span>
          <textarea
            id={`feedback-${currentStudyId}-${currentUserId}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='말 한 마디로 한 사람을 성장시킬 수 있습니다.'
            className='min-h-[137px] mt-[26px] px-[26px] py-[22px] t3 text-text1 border border-border1 rounded-[10px] outline-main resize-none placeholder:opacity-50'
          />
        </div>
      </div>

      <div className='flex justify-end mt-[30px]'>
        <button
          className={`button-type2 ${
            reviewTag.length === 0 ? 'cursor-not-allowed!' : ''
          }`}
          disabled={reviewTag.length === 0}
          onClick={handleSubmit}
        >
          완료
        </button>
      </div>
    </>
  );
}
