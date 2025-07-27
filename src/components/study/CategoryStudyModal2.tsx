export default function CategoryStudyModal2({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) {
  const categories = [
    { label: '공지', value: 'NOTICE' },
    { label: '자유', value: 'FREE' },
  ];
  return (
    <div className='w-[320px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3'>
      <div className='flex flex-col gap-2'>
        {categories.map(({ label, value }) => (
          <button
            key={value}
            className='px-4 py-2 text-tm3 hover:bg-gray4 rounded-[10px]'
            onClick={() => onSelect(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
