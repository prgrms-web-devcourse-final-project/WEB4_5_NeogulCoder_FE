export default function StudyListModal({
  studyList,
  onSelect,
}: {
  studyList: { studyId: number; name: string }[];
  onSelect: (studyId: number) => void;
}) {
  return (
    <div className='w-[320px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3'>
      <div className='flex flex-col gap-2'>
        {studyList.map((study) => (
          <button
            key={study.studyId}
            className='px-4 py-2 text-tm3 hover:bg-gray4 rounded-[10px]'
            onClick={() => onSelect(study.studyId)}
          >
            {study.name}
          </button>
        ))}
      </div>
    </div>
  );
}
