import { Camera, ChevronDown, X } from 'lucide-react';

export default function StudyRoomInfoWrite({ closeFn }: { closeFn: () => void }) {
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='py-7 rounded-[10px] bg-white drop-shadow-md max-w-[650px] min-w-[580px]'>
          <div className='flex justify-between mb-8 px-9 '>
            <h3 className='tm1'>스터디 정보 수정</h3>
            <button onClick={closeFn}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            <form>
              <div className='px-9 mb-8 flex flex-col gap-4 max-h-[calc(90vh-160px)] overflow-auto'>
                <div className='w-[100px] h-[100px] mx-auto relative shrink-0'>
                  <div className='w-full h-full rounded-full bg-gray3'></div>
                  <button className='w-[30px] h-[30px] rounded-full flex items-center justify-center bg-main absolute right-0 bottom-0'>
                    <Camera className='w-5 h-5 text-white' />
                  </button>
                </div>
                <div className=' shrink-0'>
                  <p className='t2 mb-3'>
                    이름 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <input type='text' className='w-full input-type2' />
                </div>
                <div className=' shrink-0'>
                  <p className='t2 mb-3'>
                    카테고리 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='w-full relative'>
                    <select className='w-full input-type2 appearance-none pr-9!'>
                      <option>개발/IT</option>
                    </select>
                    <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                  </div>
                </div>
                <div className=' shrink-0'>
                  <p className='t2 mb-3'>
                    인원 수 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='flex w-full gap-3 items-end'>
                    <input type='text' className='w-full input-type2' />
                    <span className='tm4 shrink-0'>명</span>
                  </div>
                </div>
                <div className=' shrink-0'>
                  <p className='t2 mb-3'>
                    진행방식 <span className='tm5 text-red'>(필수)</span>
                  </p>
                  <div className='flex gap-3'>
                    <div className='w-full relative'>
                      <select className='w-full input-type2 appearance-none pr-9!'>
                        <option>온/오프라인</option>
                        <option>오프라인</option>
                        <option>온라인</option>
                      </select>
                      <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                    </div>
                    <div className='w-full relative'>
                      <select className='w-full input-type2 appearance-none pr-9!'>
                        <option>서울시</option>
                        <option>수원시</option>
                        <option>고양시</option>
                        <option>용인시</option>
                        <option>성남시</option>
                      </select>
                      <ChevronDown className='absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 -z-1' />
                    </div>
                  </div>
                </div>
                <div className=' shrink-0'>
                  <p className='t2 mb-3'>스터디 한 줄 소개</p>
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
