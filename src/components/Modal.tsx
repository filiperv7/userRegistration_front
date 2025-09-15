import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative z-50">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        
        {/* <div>{content}</div> */}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-gray-200 p-2 rounded cursor-pointer"
            onClick={onClose}
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              className="bg-blue-600 text-white p-2 rounded cursor-pointer"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};