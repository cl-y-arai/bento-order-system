import React, { useState } from 'react';
import { Bento } from '../types';
import { departments } from '../data/departments';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface OrderFormProps {
  selectedBento: Bento | null;
  onSubmitOrder: (employeeId: string, department: string, bento: Bento) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ selectedBento, onSubmitOrder }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState(departments[0]);
  const { language } = useLanguage();
  const t = translations[language];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBento && employeeId.trim() && department) {
      onSubmitOrder(employeeId.trim(), department, selectedBento);
      setEmployeeId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
            {t.employeeId}
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            {t.department}
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700">{t.selectedBento}:</p>
          <p className="font-semibold">
            {selectedBento ? `${selectedBento.name} (${selectedBento.price}円)` : t.selectBento}
          </p>
        </div>
        
        <button
          type="submit"
          disabled={!selectedBento}
          className={`px-6 py-2 rounded-md text-white font-medium transition-all duration-200 ${
            selectedBento
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {t.order}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;