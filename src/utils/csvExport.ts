import { Order, DepartmentTotal } from '../types';
import { translations } from '../translations';

export const generateCsv = (orders: Order[], language: 'ja' | 'en'): string => {
  if (orders.length === 0) return '';
  
  const t = translations[language];
  
  // Header row
  let csv = `${t.employeeId},${t.department},${t.selectedBento},${t.total}\n`;
  
  // Order rows
  orders.forEach(order => {
    csv += `${order.employeeId},${order.department},${order.bento.name},${order.bento.price}\n`;
  });
  
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
  
  // Empty row
  csv += '\n';
  
  // Department totals
  csv += `${t.departmentTotal}\n`;
  departmentTotals.forEach(dept => {
    csv += `${dept.department},,${dept.total}円\n`;
  });
  
  // Total amount
  const totalAmount = orders.reduce((sum, order) => sum + order.bento.price, 0);
  csv += `\n${t.total},,${totalAmount}円\n`;
  
  return csv;
};

export const downloadCsv = (orders: Order[], language: 'ja' | 'en'): void => {
  const csv = generateCsv(orders, language);
  
  // Create a blob with the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  // Set link properties
  link.setAttribute('href', url);
  link.setAttribute('download', `bento_orders_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  
  // Add link to document, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};