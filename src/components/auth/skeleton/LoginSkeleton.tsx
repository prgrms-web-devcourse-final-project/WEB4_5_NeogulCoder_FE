export default function LoginSkeleton() {
  return (
    <>
      <div className='flex flex-col h-screen gap-8 justify-center text-center'>
        <div className='mx-auto'>
          <div className='flex justify-center items-center mb-6 relative h-12 w-12'>
            <span className='loader'></span>
          </div>
        </div>
      </div>
    </>
  );
}
