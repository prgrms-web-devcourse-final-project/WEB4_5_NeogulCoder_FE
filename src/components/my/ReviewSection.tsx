// import Image from 'next/image';
// import excellent from '@/assets/images/excellent.svg';
// import good from '@/assets/images/good.svg';
// import notGood from '@/assets/images/not-good.svg';

export default function ReviewSection() {
  return (
    <>
      <div className="flex flex-col gap-[50px] mt-[30px]">
        <div>
          <span className="tm2 text-text1">
            팀원 1님과의 스터디는 어떠셨나요?
          </span>
          <div className="flex justify-around mt-[26px]">
            <div className="flex justify-center items-center w-[150px] h-[70px] bg-white rounded-[10px] border border-border1 cursor-pointer">
              <span className="t3 text-text1">별로예요</span>
            </div>
            <div className="flex justify-center items-center w-[150px] h-[70px] bg-white rounded-[10px] border border-border1 cursor-pointer">
              <span className="t3 text-text1">좋아요</span>
            </div>
            <div className="flex justify-center items-center w-[150px] h-[70px] bg-white rounded-[10px] border border-border1 cursor-pointer">
              <span className="t3 text-text1">최고예요</span>
            </div>

            {/* <div className="flex flex-col justify-center items-center gap-3 w-[150px] h-[145px] bg-white rounded-[10px]  cursor-pointer">
              <Image src={notGood} alt="최고예요" />
              <span className="t3 text-text1">별로예요</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 w-[150px] h-[145px] bg-white rounded-[10px]  cursor-pointer">
              <Image src={good} alt="좋아요" />
              <span className="t3 text-text1">좋아요</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 w-[150px] h-[145px] bg-white rounded-[10px]  cursor-pointer">
              <Image src={excellent} alt="별로예요" />
              <span className="t3 text-text1">최고예요</span>
            </div> */}
          </div>
        </div>
        <div>
          <span className="tm2 text-text1">어떤 점이 최고였나요?</span>
          <div className="flex flex-col gap-6 mt-[26px]">
            <label
              htmlFor="excellent1"
              className="t3 flex items-center gap-5 cursor-pointer"
            >
              <div className="relative text-[0px]">
                <input
                  id="excellent1"
                  type="checkbox"
                  className="w-5 h-5 peer border border-border1 appearance-none rounded-sm checked:bg-main checked:border-main cursor-pointer"
                />
                <span className="pointer-events-none absolute left-[7px] top-0.5 w-1.5 h-3 border-white border-r-2 border-b-2 rotate-45 opacity-0 peer-checked:opacity-100"></span>
              </div>
              <span>항상 먼저 도와주고 분위기를 이끌어주는 팀원이었어요.</span>
            </label>
            <label
              htmlFor="excellent2"
              className="t3 flex items-center gap-5 cursor-pointer"
            >
              <div className="relative text-[0px]">
                <input
                  id="excellent2"
                  type="checkbox"
                  className="w-5 h-5 peer border border-border1 appearance-none rounded-sm checked:bg-main checked:border-main cursor-pointer"
                />
                <span className="pointer-events-none absolute left-[7px] top-0.5 w-1.5 h-3 border-white border-r-2 border-b-2 rotate-45 opacity-0 peer-checked:opacity-100"></span>
              </div>
              <span>
                책임감이 넘치고 맡은 일 이상으로 기여해줘서 감동이었어요.
              </span>
            </label>
            <label
              htmlFor="excellent3"
              className="t3 flex items-center gap-5 cursor-pointer"
            >
              <div className="relative text-[0px]">
                <input
                  id="excellent3"
                  type="checkbox"
                  className="w-5 h-5 peer border border-border1 appearance-none rounded-sm checked:bg-main checked:border-main cursor-pointer"
                />
                <span className="pointer-events-none absolute left-[7px] top-0.5 w-1.5 h-3 border-white border-r-2 border-b-2 rotate-45 opacity-0 peer-checked:opacity-100"></span>
              </div>
              <span>
                꼼꼼하고 빠른 진행 덕분에 팀 전체가 수월하게 움직였어요.
              </span>
            </label>
            <label
              htmlFor="excellent4"
              className="t3 flex items-center gap-5 cursor-pointer"
            >
              <div className="relative text-[0px]">
                <input
                  id="excellent4"
                  type="checkbox"
                  className="w-5 h-5 peer border border-border1 appearance-none rounded-sm checked:bg-main checked:border-main cursor-pointer"
                />
                <span className="pointer-events-none absolute left-[7px] top-0.5 w-1.5 h-3 border-white border-r-2 border-b-2 rotate-45 opacity-0 peer-checked:opacity-100"></span>
              </div>
              <span>
                커뮤니케이션도 최고, 실력도 최고! 이런 팀원은 흔치 않아요.
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="tm2 text-text1">자세한 피드백을 남겨주세요!</span>
          <textarea
            name=""
            id=""
            placeholder="말 한 마디로 한 사람을 성장시킬 수 있습니다."
            className="min-h-[137px] mt-[26px] px-[26px] py-[22px] t3 text-text1 border border-border1 rounded-[10px] outline-main resize-none placeholder:opacity-50"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-[30px]">
        <button className="w-[117px] h-[46px] bg-main rounded-[10px] t3 text-white hover:bg-[#292929]">
          완료
        </button>
      </div>
    </>
  );
}
