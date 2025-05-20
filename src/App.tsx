import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BentoSelection from './components/BentoSelection';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import LanguageSwitch from './components/LanguageSwitch';
import { Bento, Order } from './types';
import bentos from './data/bentos';
import { downloadCsv } from './utils/csvExport';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations';

function App() {
  const [selectedBento, setSelectedBento] = useState<Bento | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  const handleSelectBento = (bento: Bento) => {
    setSelectedBento(bento);
  };

  const handleSubmitOrder = (employeeId: string, department: string, bento: Bento) => {
    const newOrder: Order = {
      id: uuidv4(),
      employeeId,
      department,
      bento,
    };
    setOrders([...orders, newOrder]);
    setSelectedBento(null);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleDownloadCsv = () => {
    downloadCsv(orders, language);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
            <LanguageSwitch />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BentoSelection
              bentos={bentos}
              selectedBento={selectedBento}
              onSelectBento={handleSelectBento}
            />
            
            <OrderForm
              selectedBento={selectedBento}
              onSubmitOrder={handleSubmitOrder}
            />
          </div>
          
          <div className="lg:col-span-1">
            <OrderList
              orders={orders}
              onDeleteOrder={handleDeleteOrder}
              onDownloadCsv={handleDownloadCsv}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;