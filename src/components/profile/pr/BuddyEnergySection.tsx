import Image from 'next/image';
import buddyEnergy from '@/assets/images/buddy-energy.svg';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { userAuthStore } from '@/stores/userStore';
import { getBuddyEnergy } from '@/lib/api/pr';
import BuddyEnergySkeleton from './skeleton/BuddyEnergySkeleton';

export default function BuddyEnergySection() {
  const [energy, setEnergy] = useState<number | null>(null);

  const params = useParams();
  const me = userAuthStore((state) => state.user);

  const userId =
    params?.userId && params?.userId !== 'me' ? Number(params.userId) : me?.id;

  useEffect(() => {
    if (userId) {
      getBuddyEnergy(userId)
        .then((energy) => {
          setEnergy(energy);
        })
        .catch((err) => {
          console.error('버디 에너지 불러오기 실패:', err);
        });
    }
  }, [userId]);

  if (energy === null) return <BuddyEnergySkeleton />;

  const bunnyPosition =
    energy >= 98 ? 'calc(100% - 35px)' : `calc(${energy}% - 35px)`;
  return (
    <>
      <div className='w-1/2 h-[180px] border border-main/10 rounded-[10px] flex flex-col p-5'>
        <p className='tm3 mb-[35px]'>버디 에너지</p>

        <div className='w-full flex flex-col items-center'>
          <div className='relative w-full max-w-[500px] bg-border1 rounded-full h-5 overflow-visible'>
            <div
              className='bg-orange h-full rounded-full transition-all duration-500'
              style={{ width: `${energy}%` }}
            />

            <div
              className='absolute -top-6'
              style={{
                left: bunnyPosition,
                width: '70px',
              }}
            >
              <Image
                src={buddyEnergy}
                alt='버디 에너지'
                className='w-[70px] h-auto'
              />
            </div>
          </div>

          <p className='text-right mt-4 tm4 text-text1 w-full max-w-[500px]'>
            {energy}%
          </p>
        </div>
      </div>
    </>
  );
}
