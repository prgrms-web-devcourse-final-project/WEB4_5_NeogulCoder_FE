import Image from 'next/image';
import Link from 'next/link';
import logoWibby from '@/assets/images/logo-wibby.svg';

export default function MobileStudyListMenu({
  studies,
  mobileOpen,
  closeFn,
}: {
  studies: StudiesMainType[];
  mobileOpen: boolean;
  closeFn: () => void;
}) {
  return (
    <>
      <div
        className={`bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 transition-opacity duration-300 flex items-end justify-center overflow-hidden 
            ${
              mobileOpen
                ? 'bg-black/50 opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
        onClick={closeFn}
      >
        <div
          className={`w-full rounded-t-[24px] bg-white drop-shadow-md transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className='pt-4' onClick={closeFn}>
            <div className='w-[50px] h-[3px] bg-border1 rounded-[3px] mx-auto mb-4'></div>
          </div>
          <div className='min-h-[200px] max-h-[60vh] overflow-y-auto'>
            {studies.length === 0 ? (
              <>
                <div className='tm3 text-center py-20 text-border3'>
                  가입된 스터디가 없습니다
                </div>
              </>
            ) : (
              studies.map((study) => (
                <Link
                  key={study.studyId}
                  href={`/study/${study.studyId}/dashboard`}
                  type='button'
                  className=' flex items-center px-[18px] py-3.5 border-border1 border-b-1'
                >
                  <Image
                    src={study.imageUrl ?? logoWibby}
                    alt={study.name}
                    // className='w-8 h-8 rounded-[12px] group-hover:drop-shadow'
                    width={32}
                    height={32}
                    className={`rounded-[12px] group-hover:drop-shadow ${
                      study.imageUrl ? 'w-8 h-8' : 'object-contain scale-[0.6]'
                    }`}
                  />
                  <span className='p-1 px-2 t3'>{study.name}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
