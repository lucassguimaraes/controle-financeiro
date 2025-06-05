
import React from 'react';

interface MonthYearSelectorProps {
  month: string;
  year: number;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
  months: string[];
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  month,
  year,
  onMonthChange,
  onYearChange,
  months,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i); // +/- 5 years

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 p-4 bg-gray-100 rounded-lg shadow print:bg-transparent print:shadow-none print:p-0 print:mb-2">
      <div>
        <label htmlFor="month-select" className="sr-only">Mês:</label>
        <select
          id="month-select"
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary print:border-none print:p-1"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="year-input" className="sr-only">Ano:</label>
        <select
          id="year-input"
          value={year}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary print:border-none print:p-1"
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthYearSelector;
