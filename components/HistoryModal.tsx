import React from 'react';
import { MonthlyRecord } from '../types';
import { MONTHS } from '../constants'; // For sorting

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyRecords: MonthlyRecord[];
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, monthlyRecords }) => {
  if (!isOpen) return null;

  const formatCurrency = (value: number) => 
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Sort records: most recent first
  const sortedRecords = [...monthlyRecords].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return MONTHS.indexOf(b.month) - MONTHS.indexOf(a.month);
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print:hidden" role="dialog" aria-modal="true" aria-labelledby="history-modal-title">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <h2 id="history-modal-title" className="text-xl font-semibold mb-4 text-gray-800">Histórico Financeiro</h2>
        
        {sortedRecords.length === 0 ? (
          <p className="text-gray-600">Nenhum histórico encontrado.</p>
        ) : (
          <div className="overflow-y-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês/Ano</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rendas</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Despesas</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedRecords.map(record => {
                  const totalIncome = record.incomes.reduce((sum, item) => sum + item.value, 0);
                  const totalExpenses = record.expenses.reduce((sum, item) => sum + item.value, 0);
                  const balance = totalIncome - totalExpenses;
                  return (
                    <tr key={`${record.month}-${record.year}`}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{record.month} {record.year}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 text-right">{formatCurrency(totalIncome)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 text-right">{formatCurrency(totalExpenses)}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold text-right ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {formatCurrency(balance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
