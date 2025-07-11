import { X } from 'lucide-react';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const feedbackList = [
    {
      id: 1,
      userName: '박스영',
      date: '2025.07.07',
      content:
        '피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백',
    },
    {
      id: 2,
      userName: '박스영이',
      date: '2025.07.08',
      content: '피드백 피드백',
    },
    {
      id: 3,
      userName: '박스영영',
      date: '2025.07.09',
      content: '피드백 피드백 피드백',
    },
  ];
  return (
    <div className="flex flex-col bg-white w-110 h-130 overflow-auto rounded-[10px] items-center shadow-lg gap-[35px] px-6 py-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="tm2">피드백</h2>
        <X className="w-6 h-6 opacity-50 cursor-pointer" onClick={onClose} />
      </div>

      {feedbackList.map((feedback) => (
        <div key={feedback.id} className="flex flex-col gap-3 w-full">
          <div className="flex gap-3">
            <div className="w-[46px] h-[46px] bg-gray3 rounded-full overflow-hidden flex-shrink-0">
              <Image src={musicBunny} alt="예시 기본 프사" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="tm4">{feedback.userName}</p>
              <p className="t5 text-text1/50">{feedback.date}</p>
            </div>
          </div>

          <p className="t4 text-text1 pl-[60px] ">{feedback.content}</p>
          <hr className="border border-main/10 m-0" />
        </div>
      ))}
    </div>
  );
}
