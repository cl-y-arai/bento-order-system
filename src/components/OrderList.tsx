import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Order, DepartmentTotal } from '../types';
import DeleteConfirmation from './DeleteConfirmation';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface OrderListProps {
  orders: Order[];
  onDeleteOrder: (id: string) => void;
  onDownloadCsv: () => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onDeleteOrder, onDownloadCsv }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  const handleDeleteClick = (id: string) => {
    setOrderToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      onDeleteOrder(orderToDelete);
      setOrderToDelete(null);
    }
  };

  // Calculate department totals
  const departmentTotals: DepartmentTotal[] = orders.reduce((acc: DepartmentTotal[], order) => {
    const existingDept = acc.find(d => d.department === order.department);
    
    if (existingDept) {
      existingDept.total += order.bento.price;
    } else {
      acc.push({ department: order.department, total: order.bento.price });
    }
    
    return acc;
  }, []);

  // Calculate total amount
  const totalAmount = orders.reduce((sum, order) => sum + order.bento.price, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.orderList}</h2>
        <button
          onClick={onDownloadCsv}
          disabled={orders.length === 0}
          className={`px-4 py-2 rounded-md transition-colors ${
            orders.length > 0
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t.downloadCsv}
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t.noOrders}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.employeeId}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.department}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.selectedBento}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.total}
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    {t.operations}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{order.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.bento.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.bento.price}円</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDeleteClick(order.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">{t.departmentTotal}</h3>
            <div className="space-y-2 mb-4">
              {departmentTotals.map((dept) => (
                <div key={dept.department} className="flex justify-between">
                  <span>{dept.department}:</span>
                  <span className="font-medium">{dept.total}円</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between border-t pt-2 text-lg font-bold">
              <span>{t.total}:</span>
              <span>{totalAmount}円</span>
            </div>
          </div>
        </>
      )}

      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default OrderList;