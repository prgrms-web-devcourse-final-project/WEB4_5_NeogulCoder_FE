import { EllipsisVertical } from "lucide-react";

export default async function comment() {
  return (
    <>
      <div className='flex w-[1098px] my-3 items-start '>
        <div className='w-[50px] h-[50px] rounded-full bg-gray-300 mr-5'></div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-start'>
            <div className='flex'>
              <div className='tb3' style={{ color: "var(--color-text1)" }}>
                닉네임
              </div>
              <div
                className='tm4 ml-[6px] mt-[6px] opacity-50'
                style={{ color: "var(--color-text1)" }}
              >
                3분 전
              </div>
            </div>
            <EllipsisVertical />
          </div>

          <div className='tm2' style={{ color: "var(--color-text1)" }}>
            댓글 작성 댓글 작성
          </div>
        </div>
      </div>
    </>
  );
}
