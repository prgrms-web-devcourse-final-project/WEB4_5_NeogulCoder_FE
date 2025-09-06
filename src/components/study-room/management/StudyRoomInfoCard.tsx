'use client';

export default function StudyRoomInfoCard({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) {
  return (
    <>
      <div className='w-full border-border1 border rounded-[10px] p-3.5 pb-3 lg:p-6 lg:pb-5'>
        <p className='t4 leading-none mb-3.5 lg:mb-5 text-gray5'>{title}</p>
        <p className='t3 text-xs sm:text-[14px] md:text-[16px] leading-tight'>
          {content}
        </p>
      </div>
    </>
  );
}
