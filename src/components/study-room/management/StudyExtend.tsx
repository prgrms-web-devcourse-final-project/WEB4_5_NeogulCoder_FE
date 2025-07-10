export default async function StudyExtend() {
  return (
    <>
      <div className='flex justify-between mb-6 pb-6 border-border1 border-b'>
        <h3 className='t1 leading-none'>스터디 연장</h3>
      </div>
      <div className='flex justify-between items-center '>
        <p className='t3 leading-none mt-1 text-red'>스터디 종료일자 7일 이내로 스터디 연장을 하실 수 있습니다.</p>
        <button className='button-type2'>
          <span>스터디 연장</span>
        </button>
      </div>
    </>
  );
}
