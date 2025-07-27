'use client';
import ChatDate from '@/components/study-room/chat/ChatDate';
import ChatItem from '@/components/study-room/chat/ChatItem';
import { Client } from '@stomp/stompjs';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChatGroup, ChatMessageType } from '@/types/chat';
import { userAuthStore } from '@/stores/userStore';
import musicBunny from '@/assets/images/music-bunny.svg';
import SockJS from 'sockjs-client';
import { fetchChatMessage } from '@/lib/api/chat';
import { useParams } from 'next/navigation';

function groupChatsByDate(chats: ChatMessageType[]): ChatGroup[] {
  const map = new Map<string, ChatMessageType[]>();

  chats.forEach((chat) => {
    const date = format(new Date(chat.sentAt), 'yyyy년 MM월 dd일', {
      locale: ko,
    });
    if (!map.has(date)) {
      map.set(date, []);
    }
    map.get(date)?.push(chat);
  });

  return Array.from(map.entries()).map(([date, messages]) => ({
    date,
    messages,
  }));
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<ChatMessageType[]>([]);
  const [isInput, setIsInput] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const user = userAuthStore((state) => state.user);
  const clientRef = useRef<Client | null>(null);
  const textBottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const studyId = Number(params?.id);

  // 메시지 불러오기 + 웹소켓 연결
  useEffect(() => {
    if (!studyId) return;

    const initialMessages = async () => {
      try {
        const initialPage = 0;
        const res = await fetchChatMessage(studyId, initialPage);
        setChats(res.content);
        setCurrentPage(res.currentNumber);
        setNextPage(res.nextPage);
        console.log(res.content.map((msg) => `${msg.id}: ${msg.message}`));
      } catch (error) {
        console.error('초기 메시지 불러오기 실패: ', error);
      }
    };

    if (studyId) initialMessages();

    const socketUrl = process.env.NEXT_PUBLIC_API_URL;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${socketUrl}/ws-stomp`), // 연결
      reconnectDelay: 5000, // 재연결 시도 5초
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('연결 성공');
        console.log('SUBSCRIBED TO', `/sub/chat/room/${studyId}`);

        // 구독
        client.subscribe(`/sub/chat/study/${studyId}`, (message) => {
          try {
            const content = JSON.parse(message.body);
            console.log('수신: ', content);
            setChats((prev) => [...prev, content]);
          } catch (error) {
            console.error(error);
          }
        });
      },
      onDisconnect: () => {
        console.log('연결 실패');
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate(); // 연결 끊기
    };
  }, [setCurrentPage, setNextPage, studyId]);

  useEffect(() => {
    if (chats.length > 0) {
      textBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (!message.trim() || !studyId || !user || !clientRef.current) return;
    // console.log('연결', clientRef.current?.connected);

    // 서버로 전송
    clientRef.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        studyId: studyId,
        senderId: user.id,
        message,
      }),
    });

    console.log('전송 ', {
      studyId: studyId,
      senderId: user.id,
      message,
    });

    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isInput) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleScroll = async () => {
    const scrollText = scrollRef.current;
    if (!scrollText || scrollText.scrollTop !== 0 || nextPage === null) return;

    try {
      const res = await fetchChatMessage(studyId, currentPage + 1);
      setChats((prev) => [...res.content, ...prev]);
      setCurrentPage(res.currentNumber);
      setNextPage(res.nextPage);
    } catch (error) {
      console.error('과거 메시지 불러오기 실패: ', error);
    }
  };

  return (
    <div className='w-full rounded-[10px] border border-border2'>
      <div className='h-[640px] flex flex-col'>
        <div
          className='flex-1 overflow-y-auto min-w-0 px-7 flex flex-col'
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {groupChatsByDate(chats).map((group, i) => (
            <div key={i}>
              <ChatDate date={group.date} />
              {group.messages.map((chat) => (
                <ChatItem
                  key={chat.id}
                  name={chat.senderNickname}
                  content={chat.message}
                  time={new Date(chat.sentAt).toLocaleTimeString()}
                  image={chat.profileImageUrl ?? musicBunny}
                />
              ))}
            </div>
          ))}
          <div ref={textBottomRef}></div>
        </div>
      </div>

      <div className='px-7 mb-7'>
        <div className='relative'>
          <input
            className='input-type1 w-full focus:outline-none placeholder:opacity-50'
            type='text'
            placeholder='내용을 입력해주세요.'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsInput(true)}
            onCompositionEnd={() => setIsInput(false)}
          />
          <Send
            className='w-[18px] h-[18px] text-gray5 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer'
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
