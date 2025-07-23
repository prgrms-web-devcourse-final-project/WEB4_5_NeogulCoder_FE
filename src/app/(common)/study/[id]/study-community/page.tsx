import StudyCommunityClient from '@/components/study/StudyCommunityClient';

export default function StudyCommunity() {
  const responseType = {
    noticePostInfos: [
      {
        postId: 3,
        category: '공지',
        title: '제목',
        createdAt: '2025-07-21',
      },
      {
        postId: 4,
        category: '공지',
        title:
          '공지인데 뭐 공지인데 뭐 공지인데 뭐 공지인데 뭐 공지인데 뭐 공지인데 뭐 공지인데 뭐 공지인데 뭐',
        createdAt: '2025-07-22',
      },
    ],
    postInfos: [
      {
        id: 12,
        title: '모든 국민은 직업선택의 자유를 가진다.',
        category: 'NOTICE',
        content: '국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
        createdDate: '2025-07-21T16:20:58.523Z',
        commentCount: 3,
      },
      {
        id: 13,
        title:
          '아라라라ㅏ라 나난ㄴ나나나ㅏㅏ난나ㅏㅏㄴ나 바나나나나나나미니언 미니언미니언',
        category: 'FREE',
        content:
          '국회는 의원의 자격을 심사하며, 의원을 징계할 있다. 국회는 의원의 자격을 심사하며, 의원을 징계할 있다. 국회는 의원의 자격을 심사하며, 의원을 징계할 있다. 국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
        createdDate: '2025-07-22T16:20:58.523Z',
        commentCount: 0,
      },
    ],
    totalPage: 13,
    totalElementCount: 3,
    hasNext: true,
  };

  const initialStudyCommunityData = responseType;

  return (
    <StudyCommunityClient
      initialStudyCommunityData={initialStudyCommunityData}
    />
  );
}
