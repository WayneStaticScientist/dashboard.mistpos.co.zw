import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose?: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  placement?: 'center' | 'top';
}

export const Modal = ({
  isOpen,
  onOpenChange,
  onClose,
  children,
  size = 'md',
  placement = 'center',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose ? onClose() : onOpenChange(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onOpenChange, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose ? onClose() : onOpenChange(false);
    }
  };

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full m-4',
  };

  const alignments = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-16',
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm p-4 ${alignments[placement]}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`w-full bg-ui-surface border border-ui-border rounded-xl shadow-xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 ${sizes[size]}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export const ModalContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col w-full h-full">{children}</div>
);

export const ModalHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-b border-ui-border text-lg font-semibold text-ui-text-main shrink-0 ${className}`}>
    {children}
  </div>
);

export const ModalBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 overflow-y-auto flex-1 ${className}`}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 border-t border-ui-border flex items-center justify-end gap-2 shrink-0 ${className}`}>
    {children}
  </div>
);

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  return { isOpen, onOpen, onClose, onOpenChange };
};
