import React, { useMemo } from 'react';
import { FinancialItem } from '../types';

interface SummarySectionProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  expenses: FinancialItem[]; 
  expenseCategories: string[]; // Not directly used for chart data, but available
  expenseBudgets: { [category: string]: number }; // Not directly used for chart data
}

// Predefined colors for pie chart slices
const PIE_CHART_COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#f59e0b', // amber-500
  '#64748b', // slate-500
  '#06b6d4', // cyan-500
  '#22c55e', // green-500
];

const PieChartComponent: React.FC<{ data: Array<{ name: string; value: number; percentage: number; color: string }> }> = ({ data }) => {
  const radius = 40;
  const center = 50;
  let accumulatedAngle = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = center + radius * Math.cos(2 * Math.PI * percent);
    const y = center + radius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start md:gap-x-6">
      <svg width="160" height="160" viewBox="0 0 100 100" className="mb-4 md:mb-0 transform -rotate-90">
        {data.map((slice, index) => {
          const [startX, startY] = getCoordinatesForPercent(accumulatedAngle);
          accumulatedAngle += slice.percentage / 100;
          const [endX, endY] = getCoordinatesForPercent(accumulatedAngle);

          const largeArcFlag = slice.percentage > 50 ? 1 : 0;

          const pathData = [
            `M ${center},${center}`, // Move to center
            `L ${startX},${startY}`, // Line to start of arc
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`, // Arc
            'Z', // Close path
          ].join(' ');

          return <path key={index} d={pathData} fill={slice.color} />;
        })}
      </svg>
      <div className="text-sm space-y-1.5 md:self-center">
        {data.map((slice, index) => (
          <div key={index} className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-2.5 shrink-0"
              style={{ backgroundColor: slice.color }}
            ></span>
            <span className="text-gray-600">{slice.name}: {slice.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const SummarySection: React.FC<SummarySectionProps> = ({
  totalIncome,
  totalExpenses,
  balance,
  expenses,
}) => {
  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const expenseDataForChart = useMemo(() => {
    if (!expenses || expenses.length === 0 || totalExpenses <= 0) {
      return [];
    }

    const categoriesSum: { [key: string]: number } = {};
    expenses.forEach(expense => {
      const categoryName = expense.category || 'Outros';
      categoriesSum[categoryName] = (categoriesSum[categoryName] || 0) + expense.value;
    });

    return Object.entries(categoriesSum)
      .filter(([, value]) => value > 0) // Only positive values
      .map(([name, value], index) => ({
        name,
        value,
        percentage: (value / totalExpenses) * 100,
        color: PIE_CHART_COLORS[index % PIE_CHART_COLORS.length],
      }))
      .sort((a,b) => b.value - a.value); // Sort by value descending
  }, [expenses, totalExpenses]);

  return (
    <section className="bg-white p-4 md:p-6 mt-8 rounded-lg shadow-md print:shadow-none print:p-2 print:mt-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 text-center print:text-lg">Resumo Financeiro</h2>
      <div className="space-y-3 md:space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md print:p-1.5">
          <span className="text-gray-700 print:text-sm">Total de Rendas:</span>
          <span className="font-bold text-green-600 print:text-sm">{formatCurrency(totalIncome)}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md print:p-1.5">
          <span className="text-gray-700 print:text-sm">Total de Despesas:</span>
          <span className="font-bold text-red-600 print:text-sm">{formatCurrency(totalExpenses)}</span>
        </div>
        <div className={`flex justify-between items-center p-3 rounded-md font-semibold ${
          balance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        } print:p-1.5`}>
          <span className="print:text-sm">Saldo Final:</span>
          <span className="print:text-sm">{formatCurrency(balance)}</span>
        </div>
      </div>
      
      {/* Pie Chart Section */}
      <div className="mt-6 print:hidden">
        <h3 className="text-lg font-semibold text-gray-600 mb-3 text-center">Distribuição de Despesas</h3>
        {expenseDataForChart && expenseDataForChart.length > 0 ? (
          <PieChartComponent data={expenseDataForChart} />
        ) : (
          <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 text-sm p-4">
            Nenhuma despesa para exibir no gráfico.
          </div>
        )}
      </div>
    </section>
  );
};

export default SummarySection;