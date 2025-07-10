import Comment from "@/components/common/comment";
import WriteComment from "@/components/common/writeComment";
import Modal from "@/components/common/modal";
import HelpModal from "@/components/common/helpModal";
// import ClientEditorWrapper from "@/components/common/ClientEditorWrapper";

export default async function page() {
  return (
    <>
      <div className=' flex flex-col max-w-[1248px] justify-center  '>
        <WriteComment />
        <Comment />
        <Comment />
        <Modal className='w-[600px] h-[400px]' />
        {/* <ClientEditorWrapper /> */}
        <HelpModal />
      </div>
    </>
  );
}
