"use client";

import Comment from "@/components/common/Comment";
import WriteComment from "@/components/common/WriteComment";
import Modal from "@/components/common/Modal";
import HelpModal from "@/components/common/HelpModal";
import { useState } from "react";
// import ClientEditorWrapper from "@/components/common/ClientEditorWrapper";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className=' flex flex-col max-w-[1248px] justify-center  '>
        <WriteComment />
        <Comment />
        <Comment />
        {isOpen && (
          <Modal
            onClose={() => setIsOpen(false)}
            className='w-[600px] h-[400px]'
          />
        )}
        {/* <ClientEditorWrapper /> */}
        <HelpModal />
      </div>
    </>
  );
}
