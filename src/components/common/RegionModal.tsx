export default function RegionModal({
  onSelect,
}: {
  onSelect: (region: string) => void;
}) {
  const region = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '강원도',
    '제주도',
  ];
  return (
    <div className='w-[200px] border border-main/10 bg-white rounded-[10px] shadow-sm overflow-hidden tm4 p-3'>
      <div className='grid grid-cols-2 gap-2 items-center justify-center'>
        {region.map((region) => (
          <button
            type='button'
            key={region}
            className='px-4 py-2 text-tm3 hover:bg-gray4 rounded-[10px]'
            onClick={() => onSelect(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
