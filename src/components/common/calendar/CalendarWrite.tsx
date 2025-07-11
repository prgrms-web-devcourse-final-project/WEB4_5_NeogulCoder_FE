import { X } from 'lucide-react';

export default function CalendarWrite({ writeCloseHandler }: { writeCloseHandler: () => void }) {
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] min-w-[580px]'>
          <div className='flex justify-between mb-8 px-9 '>
            <h3 className='tm1'>일정 등록</h3>
            <button onClick={writeCloseHandler}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            <form>
              <div className='px-9 mb-8 flex flex-col gap-4 max-h-[calc(90vh-160px)] overflow-auto'>
                <div className='shrink-0'>
                  <p className='tm2 mb-3'>
                    제목 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <input type='text' className='w-full input-type2' />
                </div>
                <div className='shrink-0'>
                  <p className='tm2'>
                    기간 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='mb-3 justify-end flex'>
                    <label htmlFor='allDay' className='tl3 flex items-center gap-2.5 cursor-pointer'>
                      <span>종일</span>
                      <div className='relative text-[0px]'>
                        <input
                          id='allDay'
                          type='checkbox'
                          className=' cursor-pointer w-5 h-5 peer border border-border1 appearance-none rounded-sm checked:bg-blue-500 checked:border-blue-500'
                        />
                        <span className='pointer-events-none absolute left-[7px] top-0.5 w-1.5 h-3 border-white border-r-2 border-b-2 rotate-45 opacity-0 peer-checked:opacity-100'></span>
                      </div>
                    </label>
                  </div>
                  <div className='flex items-center gap-3 mb-3'>
                    <p className='tl3 shrink-0'>시작</p>
                    <input type='date' className='w-full input-type2 tm3' />
                    <input type='time' className='input-type2 tm3' />
                  </div>
                  <div className='flex items-center gap-3 mb-3'>
                    <p className='tl3  shrink-0'>종료</p>
                    <input type='date' className='w-full input-type2 tm3' />
                    <input type='time' className='input-type2 tm3' />
                  </div>
                </div>
                <div className='shrink-0'>
                  <p className='tm2 mb-3'>내용</p>
                  <textarea className='input-type2 resize-none w-full h-[90px]!' />
                </div>
              </div>
              <div className='px-9'>
                <button className='button-modal1'>등록</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
