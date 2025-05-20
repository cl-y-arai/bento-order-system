import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('ja')}
        className={`px-3 py-1 rounded-md transition-colors ${
          language === 'ja'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        日本語
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md transition-colors ${
          language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('th')}
        className={`px-3 py-1 rounded-md transition-colors ${
          language === 'th'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        ไทย
      </button>
    </div>
  );
};

export default LanguageSwitch; 