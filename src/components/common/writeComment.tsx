export default async function writeComment() {
  return (
    <>
      <div className='flex w-[1098px]  items-start '>
        <div className='flex flex-col'>
          <div className='flex'>
            <span className='tb2 mr-1' style={{ color: "var(--color-text1)" }}>
              댓글
            </span>
            <span
              className='tb2 opacity-50 '
              style={{ color: "var(--color-text1)" }}
            >
              2
            </span>
          </div>
          <div className='flex my-8'>
            <div className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'></div>
            <input
              className='w-[1022px] h-[50px] rounded-xl border-[1px] p-5  border-[#B8B8B8]'
              placeholder='댓글을 입력해주세요'
              style={{
                color: "var(--color-text1)",
              }}
            ></input>
          </div>
          <div className='flex justify-end mb-10'>
            <button className='button-type5 color-[#ffffff]'>댓글 등록</button>
          </div>
        </div>
      </div>
    </>
  );
}
