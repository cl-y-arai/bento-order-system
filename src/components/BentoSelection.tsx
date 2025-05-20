import React from 'react';
import { Bento } from '../types';
import BentoCard from './BentoCard';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface BentoSelectionProps {
  bentos: Bento[];
  selectedBento: Bento | null;
  onSelectBento: (bento: Bento) => void;
}

const BentoSelection: React.FC<BentoSelectionProps> = ({
  bentos,
  selectedBento,
  onSelectBento,
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{t.selectBento}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bentos.map((bento) => (
          <BentoCard
            key={bento.id}
            bento={bento}
            isSelected={selectedBento?.id === bento.id}
            onClick={() => onSelectBento(bento)}
          />
        ))}
      </div>
    </div>
  );
};

export default BentoSelection;