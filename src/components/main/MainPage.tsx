import MainBanner from '@/components/main/MainBanner';
import MainStudyList from '@/components/main/MainStudyList';
import MainRecruitmentList from '@/components/main/MainRecruitmentList';
import { Suspense } from 'react';
import Link from 'next/link';
import { userAuthStore } from '@/stores/userStore';

export default function MainPage() {
  const user = userAuthStore().user;
  return (
    <>
      <div>
        <div className='main-banner'>
          <MainBanner />
        </div>
        <div className='main-studies'>
          <MainStudyList />
        </div>

        <div id='recruit' className='pt-[40px] lg:pt-[60px] xl:pt-[120px]'>
          <div className='flex justify-between items-center'>
            <p className='text-[18px] lg:text-[22px] font-bold'>모집글</p>
            {user && (
              <div className='text-right'>
                <Link
                  href={`/recruitment/write`}
                  className='button-sm-type1 mobile1'
                >
                  모집글 작성
                </Link>
              </div>
            )}
          </div>
          <Suspense>
            <MainRecruitmentList />
          </Suspense>
        </div>
      </div>
    </>
  );
}
