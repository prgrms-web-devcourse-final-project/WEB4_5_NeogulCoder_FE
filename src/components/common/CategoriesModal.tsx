export default function CategoriesModal({
  onSelect,
  customCss,
}: {
  onSelect: (category: string) => void;
  customCss?: string;
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
    <div
      className={`w-[200px] border border-main/10 bg-white rounded-[10px] shadow-sm overflow-hidden tm4 p-3 ${
        customCss ? customCss : ''
      }`}
    >
      <div className='grid grid-cols-2 gap-2 items-center justify-center'>
        {category.map((category) => (
          <button
            type='button'
            key={category}
            className='px-4 py-2 text-tm3 hover:bg-gray4 rounded-[10px]'
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
