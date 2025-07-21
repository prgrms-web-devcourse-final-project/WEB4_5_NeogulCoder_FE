import { userPrStore } from '@/stores/prStore';

export default function InfoSection() {
  const { pr } = userPrStore();
  if (!pr) return null;

  const location = pr.userLocationAndLinks?.[0]?.location;
  const links = pr.userLocationAndLinks?.[0]?.links;

  const hasLocation = !!location;
  const hasLinks = !!links && links.length > 0;

  const locationLinksMessage = !hasLocation && !hasLinks;

  return (
    <>
      <div className='w-1/2 h-[180px] border border-main/10 rounded-[10px] p-5 flex flex-col'>
        <p className='tm3 mb-6'>정보</p>

        {locationLinksMessage ? (
          <span className='text-text1/50 t4'>지역과 URL을 등록해 주세요</span>
        ) : (
          <>
            {/* 지역 */}
            <div className='flex gap-10'>
              <div className='min-w-[50px]'>
                <p className='t3 text-text1/50'>지역</p>
              </div>
              <div className='flex items-center justify-center'>
                {hasLocation ? (
                  <span className='t4 text-text1'>{location}</span>
                ) : (
                  <span className='t4 text-text1/30'>지역을 등록해 주세요</span>
                )}
              </div>
            </div>

            {/* URL */}
            <div className='flex gap-10 mt-[18px]'>
              <div className='min-w-[50px]'>
                <p className='t3 text-text1/50'>URL</p>
              </div>
              <div className='flex items-center justify-center'>
                {hasLinks ? (
                  <div className='flex flex-col gap-[10px]'>
                    {links.map((linkItem, index) => (
                      <a
                        key={index}
                        href={linkItem.link}
                        target='_blank'
                        className='t4 text-text1 underline'
                      >
                        {linkItem.linkName}
                      </a>
                    ))}
                  </div>
                ) : (
                  <span className='t4 text-text1/30'>URL을 등록해 주세요</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
