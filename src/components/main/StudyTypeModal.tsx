export default function StudyTypeModal({
  onSelect,
}: {
  onSelect: (studyType: string) => void;
}) {
  const studyType = ['전체', '온라인', '오프라인', '병행'];
  return (
    <div className='w-[132px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3'>
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
  );
}
