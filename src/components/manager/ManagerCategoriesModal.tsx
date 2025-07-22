export default function CategoriesModal({
  onSelect,
  customCss,
}: {
  onSelect: (category: string) => void;
  customCss?: string;
}) {
  const category = [
    'All',
    'LANGUAGE',
    'IT',
    'EXAM',
    'FINANCE',
    'MANAGEMENT',
    'DESIGN',
    'ART',
    'PHOTO_VIDEO',
    'BEAUTY',
    'SPORTS',
    'HOBBY',
    'ETC',
  ];
  return (
    <div
      className={`w-[200px] border border-main/10 bg-white rounded-[10px] shadow-sm overflow-hidden tm4 p-3 px-1.5 ${
        customCss ? customCss : ''
      }`}
    >
      <div className='grid grid-cols-1 gap-1.5 items-center justify-center'>
        {category.map((category) => (
          <button
            type='button'
            key={category}
            className='px-3 py-1.5 text-left hover:bg-gray4 rounded-[10px]'
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
