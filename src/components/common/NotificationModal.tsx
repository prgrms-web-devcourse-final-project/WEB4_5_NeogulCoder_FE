import { Bell } from 'lucide-react';
import { X } from 'lucide-react';

export default function NotificationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const notifications = [
    {
      id: 1,
      text: '홍길동님이 A 스터디에 승인 되었습니다.',
      read: false,
    },
    {
      id: 2,
      text: '홍길동님이 B 스터디에 지원하였습니다.',
      read: true,
    },
    {
      id: 3,
      text: '홍길동님이 새로운 댓글을 달았습니다.',
      read: true,
    },
    {
      id: 4,
      text: 'A 스터디의 팀장님이 일정을 요청하셨습니다.',
      read: false,
    },
  ];
  return (
    <div className='flex flex-col border border-gray-100 bg-white w-[360px] h-[600px] overflow-auto rounded-[10px] drop-shadow-xl p-5 gap-5'>
      <div className='flex justify-between items-center'>
        <h2 className='tm2'>알림</h2>
        <X className='w-5 h-5 cursor-pointer' onClick={onClose} />
      </div>
      <div className='flex justify-end'>
        <button className='t5 w-20 h-6 bg-main text-white rounded-[6px] hover:bg-[#292929]'>
          전체 읽기
        </button>
      </div>

      <ul className='flex flex-col cursor-default'>
        {notifications.map((item) => (
          <li
            key={item.id}
            className='t4 text-text1 hover:bg-gray4 p-3 rounded-[6px] transition flex items-center justify-between'
          >
            <div className='flex items-start gap-4'>
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full shrink-0 ${
                  item.read ? 'bg-gray4' : 'bg-[#90CFF1]'
                }`}
              >
                <Bell
                  className={`w-4 h-4 ${
                    item.read ? 'text-gray3' : 'text-white'
                  }`}
                />
              </div>

              <div className='flex flex-col'>
                <span className='t4 text-text1'>{item.text}</span>
                <span className='t5 text-gray5 mt-1'>3분 전</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
