export default function RemainSlotModal({
  onSelect,
}: {
  onSelect: (recruitmentCount: number) => void;
}) {
  // 선택 가능한 인원 목록
  const recruitmentCounts = [
    { label: '1명', value: 1 },
    { label: '2명', value: 2 },
    { label: '3명', value: 3 },
    { label: '4명', value: 4 },
    { label: '5명', value: 5 },
    { label: '6명', value: 6 },
    { label: '7명', value: 7 },
    { label: '8명', value: 8 },
    { label: '9명', value: 9 },
    { label: '10명 이상', value: 10 },
  ];

  return (
    <div className='w-full lg:w-[440px] border border-main/10 bg-white rounded-[20px] shadow-lg overflow-hidden tm4 p-3'>
      <div className='flex flex-col gap-2'>
        {recruitmentCounts.map(({ label, value }) => (
          <button
            key={value}
            className='px-4 py-2 text-tm3 hover:bg-gray4 rounded-[10px]'
            onClick={() => onSelect(value)}
            type='button'
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
