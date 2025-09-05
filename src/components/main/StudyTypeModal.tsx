export default function StudyTypeModal({
  selectedStudyType,
  onSelect,
  onClose,
}: {
  selectedStudyType: string;
  onSelect: (studyType: string) => void;
  onClose: () => void;
}) {
  const studyType = ['전체', '온라인', '오프라인', '온/오프라인'];
  return (
    <>
      <div className='w-[132px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3 max-[1024px]:hidden'>
        <div className='flex flex-col gap-2'>
          {studyType.map((studyType) => (
            <button
              key={studyType}
              className='px-4 py-2 text-tm3 hover:bg-gray4 rounded-[10px] text-left'
              onClick={() => onSelect(studyType)}
            >
              {studyType}
            </button>
          ))}
        </div>
      </div>

      <div
        className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-end justify-center lg:hidden'
        onClick={onClose}
      >
        <div
          className='w-full flex flex-col gap-5 px-9 pt-6 pb-9 rounded-t-[24px] bg-white drop-shadow-md'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='w-[50px] h-[3px] bg-border1 rounded-[3px] mx-auto'
            onClick={onClose}
          ></div>
          <p className='tm3 text-text1'>진행 방식</p>
          <div className='flex flex-wrap gap-3'>
            {studyType.map((studyType) => (
              <button
                key={studyType}
                className={`flex-none px-[18px] py-[6px] tm4 text-text1/30 border-[1.2px] border-main/10 hover:bg-gray4 rounded-[50px] text-center whitespace-nowrap ${
                  selectedStudyType === studyType &&
                  'text-text1/100 border-main/100 bg-main/4'
                }`}
                onClick={() => onSelect(studyType)}
              >
                {studyType}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
