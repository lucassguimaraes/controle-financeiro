import React from 'react';

interface MonthYearSelectorProps {
  month: string;
  year: number;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
  months: string[];
}

const currentFullYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentFullYear - 5 + i);

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  months,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 my-6 print:my-2 print:justify-start">
      <select
        aria-label="Selecionar Mês"
        value={month}
        onChange={(e) => onMonthChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        aria-label="Selecionar Ano"
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearSelector;
