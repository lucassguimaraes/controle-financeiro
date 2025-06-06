import React, { useState, useMemo } from 'react';

// SVG Icons (Heroicons style)
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500 hover:text-blue-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500 hover:text-red-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.528 0c-.985 0-1.953.186-2.872.547M8 10.5h4.744" />
  </svg>
);

const RecurringIcon = () => ( // ArrowPathIcon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-500 ml-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.695V7.711a2.25 2.25 0 012.25-2.25h.002c.917 0 1.73.432 2.278 1.125l.092.142m-6.018 0c.37.483.897.923 1.482 1.272M16.023 9.348L15.03 12.74a2.25 2.25 0 01-2.12 1.61H9.092a2.25 2.25 0 01-2.12-1.61L6.002 9.347m10.021 0a50.034 50.034 0 00-8.044 0" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5-.124m7.5 10.375a3 3 0 01-3-3V8.625a3 3 0 013-3h3.75a3 3 0 013 3v6.75a3 3 0 01-3 3h-3.75z" />
  </svg>
);
const BudgetIcon = () => ( // Cog6ToothIcon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93s.844.17 1.25.07l.894-.148c.542-.09.999.166 1.247.602l.548 1.093c.248.436.113.998-.213 1.32l-.785.786c-.29.29-.398.72-.32 1.11s.255.714.594.92l.812.507c.436.248.692.73.602 1.247l-.15.894c-.09.542-.398 1.02-.94 1.11l-.893.15c-.425.07-.765.384-.93.78s-.17.844-.07 1.25l.148.894c.09.542-.166.999-.602 1.247l-1.093.548c-.436.248-.998.113-1.32-.213l-.786-.785a1.5 1.5 0 00-1.11-.32c-.4.08-.714.255-.92.594l-.507.812c-.248.436-.73.692-1.247.602l-.894-.15c-.542-.09-1.02-.398-1.11-.94l-.149-.893c-.07-.425-.384-.765-.78-.93s-.844-.17-1.25-.07l-.894.148c-.542.09-.999-.166-1.247-.602l-.548-1.093c-.248-.436-.113-.998.213 1.32l.785.786c.29.29.398.72-.32-1.11s.255.714.594.92l.812.507c.436.248.692.73.602 1.247l.15.894c.09.542.398 1.02.94 1.11l.893.15c.425.07.765.384.93.78s.17.844.07 1.25l-.148.894c-.09.542.166.999.602 1.247l1.093.548c.436.248.998.113-1.32.213l.786-.785a1.5 1.5 0 00-1.11.32zM12 14.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);
const HistoryIcon = () => ( // CalendarDaysIcon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 12.75h.008v.008H12v-.008z" />
  </svg>
);


interface FinancialItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  isRecurring: boolean;
}

const initialIncomes: FinancialItem[] = [
  { id: 'inc1', name: 'Salário Principal', category: 'Salário', amount: 0, isRecurring: true },
];

const initialExpenses: FinancialItem[] = [
  { id: 'exp1', name: 'Aluguel/Financiamento', category: 'Moradia', amount: 0, isRecurring: true },
  { id: 'exp2', name: 'Supermercado', category: 'Alimentação', amount: 0, isRecurring: false },
  { id: 'exp3', name: 'Contas (Água, Luz, Gás, Internet)', category: 'Contas Fixas', amount: 0, isRecurring: true },
  { id: 'exp4', name: 'Transporte', category: 'Transporte', amount: 0, isRecurring: false },
  { id: 'exp5', name: 'Plano de Saúde/Medicamentos', category: 'Saúde', amount: 0, isRecurring: true },
];

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);


const HomePage: React.FC = () => {
  const [incomes, setIncomes] = useState<FinancialItem[]>(initialIncomes);
  const [expenses, setExpenses] = useState<FinancialItem[]>(initialExpenses);
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const handleItemChange = (
    id: string,
    field: keyof FinancialItem,
    value: string | number | boolean,
    type: 'income' | 'expense'
  ) => {
    const setter = type === 'income' ? setIncomes : setExpenses;
    setter(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: field === 'amount' ? parseFloat(value as string) || 0 : value } : item
      )
    );
  };
  
  const handleAddItem = (type: 'income' | 'expense') => {
    const newItem: FinancialItem = {
      id: `${type}${Date.now()}`,
      name: `Nova ${type === 'income' ? 'Renda' : 'Despesa'}`,
      category: 'Outros',
      amount: 0,
      isRecurring: false,
    };
    if (type === 'income') {
      setIncomes(prev => [...prev, newItem]);
    } else {
      setExpenses(prev => [...prev, newItem]);
    }
  };

  const handleDeleteItem = (id: string, type: 'income' | 'expense') => {
    const setter = type === 'income' ? setIncomes : setExpenses;
    setter(prevItems => prevItems.filter(item => item.id !== id));
  };


  const totalIncomes = useMemo(() => incomes.reduce((sum, item) => sum + item.amount, 0), [incomes]);
  const totalExpenses = useMemo(() => expenses.reduce((sum, item) => sum + item.amount, 0), [expenses]);
  const finalBalance = totalIncomes - totalExpenses;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const FinancialItemRow: React.FC<{ item: FinancialItem, type: 'income' | 'expense' }> = ({ item, type }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div>
        <p className="font-medium text-gray-700">{item.name}</p>
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full inline-flex items-center">
          {item.category}
          {item.isRecurring && <RecurringIcon />}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">R$</span>
        <input
          type="number"
          value={item.amount === 0 ? '' : item.amount.toString()} // Show empty for 0 for better UX
          onChange={(e) => handleItemChange(item.id, 'amount', e.target.value, type)}
          placeholder="0,00"
          className="w-24 text-right p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          aria-label={`Valor para ${item.name}`}
        />
        <button onClick={() => console.log('Edit', item.id)} aria-label={`Editar ${item.name}`}>
          <PencilIcon />
        </button>
        <button onClick={() => handleDeleteItem(item.id, type)} aria-label={`Excluir ${item.name}`}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );


  return (
    <div className="max-w-6xl mx-auto py-8 px-4 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Controle Financeiro Familiar (Old HomePage)</h1>
      </header>

      {/* Controls Section */}
      <div className="bg-white p-5 rounded-xl shadow-lg mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              aria-label="Selecionar Mês"
            >
              {MONTHS.map(month => <option key={month} value={month}>{month}</option>)}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              aria-label="Selecionar Ano"
            >
              {YEARS.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-150 text-sm">
              <CopyIcon /> Copiar Recorrentes
            </button>
            <button className="flex items-center bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-150 text-sm">
              <BudgetIcon /> Orçamentos
            </button>
            <button className="flex items-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-150 text-sm">
              <HistoryIcon /> Histórico
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Rendas & Despesas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Rendas */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rendas</h2>
          <div className="space-y-1 mb-6">
            {incomes.map(item => <FinancialItemRow key={item.id} item={item} type="income" />)}
          </div>
          <button 
            onClick={() => handleAddItem('income')}
            className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition-colors duration-150">
            <PlusIcon /> Adicionar Nova Renda
          </button>
          <div className="mt-6 text-right">
            <span className="text-gray-700 font-semibold text-lg">Total Rendas: </span>
            <span className="text-green-600 font-bold text-lg">{formatCurrency(totalIncomes)}</span>
          </div>
        </section>

        {/* Despesas */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Despesas</h2>
          <div className="space-y-1 mb-6">
            {expenses.map(item => <FinancialItemRow key={item.id} item={item} type="expense" />)}
          </div>
          <button 
            onClick={() => handleAddItem('expense')}
            className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition-colors duration-150">
            <PlusIcon /> Adicionar Nova Despesa
          </button>
          <div className="mt-6 text-right">
            <span className="text-gray-700 font-semibold text-lg">Total Despesas: </span>
            <span className="text-red-600 font-bold text-lg">{formatCurrency(totalExpenses)}</span>
          </div>
        </section>
      </div>

      {/* Resumo Financeiro */}
      <section className="bg-white p-8 rounded-xl shadow-lg mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Resumo Financeiro</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <span className="text-lg text-gray-700">Total de Rendas:</span>
              <span className="text-lg font-bold text-green-600">{formatCurrency(totalIncomes)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <span className="text-lg text-gray-700">Total de Despesas:</span>
              <span className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</span>
            </div>
            <div className={`flex justify-between items-center p-5 rounded-lg shadow-md ${finalBalance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <span className={`text-xl font-semibold ${finalBalance >= 0 ? 'text-green-700' : 'text-red-700'}`}>Saldo Final:</span>
              <span className={`text-xl font-bold ${finalBalance >= 0 ? 'text-green-700' : 'text-red-700'}`}>{formatCurrency(finalBalance)}</span>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm h-full flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Distribuição de Despesas</h3>
            <p className="text-gray-500">
              {totalExpenses > 0 ? "(Gráfico será exibido aqui)" : "Nenhuma despesa para exibir no gráfico."}
            </p>
            {/* Placeholder for chart */}
            <div className="w-full h-48 bg-gray-200 rounded-md mt-4 flex items-center justify-center text-gray-400">
              Chart Area
            </div>
          </div>
        </div>
      </section>

      {/* Save PDF Button - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-xl transition-all duration-150 ease-in-out transform hover:scale-105">
          Salvar em PDF (A4)
        </button>
      </div>
    </div>
  );
};

export default HomePage;