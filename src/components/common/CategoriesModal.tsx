import { categoryFormatting } from '@/utils/categoryFormatting';

export default function CategoriesModal({
  onSelect,
  customCss,
}: {
  onSelect: (category: string) => void;
  customCss?: string;
}) {
  const category = [
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
            {categoryFormatting(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
