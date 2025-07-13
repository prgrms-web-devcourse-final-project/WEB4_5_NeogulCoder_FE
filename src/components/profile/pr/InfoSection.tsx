import { Link } from 'lucide-react';

export default function InfoSection() {
  const userInfo = {
    region: '서울시',
    url: [
      { label: '수코딩', url: 'https://www.sucoding.kr/', icon: 'sucoding' },
      {
        label: '수튜브',
        url: 'https://www.youtube.com/@sucoding',
        icon: 'syoutube',
      },
    ],
  };
  return (
    <>
      <div className='w-1/2 h-[180px] border border-main/10 rounded-[10px] p-5 flex flex-col'>
        <p className='tm3 mb-6'>정보</p>

        <div className='flex items-center gap-10 mb-[18px]'>
          <p className='t3 text-text1/50'>지역</p>
          <span className='t3 text-text1'>{userInfo.region}</span>
        </div>

        <div className='flex gap-10'>
          <p className='t3 text-text1/50'>URL</p>
          <div className='flex flex-col gap-[10px]'>
            {userInfo.url.map((item: any, id: number) => (
              <div key={id} className='flex items-center gap-[10px]'>
                {item.icon === 'sucoding' && (
                  <Link className='w-4 h-4 text-text1' />
                )}
                {item.icon === 'syoutube' && (
                  <Link className='w-4 h-4 text-text1' />
                )}

                <a
                  href={item.url}
                  target='_blank'
                  className='t4 text-text1/50 underline hover:text-main transition'
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
