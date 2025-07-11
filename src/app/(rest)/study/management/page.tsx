import StudyExtend from '@/components/study-room/management/StudyExtend';
import StudyMemberList from '@/components/study-room/management/StudyMemberList';
import StudyRoomInfo from '@/components/study-room/management/StudyRoomInfo';
import StudyRoomInfoWrite from '@/components/study-room/management/StudyRoomInfoWrite';

export default async function Management() {
  return (
    <>
      <div className='mb-24'>
        <StudyRoomInfo />
      </div>
      <div className='mb-24'>
        <StudyMemberList />
      </div>
      <div>
        <StudyExtend />
      </div>
      <StudyRoomInfoWrite />
    </>
  );
}
