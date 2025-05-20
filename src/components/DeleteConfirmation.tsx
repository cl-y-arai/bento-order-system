import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ isOpen, onClose, onConfirm }) => {
  const { language } = useLanguage();
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4">{t.deleteConfirmTitle}</h3>
        <p className="mb-6">{t.deleteConfirmMessage}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            {t.delete}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;