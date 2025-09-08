export default function RegionModal({
  onSelect,
  selectedRegion,
  customCss,
}: {
  onSelect: (region: string | null) => void;
  selectedRegion: string | null;
  customCss?: string;
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

  const handleClick = (region: string) => {
    if (selectedRegion === region) {
      onSelect(null);
    } else {
      onSelect(region);
    }
  };
  return (
    <>
      <div
        className={`bg-white border border-main/10 shadow-sm tm4 ${
          customCss ? customCss : ''
        } hidden lg:block w-[200px] rounded-[10px] p-3 `}
      >
        <div className='grid grid-cols-2 gap-2 items-center justify-center'>
          {region.map((region) => (
            <button
              type='button'
              key={region}
              className={`px-4 py-2 text-tm3 rounded-[10px] ${
                selectedRegion === region ? 'bg-gray4' : 'hover:bg-gray4'
              }`}
              onClick={() => handleClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`bg-white border border-main/10 shadow-sm tm4 ${
          customCss ? customCss : ''
        } lg:hidden fixed bottom-0 left-0 w-full max-h-[80vh] rounded-t-[20px] p-5 z-50 overflow-y-auto`}
      >
        <div className='w-[50px] h-[3px] bg-gray-300 rounded-full mx-auto mb-8 '></div>

        <div className='grid grid-cols-3 gap-3 items-center justify-center'>
          {region.map((region) => (
            <button
              type='button'
              key={region}
              className={`px-4 py-2 text-tm3 rounded-[10px] border border-gray-200 ${
                selectedRegion === region ? 'bg-gray4' : 'hover:bg-gray4'
              }`}
              onClick={() => handleClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
