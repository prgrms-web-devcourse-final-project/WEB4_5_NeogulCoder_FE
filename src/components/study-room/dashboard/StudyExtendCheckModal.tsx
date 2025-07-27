export default function StudyExtendCheckModal() {
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
          <p className='mb-7 tm3'>
            연장된 스터디에서 참가하시겠습니까? <br /> 거절해도 스터디
            내정보에서 참가하실 수 있습니다.
          </p>
          <div className='flex gap-4 justify-center'>
            <button className='button-type6 !w-[120px]'>거절하기</button>
            <button className='button-type5 !w-[120px]'>참가하기</button>
          </div>
        </div>
      </div>
    </>
  );
}
