import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages size={20} className="text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'ja' | 'en')}
        className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="ja">日本語</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSwitch;