import { X } from 'lucide-react';
import Image from 'next/image';
import excellent from '@/assets/images/excellent.svg';
import good from '@/assets/images/good.svg';
import notGood from '@/assets/images/not-good.svg';

export default function MannerModal({ onClose }: { onClose: () => void }) {
  const reviewSummary = [
    {
      category: '최고예요',
      icon: excellent,
      items: [
        {
          content: '항상 먼저 도와주고 분위기를 이끌어주는 팀원이었어요.',
          count: 10,
        },
        {
          content: '책임감이 넘치고 맡은 일 이상으로 기여해줘서 감동이었어요.',
          count: 10,
        },
        {
          content: '꼼꼼하고 빠른 진행 덕분에 팀 전체가 수월하게 움직였어요.',
          count: 10,
        },
        {
          content: '커뮤니케이션도 최고, 실력도 최고! 이런 팀원은 흔치 않아요.',
          count: 10,
        },
      ],
    },
    {
      category: '좋아요',
      icon: good,
      items: [
        {
          content: '주어진 역할은 무리 없이 잘 해냈어요.',
          count: 10,
        },
        {
          content: '협업 중 큰 문제가 없어서 편하게 함께할 수 있었어요.',
          count: 10,
        },
        {
          content: '일정에 맞춰 참여했고, 필요한 만큼 소통했어요.',
          count: 10,
        },
        {
          content: '스터디 분위기를 잘 따라왔고, 팀에 잘 녹아들었어요.',
          count: 10,
        },
      ],
    },

    {
      category: '별로예요',
      icon: notGood,
      items: [
        {
          content: '약속된 일정에 자주 늦거나 참여율이 낮았어요.',
          count: 10,
        },
        {
          content: '소통이 원활하지 않아 협업에 어려움이 있었어요.',
          count: 10,
        },
        {
          content: '역할에 대한 책임감이 부족해 보였어요.',
          count: 10,
        },
        {
          content: '팀 작업보다 개인 일에 더 집중한 느낌이었어요.',
          count: 10,
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col bg-white w-175 h-175 rounded-[10px] items-center shadow-lg gap-[30px] px-6 py-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="tm2">매너 평가</h2>
        <X className="w-6 h-6 opacity-50 cursor-pointer" onClick={onClose} />
      </div>

      {reviewSummary.map((review) => (
        <div
          key={review.category}
          className="w-[640px] h-[680px] border border-main/10 rounded-[6px] flex gap-6 px-6 py-5 bg-white"
        >
          <div className="flex flex-col items-center justify-start">
            <Image src={review.icon} alt="리뷰 아이콘" />
          </div>

          <div className="flex flex-col gap-3 w-full">
            {review.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <p className="t4">{item.content}</p>
                <span>
                  <span className="tm3">{item.count}</span> 명
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
