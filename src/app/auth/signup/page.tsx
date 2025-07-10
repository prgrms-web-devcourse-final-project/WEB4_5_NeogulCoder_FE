import Image from 'next/image';
import topBlue from '@/assets/images/auth-top-right-blue.svg';
import bottomPink from '@/assets/images/auth-bottom-left-pink.svg';
import musicBunny from '@/assets/images/music-bunny.svg';
import logoWibby from '@/assets/images/wibby.svg';

export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex justify-center relative">
      <Image
        src={topBlue}
        alt="로그인 및 회원가입 페이지 배경 도형"
        className="absolute top-0 right-0"
      />

      <div className="absolute bottom-0 left-0">
        <Image
          src={bottomPink}
          alt="로그인 및 회원가입 페이지 배경 도형"
          className="relative"
        />
        <Image
          src={musicBunny}
          alt="토끼 캐릭터"
          className="absolute bottom-0 drop-shadow-[0_8px_10px_rgba(0,0,0,0.15)]"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <Image src={logoWibby} alt="로고" className="mb-[96px] w-30" />
        <div className="z-10">
          <div className="mb-8">
            <p className="pb-3">이메일</p>
            <input
              type="text"
              placeholder="입력해주세요"
              className="input-type3 w-[390px] focus:outline-2 focus:outline-main"
            />
          </div>
          <div className="mb-8">
            <p className="pb-3">닉네임</p>
            <input
              type="text"
              placeholder="입력해주세요"
              className="input-type3 w-[390px] focus:outline-2 focus:outline-main"
            />
          </div>
          <div className="mb-[35px]">
            <p className="pb-3">비밀번호</p>
            <input
              type="password"
              placeholder="입력해주세요"
              className="input-type3 w-[390px] focus:outline-2 focus:outline-main"
            />
          </div>
          <div className="mb-[35px]">
            <p className="pb-3">비밀번호 확인</p>
            <input
              type="password"
              placeholder="입력해주세요"
              className="input-type3 w-[390px] focus:outline-2 focus:outline-main"
            />
          </div>
          <input
            type="button"
            className="button-type1 cursor-pointer mb-[14px]"
            value={'회원가입'}
          />
        </div>
      </div>
    </div>
  );
}
