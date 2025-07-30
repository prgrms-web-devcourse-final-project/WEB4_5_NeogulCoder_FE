import Image, { StaticImageData } from 'next/image';
import github from '@/assets/images/icons/github.svg';
import instagram from '@/assets/images/icons/instagram.svg';
import notion from '@/assets/images/icons/notion.svg';
import tistory from '@/assets/images/icons/tistory.svg';
import velog from '@/assets/images/icons/velog.svg';
import naverBlog from '@/assets/images/icons/naver-blog.png';
import { Link2 } from 'lucide-react';
import { PrData } from '@/types/pr';

const urlIcon: Record<string, { src: StaticImageData; className?: string }> = {
  'github.com': { src: github },
  'instagram.com': { src: instagram, className: 'scale-120' },
  'notion.com': { src: notion, className: 'scale-90' },
  'notion.so': { src: notion, className: 'scale-90' },
  'naver.com': { src: naverBlog, className: 'scale-120' },
  'tistory.com': { src: tistory },
  'velog.io': { src: velog, className: 'scale-90' },
};

function matchUrl(
  url: string
): { src: StaticImageData; className?: string } | null {
  try {
    const hostname = new URL(url).hostname;
    const matchedUrl = Object.keys(urlIcon).find((domain) =>
      hostname.includes(domain)
    );
    return matchedUrl ? urlIcon[matchedUrl] : null;
  } catch {
    return null;
  }
}

export default function InfoSection({ pr }: { pr: PrData }) {
  if (!pr) return null;

  const location = pr.userLocationAndLinks?.[0]?.location;
  const links = pr.userLocationAndLinks?.[0]?.links;

  const hasLocation = !!location;
  const hasLinks = !!links && links.length > 0;

  const locationLinksMessage = !hasLocation && !hasLinks;

  return (
    <div className='w-1/2 h-[180px] border border-main/10 rounded-[10px] p-5 flex flex-col'>
      <p className={`tm3 ${locationLinksMessage ? '' : 'mb-6'}`}>정보</p>

      {locationLinksMessage ? (
        <div className='flex flex-1 items-center justify-center'>
          <span className='text-text1/50 t4'>지역과 URL을 등록해 주세요</span>
        </div>
      ) : (
        <>
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

          <div className='flex gap-10 mt-[18px]'>
            <div className='min-w-[50px]'>
              <p className='t3 text-text1/50'>URL</p>
            </div>
            <div className='flex items-center justify-center'>
              {hasLinks ? (
                <div className='flex flex-col gap-[10px]'>
                  {links.map((linkItem, index) => {
                    const icon = matchUrl(linkItem.link);
                    return (
                      <a
                        key={index}
                        href={linkItem.link}
                        target='_blank'
                        className='t4 text-text1 underline flex items-center gap-2'
                      >
                        {icon ? (
                          <div
                            className={`w-5 h-5 relative flex items-center justify-center ${
                              icon.className || ''
                            }`}
                          >
                            <Image
                              src={icon.src}
                              alt={`${linkItem.linkName} 아이콘`}
                              fill
                              className='object-contain'
                            />
                          </div>
                        ) : (
                          <Link2 className='text-[#2D90FF] w-[22px] h-[22px]' />
                        )}
                        {linkItem.linkName}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <span className='t4 text-text1/30'>URL을 등록해 주세요</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
