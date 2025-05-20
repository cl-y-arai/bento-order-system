import React from 'react';
import { Bento } from '../types';

interface BentoCardProps {
  bento: Bento;
  isSelected: boolean;
  onClick: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ bento, isSelected, onClick }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 transform ${
        isSelected 
          ? 'ring-4 ring-blue-500 scale-105' 
          : 'hover:shadow-xl hover:scale-102'
      }`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={bento.image} 
          alt={bento.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold">{bento.name}</h3>
          <p className="text-lg font-semibold">{bento.price}円</p>
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default BentoCard;