import { CalendarDays, X } from 'lucide-react';

export default function StudyRoomExtendWrite({
  closeFn,
}: {
  closeFn: () => void;
}) {
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] min-w-[580px]'>
          <div className='flex justify-between mb-8 px-9 '>
            <h3 className='tb2'>스터디 연장</h3>
            <button onClick={closeFn}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            <form>
              <div className='px-9 mb-12 flex flex-col gap-4 max-h-[calc(90vh-160px)] overflow-auto'>
                <div className=' shrink-0'>
                  <p className='t3 mb-3'>
                    스터디의 새로운 종료일자{' '}
                    <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='text-center'>
                    <label className='relative'>
                      <input
                        type='date'
                        className='w-[300px] date-custom input-type2 tm3 pr-9!'
                      />
                      <CalendarDays
                        strokeWidth={1}
                        className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2'
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className='px-9'>
                <button className='button-modal1'>연장하기</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
