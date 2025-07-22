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
import { fetchStudyList } from '@/lib/api/manners';
// import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import SockJS from 'sockjs-client';

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
  const user = userAuthStore((state) => state.user);
  const clientRef = useRef<Client | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);

  // 스터디 ID 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studyInfo = await fetchStudyList();
        console.log(studyInfo);
        if (studyInfo?.studies?.length) {
          setRoomId(studyInfo.studies[0].studyId);
        }
      } catch (error) {
        console.error('스터디 정보 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  // 웹소켓 연결
  useEffect(() => {
    // if (!roomId) return;
    const socketUrl = process.env.NEXT_PUBLIC_API_URL;
    // console.log(socketUrl);

    const client = new Client({
      webSocketFactory: () => new SockJS(`${socketUrl}/ws-stomp`), // 연결
      reconnectDelay: 5000, // 재연결 시도 5초
      debug: (str) => console.log('[STOMP]', str),
      onConnect: () => {
        console.log('연결 성공');

        // 구독
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          try {
            console.log(message);
            const payload = JSON.parse(message.body);
            console.log(payload);
            setChats((prev) => [...prev, payload]);
          } catch (error) {
            console.error(error);
          }
          // const payload: ChatMessageType = JSON.parse(message.body);
          // console.log('[RECEIVED]', payload);
          // setChats((prev) => [...prev, payload]);
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
  }, [roomId]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (!message.trim() || !roomId || !user || !clientRef.current) return;
    console.log('연결?', clientRef.current?.connected);

    // const newMessage: ChatMessageType = {
    //   id: Date.now(), // or a uuid
    //   roomId: roomId,
    //   senderId: user.id,
    //   senderNickname: user.nickname,
    //   profileImageUrl: user.profileImgUrl || musicBunny,
    //   message,
    //   sentAt: new Date().toISOString(),
    // };

    // 서버로 전송
    clientRef.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        roomId: roomId,
        senderId: user.id,
        message,
      }),
    });
    // setChats((prev) => [...prev, newMessage]);
    console.log('[SENT]', {
      roomId: roomId,
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

  return (
    <div className='w-full rounded-[10px] border border-border2'>
      <div className='h-[640px] flex flex-col justify-end'>
        <div className='overflow-auto min-w-0 px-7 flex flex-col'>
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
