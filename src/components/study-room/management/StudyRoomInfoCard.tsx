'use client';

export default function StudyRoomInfoCard({ title, content }: { title: string; content: string }) {
  return (
    <>
      <div className='w-full border-border1 border rounded-[10px] p-6 pb-5'>
        <p className='t4 leading-none mb-5 text-gray5'>{title}</p>
        <p className='t3 leading-tight'>{content}</p>
      </div>
    </>
  );
}
