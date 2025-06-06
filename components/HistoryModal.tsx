import React from 'react';
import { MonthlyRecord } from '../types';
import { MONTHS } from '../constants'; // Importado de constants.ts

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyRecords: MonthlyRecord[];
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, monthlyRecords }) => {
  if (!isOpen) return null;

  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:hidden">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Histórico Financeiro Mensal</h2>
        <div className="max-h-[70vh] overflow-y-auto space-y-4">
          {monthlyRecords.length === 0 ? (
            <p className="text-gray-500">Nenhum histórico encontrado.</p>
          ) : (
            [...monthlyRecords] // Create a new array before sorting
            .sort((a, b) => b.year - a.year || MONTHS.indexOf(b.month) - MONTHS.indexOf(a.month)) // Sort descending
            .map(record => {
              const totalIncomes = record.incomes.reduce((sum, item) => sum + item.value, 0);
              const totalExpenses = record.expenses.reduce((sum, item) => sum + item.value, 0);
              const balance = totalIncomes - totalExpenses;
              return (
                <details key={`${record.year}-${record.month}`} className="bg-gray-50 p-3 rounded-md">
                  <summary className="font-semibold text-gray-700 cursor-pointer">
                    {record.month} {record.year} - Saldo: <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(balance)}</span>
                  </summary>
                  <div className="mt-2 pl-4 text-sm">
                    <p>Rendas: <span className="text-green-500">{formatCurrency(totalIncomes)}</span></p>
                    <p>Despesas: <span className="text-red-500">{formatCurrency(totalExpenses)}</span></p>
                    <h4 className="font-medium mt-1">Detalhes Rendas:</h4>
                    {record.incomes.length > 0 ? record.incomes.map(inc => <p key={inc.id} className="ml-2">{inc.name}: {formatCurrency(inc.value)}</p>) : <p className="ml-2 italic">Nenhuma renda</p>}
                    <h4 className="font-medium mt-1">Detalhes Despesas:</h4>
                    {record.expenses.length > 0 ? record.expenses.map(exp => <p key={exp.id} className="ml-2">{exp.name}: {formatCurrency(exp.value)}</p>) : <p className="ml-2 italic">Nenhuma despesa</p>}
                  </div>
                </details>
              );
            })
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;