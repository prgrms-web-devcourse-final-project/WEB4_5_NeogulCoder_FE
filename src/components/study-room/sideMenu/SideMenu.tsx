import SideMenuItem from './SideMenuItem';
import SideStudyInfo from './SideStudyInfo';

export default function SideMenu() {
  return (
    <>
      <div>
        <SideStudyInfo name='너굴코더' />
        <button type='button' className='w-full tm3 h-[40px] bg-gray4 rounded-[10px]'>
          스터디의 My 정보
        </button>
        <div className='flex flex-col gap-[30px] mt-[35px]'>
          <SideMenuItem name='스터디 대시보드' active={false} />
          <SideMenuItem name='팀 캘린더' active={false} />
          <SideMenuItem name='모임 시간 조율' active={false} />
          <SideMenuItem name='스터디 커뮤니티' active={false} />
          <SideMenuItem name='팀 채팅' active={true} />
          <SideMenuItem name='스터디 관리' active={false} />
        </div>
      </div>
    </>
  );
}
