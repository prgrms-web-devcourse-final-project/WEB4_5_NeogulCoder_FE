type ManagerStudyType = {
  name: string;
};
export default function ManagerStudyList({
  study,
}: {
  study: ManagerStudyType;
}) {
  return (
    <tr className='h-13 tm4 text-center border-b border-border1 last:border-b-0 hover:bg-gray4'>
      <td className='px-5 '>{study.name}</td>
      <td className='px-5'>
        <button className='tag-type3 red'>삭제</button>
      </td>
    </tr>
  );
}
