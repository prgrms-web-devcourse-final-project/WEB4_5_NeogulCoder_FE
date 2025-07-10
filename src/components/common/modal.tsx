import { X } from "lucide-react";

type ModalProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function Modal({ className, children }: ModalProps) {
  return (
    <div className={`rounded-[10px] border-2 p-10 ${className}`}>
      <div className='flex justify-between w-full mb-4'>
        <span className='tm0'>모집 신청하기</span>
        <X />
      </div>
      {children}
    </div>
  );
}
