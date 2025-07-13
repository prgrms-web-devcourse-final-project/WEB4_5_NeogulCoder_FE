export default function CategoryStudyModal({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) {
  const category = ['공지', '자유'];
  return (
    <div className="w-[132px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3">
      <div className="flex flex-col gap-2">
        {category.map((category) => (
          <button
            key={category}
            className="px-4 py-2 text-tm3 hover:bg-gray4 rounded-[10px]"
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
