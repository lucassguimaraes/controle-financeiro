import React, { useMemo } from 'react';
import { FinancialItem } from '../types';

interface ExpenseChartProps {
  expenses: FinancialItem[];
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C', 
  '#D0ED57', '#FFC658', '#8884D8', '#8DD1E1', '#82CA9D',
  '#FA8072', '#FF6347', '#FFD700', '#ADFF2F', '#7FFFD4' 
]; // Add more colors if needed

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const dataForChart = useMemo(() => {
    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach(expense => {
      const category = expense.category || 'Sem Categoria';
      categoryTotals[category] = (categoryTotals[category] || 0) + expense.value;
    });
    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .filter(entry => entry.value > 0) // Only positive values for chart
      .sort((a,b) => b.value - a.value); // Sort for consistent color assignment
  }, [expenses]);

  if (dataForChart.length === 0) {
    return <p className="text-center text-gray-500 italic py-4">Nenhuma despesa para exibir no gráfico.</p>;
  }

  const totalExpensesValue = dataForChart.reduce((sum, item) => sum + item.value, 0);
  if (totalExpensesValue === 0) {
     return <p className="text-center text-gray-500 italic py-4">Valores de despesa zerados.</p>;
  }

  let accumulatedAngle = 0;

  const viewBoxSize = 200; // Defines the coordinate system size
  const radius = 80; // Radius of the pie chart
  const center = viewBoxSize / 2;

  return (
    <div className="flex flex-col items-center print:items-start">
      <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} width="100%" height={viewBoxSize} className="max-w-xs mx-auto print:max-w-[150px]">
        {dataForChart.map((entry, index) => {
          const percentage = (entry.value / totalExpensesValue);
          const angle = percentage * 360;
          const startAngleRad = (accumulatedAngle - 90) * (Math.PI / 180); // -90 to start from top
          const endAngleRad = ((accumulatedAngle + angle) - 90) * (Math.PI / 180);

          const x1 = center + radius * Math.cos(startAngleRad);
          const y1 = center + radius * Math.sin(startAngleRad);
          const x2 = center + radius * Math.cos(endAngleRad);
          const y2 = center + radius * Math.sin(endAngleRad);

          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${center},${center}`, // Move to center
            `L ${x1},${y1}`, // Line to first point on arc
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}`, // Arc to second point
            'Z' // Close path (back to center)
          ].join(' ');

          accumulatedAngle += angle;

          return (
            <path
              key={entry.name}
              d={pathData}
              fill={COLORS[index % COLORS.length]}
            >
              <title>{`${entry.name}: R$ ${entry.value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${(percentage * 100).toFixed(1)}%)`}</title>
            </path>
          );
        })}
      </svg>
      <div className="mt-3 text-xs w-full max-w-xs mx-auto print:text-[8px] print:leading-tight print:mt-1">
        {dataForChart.slice(0, 7).map((entry, index) => ( // Show top 7 for brevity
          <div key={entry.name} className="flex items-center justify-between mb-0.5 print:mb-0">
            <div className="flex items-center">
              <span style={{ backgroundColor: COLORS[index % COLORS.length] }} className="w-2.5 h-2.5 rounded-full mr-1.5 print:w-1.5 print:h-1.5 print:mr-1"></span>
              <span className="truncate" title={entry.name}>{entry.name}</span>
            </div>
            <span className="font-medium">{(entry.value / totalExpensesValue * 100).toFixed(1)}%</span>
          </div>
        ))}
        {dataForChart.length > 7 && <p className="text-center text-gray-500 text-[10px] print:text-[7px]">...e mais</p>}
      </div>
    </div>
  );
};

export default ExpenseChart;
