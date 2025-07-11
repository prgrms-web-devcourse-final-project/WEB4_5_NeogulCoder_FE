export default function MeetingTypeModal({
  onSelect,
}: {
  onSelect: (meeting: string) => void;
}) {
  return (
    <div className="w-[132px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3">
      <div className="flex flex-col">
        <button
          type="button"
          className="flex items-center justify-center h-[40px] w-full rounded-[10px] hover:bg-gray-100"
          onClick={() => onSelect('온라인')}
        >
          온라인
        </button>

        <button
          type="button"
          className="flex items-center justify-center h-[40px] w-full rounded-[10px] hover:bg-gray-100 mt-1"
          onClick={() => onSelect('오프라인')}
        >
          오프라인
        </button>
      </div>
    </div>
  );
}
