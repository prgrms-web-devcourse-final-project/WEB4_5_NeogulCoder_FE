export default function CategoryModal({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) {
  const category = [
    '어학',
    'IT',
    '고시/자격증',
    '금융',
    '경영',
    '디자인',
    '예술',
    '사진/영상',
    '뷰티',
    '스포츠',
    '취미',
    '기타',
  ];
  return (
    <div className="w-[132px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3">
      <div className="flex flex-col gap-2">
        {category.map((category) => (
          <button
            key={category}
            className="px-4 py-2 text-tm3 hover:bg-gray-100 rounded-[10px]"
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
