import Image from 'next/image';
import buddyEnergy from '@/assets/images/buddy-energy.svg';

export default function BuddyEnergySection() {
  const energyPercent = 80;
  const safePercent = Math.min(energyPercent, 100);
  const bunnyPosition =
    safePercent >= 98 ? 'calc(100% - 35px)' : `calc(${safePercent}% - 35px)`;
  return (
    <>
      <div className="w-1/2 h-[180px] border border-main/10 rounded-[10px] flex flex-col p-5">
        <p className="tm3 mb-[35px]">버디 에너지</p>

        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-[500px] bg-border1 rounded-full h-5 overflow-visible">
            <div
              className="bg-orange h-full rounded-full transition-all duration-500"
              style={{ width: `${safePercent}%` }}
            />

            <div
              className="absolute -top-6"
              style={{
                left: bunnyPosition,
                zIndex: 10,
                width: '70px',
              }}
            >
              <Image
                src={buddyEnergy}
                alt="버디 에너지"
                className="w-[70px] h-auto"
              />
            </div>
          </div>

          <p className="text-right mt-4 tm4 text-text1 w-full max-w-[500px]">
            {safePercent}%
          </p>
        </div>
      </div>
    </>
  );
}
