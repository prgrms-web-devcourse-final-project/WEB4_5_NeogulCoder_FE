export default function SortingTypeModal({
  onSelect,
}: {
  onSelect: (sorting: string) => void;
}) {
  return (
    <div className="w-[132px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3">
      <div className="flex flex-col">
        <button
          type="button"
          className="flex items-center justify-center h-10 w-full rounded-[10px] hover:bg-gray4"
          onClick={() => onSelect('최신순')}
        >
          최신순
        </button>

        <button
          type="button"
          className="flex items-center justify-center h-[40px] w-full rounded-[10px] hover:bg-gray4 mt-1"
          onClick={() => onSelect('댓글순')}
        >
          댓글순
        </button>
      </div>
    </div>
  );
}
