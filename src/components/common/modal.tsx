import { X } from 'lucide-react';
import { useEffect } from 'react';

type ModalProps = {
  onClose: () => void;
  className?: string;
  title?: string;
  children?: React.ReactNode;
};

export default function Modal({
  onClose,
  className,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className='fixed inset-0 z-50'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={onClose} />

      <div className='absolute inset-0 flex justify-center items-center'>
        <div
          className={`bg-white rounded-[10px] p-10 ${className} overflow-auto relative`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-between w-full mb-4'>
            <span className='tb2'>{title}</span>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
