export default function NoticeItem(props: {
  title: string;
  createdAt: string;
}) {
  const { title, createdAt } = props;
  return (
    <div className="flex justify-between items-center cursor-pointer">
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-[47px] py-[3px] rounded-[20px] bg-red">
          <span className="tb5 text-white">공지</span>
        </div>
        <div className="tm2 text-text1 w-[600px] truncate">{title}</div>
      </div>
      <div className="t4 text-text1 opacity-30">{createdAt}</div>
    </div>
  );
}
