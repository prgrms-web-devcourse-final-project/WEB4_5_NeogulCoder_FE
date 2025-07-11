import ChatDate from '@/components/study-room/chat/ChatDate';
import ChatItem from '@/components/study-room/chat/ChatItem';
import { Send } from 'lucide-react';

export default function Chat() {
  const chats = [
    {
      name: '소정',
      time: '오후 19:00',
      content:
        '이번 주 목요일 회의 일정은 그대로 유지하되, 지난번에 논의했던 것처럼 발표 순서를 약간 조정해서 각 팀원들이 준비한 내용을 효율적으로 공유할 수 있도록 하고, 그에 따라 발표 시간도 조금씩 조정해야 할 것 같아서 notion 일정표에 새로 정리해뒀어요. 혹시 시간 배분이나 순서에 대해 더 나은 아이디어 있으면 오늘 오후까지 코멘트 남겨주시면 감사하겠습니다 🙇🏻‍♀️',
      image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
    },
    {
      name: '지민',
      time: '오후 19:48',
      content:
        '소정님이 말씀하신 발표 순서 조정에 전적으로 동의하고, 특히 프론트엔드 파트에서 공유할 내용이 생각보다 많아질 것 같아서 발표 시간을 5분 정도만 더 확보해 주시면 좋겠다는 생각이 들었는데요, 이번에 컴포넌트 구조를 전면 수정하면서 겪은 문제점과 해결 과정, 그리고 이후 리팩토링 방향성까지 간략하게라도 정리해서 전달드리고 싶어서 그렇습니다. 물론 다른 파트 일정에도 지장이 없도록 최대한 압축해서 준비하겠습니다 🙏',
      image: 'https://i.pinimg.com/1200x/ed/fd/4a/edfd4a136c502cb30f776751da37b7b1.jpg',
    },
    {
      name: '소정',
      time: '오후 19:00',
      content:
        '두 분 다 정리 너무 감사합니다. 지민님 프론트 쪽 발표시간 늘리는 거 저는 괜찮다고 생각하고요, 특히 구조 관련해서는 백엔드랑 연동할 때도 고려해야 할 부분이 있어서 팀 전체가 이해하는 데 도움 될 것 같아요. 혹시 발표자료 미리 올려주시면 저희 쪽에서도 슬라이드나 다이어그램 부분에 피드백 드릴게요!',
      image: 'https://i.pinimg.com/1200x/7f/6a/56/7f6a561d683ee6001f540e358b933da9.jpg',
    },
    {
      name: '지민',
      time: '오후 19:48',
      content: '한문장 예시 채팅',
      image: 'https://i.pinimg.com/1200x/ed/fd/4a/edfd4a136c502cb30f776751da37b7b1.jpg',
    },
  ];
  return (
    <>
      <div className='w-full rounded-[10px] border border-border2'>
        <div className='h-[640px] flex flex-col justify-end'>
          <div className='overflow-auto min-w-0 px-7 flex flex-col'>
            <ChatDate date='2025년 07월 9일' />
            {chats.map((chat, i) => (
              <ChatItem key={`chat${i}`} name={chat.name} content={chat.content} time={chat.time} image={chat.image} />
            ))}
          </div>
        </div>

        <div className='px-7 mb-7'>
          <div className='relative'>
            <input className='input-type1 w-full' type='text' placeholder='채팅을 입력하세요.' />
            <Send className='w-[18px] h-[18px] text-gray5 absolute right-5 top-1/2 -translate-y-1/2' />
          </div>
        </div>
      </div>
    </>
  );
}
