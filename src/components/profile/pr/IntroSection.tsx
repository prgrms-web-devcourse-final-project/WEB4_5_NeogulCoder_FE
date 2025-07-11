export default function IntroSection() {
  const userIntro =
    '약속은  꼭 지키는 편입니다. 정해진 시간보다 조금 일찍 참여하려고 노력하고, 팀 일정 항상 꼼꼼하게 확인하며 놓치지 않으려 합니다. 모임이나 회의가 있을 땐, 사소한 부분이라도 빠뜨리지 않으려고 체크하고, 팀원들과의 커뮤니케이션에서도 책임감을 가지고 임하려 합니다. 모르는 부분이 생기면 숨기지 않고, 솔직하게 공유하고, 제가 알고 있는 내용이나 자료는 최대한 나누려고 합니다. 저는 말수가 많지는 않지만, 주어진 역할을 성실하게 수행하며 꾸준히 참여할 수 있는 사람입니다. 조용하지만 성실한 팀원을 찾고 계신다면, 분명히 잘 맞을 거라고 생각합니다. 감사합니다.';
  return (
    <>
      <div className="w-full h-[385px] border border-main/10 rounded-[10px] p-5">
        <p className="tm3 mb-20">소개글</p>
        <p className="leading-8">{userIntro}</p>
      </div>
    </>
  );
}
