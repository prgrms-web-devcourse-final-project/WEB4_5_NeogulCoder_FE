export default function SubHeader() {
  return (
    <>
      <div className="w-full flex justify-center text-text1">
        <div className="w-[1248px] flex items-center justify-between pl-5 pr-[10px] mt-[35px]">
          <div className="flex gap-[50px] text-lg font-semibold">
            <button type="button">홈</button>
            <button type="button">모집</button>
          </div>

          <div className="flex gap-6">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-gray-300"
            ></button>
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-gray-300"
            ></button>
          </div>
        </div>
      </div>
      <hr className="mt-[10px] border-main/10" />
    </>
  );
}
