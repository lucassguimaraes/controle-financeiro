import React, { useMemo } from 'react';
import { FinancialItem } from '../types';
import ExpenseChart from './ExpenseChart'; // Novo componente

interface SummarySectionProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  expenses: FinancialItem[]; // Para o gráfico
  expenseCategories: string[]; // Para o gráfico
  expenseBudgets: { [category: string]: number };
}

const SummarySection: React.FC<SummarySectionProps> = ({
  totalIncome,
  totalExpenses,
  balance,
  expenses,
  expenseCategories,
  expenseBudgets,
}) => {
  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalBudgeted = useMemo(() => {
    return Object.values(expenseBudgets).reduce((sum, budget) => sum + budget, 0);
  }, [expenseBudgets]);

  return (
    <section className="mt-8 p-4 md:p-6 bg-gray-100 rounded-lg shadow-md print:bg-transparent print:shadow-none print:p-2 print:mt-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 text-center print:text-lg print:mb-2">Resumo Financeiro</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm print:p-1 print:shadow-none print:border-b">
            <span className="text-gray-600 print:text-sm">Total de Rendas:</span>
            <span className="font-semibold text-green-600 print:text-sm">{formatCurrency(totalIncome)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm print:p-1 print:shadow-none print:border-b">
            <span className="text-gray-600 print:text-sm">Total de Despesas:</span>
            <span className="font-semibold text-red-600 print:text-sm">{formatCurrency(totalExpenses)}</span>
          </div>
           {totalBudgeted > 0 && (
            <div className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm print:p-1 print:shadow-none print:border-b">
              <span className="text-gray-600 print:text-sm">Total Orçado (Despesas):</span>
              <span className={`font-semibold print:text-sm ${totalExpenses > totalBudgeted ? 'text-red-500' : 'text-blue-600'}`}>
                {formatCurrency(totalBudgeted)}
                {totalExpenses > totalBudgeted && <span className="ml-1 text-xs">(Ultrapassado)</span>}
              </span>
            </div>
          )}
          <div className={`flex justify-between items-center p-3 rounded-md shadow-sm text-white ${balance >= 0 ? 'bg-secondary' : 'bg-danger'} print:p-1 print:shadow-none print:border-b ${balance >= 0 ? 'print:text-green-700 print:bg-transparent' : 'print:text-red-700 print:bg-transparent'}`}>
            <span className="font-bold print:text-sm">Saldo Final:</span>
            <span className="font-bold text-lg print:text-base">{formatCurrency(balance)}</span>
          </div>
        </div>

        <div className="p-3 bg-white rounded-md shadow-sm h-full print:p-1 print:shadow-none">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center print:text-base">Distribuição de Despesas</h3>
          {expenses.length > 0 ? (
            <ExpenseChart expenses={expenses} />
          ) : (
            <p className="text-center text-gray-500 italic py-8">Sem dados de despesas para exibir o gráfico.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
