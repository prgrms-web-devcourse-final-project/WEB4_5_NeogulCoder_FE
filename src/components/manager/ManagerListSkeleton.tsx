export default function ManagerListSkeleton({
  colsNumber,
}: {
  colsNumber: number;
}) {
  return (
    <>
      <tr className='h-13 border-b border-border1 last:border-b-0'>
        {Array.from({ length: colsNumber }).map((_, i) => (
          <td key={i} className='align-middle px-4'>
            <div className='w-full h-7 bg-neutral-100 animate-pulse rounded mx-auto'></div>
          </td>
        ))}
      </tr>
    </>
  );
}
