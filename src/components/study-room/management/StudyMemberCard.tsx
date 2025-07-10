import Image from 'next/image';

export default async function MemberCard({ name, image }: { name: string; image: string }) {
  return (
    <>
      <div className='w-full flex items-center justify-between border border-border1 rounded-[10px] px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='overflow-hidden rounded-full border border-border1 shrink-0'>
            <Image src={image} width={40} height={0} alt={`${name} 프로필 이미지`} />
          </div>
          <div className='leading-none mt-1'>{name}</div>
        </div>
        <div className='flex gap-x-1.5 shrink-0'>
          <button className='inline-flex items-center justify-center t5 px-1.5 py-1 text-gray1 border border-gray1 rounded-md'>
            <span className='h-3.5'>스터디장 위임</span>
          </button>
          <button className='inline-flex items-center justify-center t5 px-1.5 py-1 text-red border border-red rounded-md'>
            <span className='h-3.5'>강퇴</span>
          </button>
        </div>
      </div>
    </>
  );
}
