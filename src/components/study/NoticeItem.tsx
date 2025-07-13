export default function NoticeItem(props: {
  title: string;
  createdAt: string;
}) {
  const { title, createdAt } = props;
  return (
    <div className="flex justify-between items-center cursor-pointer">
      <div className="flex gap-3 items-center">
        <div className="tag-type3 red py-3">
          <span className="tb5">공지</span>
        </div>
        <div className="tm3 text-text1 w-[600px] truncate">{title}</div>
      </div>
      <div className="t4 text-text1 opacity-30">{createdAt}</div>
    </div>
  );
}
