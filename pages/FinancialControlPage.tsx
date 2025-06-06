import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FinancialItem, UserSettings, MonthlyRecord, AppData } from '../types';
import { ItemType, MONTHS, INITIAL_INCOMES, INITIAL_EXPENSES, generateId, LOCAL_STORAGE_KEY, INITIAL_CATEGORIES_INCOME, INITIAL_CATEGORIES_EXPENSE } from '../constants';
import Header from '../components/Header';
import MonthYearSelector from '../components/MonthYearSelector';
import FinancialSection from '../components/FinancialSection';
import SummarySection from '../components/SummarySection';
import PdfExportButton from '../components/PdfExportButton';
import Modal from '../components/Modal';
import BudgetModal from '../components/BudgetModal';
import HistoryModal from '../components/HistoryModal';
import { CogIcon } from '../components/icons/CogIcon';
import { ArchiveBoxIcon } from '../components/icons/ArchiveBoxIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';

const FinancialControlPage: React.FC = () => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState<string>(MONTHS[currentMonthIndex]);
  const [year, setYear] = useState<number>(currentYear);
  const [incomes, setIncomes] = useState<FinancialItem[]>([]);
  const [expenses, setExpenses] = useState<FinancialItem[]>([]);
  
  const [userSettings, setUserSettings] = useState<UserSettings>({
    categoriesIncome: INITIAL_CATEGORIES_INCOME,
    categoriesExpense: INITIAL_CATEGORIES_EXPENSE,
    expenseBudgets: {},
  });
  const [allMonthlyRecords, setAllMonthlyRecords] = useState<MonthlyRecord[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    fields?: Array<{ name: string; label: string; type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'creatable-select'; value?: any; options?: string[]; placeholder?: string; itemType?: ItemType }>;
    onConfirm: (values?: any) => void;
    confirmText?: string;
    content?: React.ReactNode;
  } | null>(null);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);

  // Load data from localStorage
  useEffect(() => {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawData) {
      try {
        const parsedData: AppData = JSON.parse(rawData);
        setAllMonthlyRecords(parsedData.monthlyData || []);
        setUserSettings(parsedData.userSettings || {
          categoriesIncome: INITIAL_CATEGORIES_INCOME,
          categoriesExpense: INITIAL_CATEGORIES_EXPENSE,
          expenseBudgets: {},
        });
        
        const currentRecord = parsedData.monthlyData?.find(r => r.month === MONTHS[currentMonthIndex] && r.year === currentYear);
        if (currentRecord) {
          setIncomes(currentRecord.incomes);
          setExpenses(currentRecord.expenses);
        } else {
          setIncomes(INITIAL_INCOMES);
          setExpenses(INITIAL_EXPENSES);
        }
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setIncomes(INITIAL_INCOMES);
        setExpenses(INITIAL_EXPENSES);
        setUserSettings({
          categoriesIncome: INITIAL_CATEGORIES_INCOME,
          categoriesExpense: INITIAL_CATEGORIES_EXPENSE,
          expenseBudgets: {},
        });
      }
    } else {
      // First time load or no data
      setIncomes(INITIAL_INCOMES);
      setExpenses(INITIAL_EXPENSES);
      setUserSettings({
        categoriesIncome: INITIAL_CATEGORIES_INCOME,
        categoriesExpense: INITIAL_CATEGORIES_EXPENSE,
        expenseBudgets: {},
      });
    }
  }, []); // Load once on mount, ensure month/year are default for first load

  // Save data to localStorage
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === null && allMonthlyRecords.length === 0 && incomes.length === 0 && expenses.length === 0){
        if (INITIAL_INCOMES.length > 0 || INITIAL_EXPENSES.length > 0) {
             // If initial constants have data, proceed to save them as the first record
        } else {
            return;
        }
    }

    const currentDataExists = allMonthlyRecords.some(r => r.month === month && r.year === year);
    let updatedMonthlyRecords = [...allMonthlyRecords];

    if (incomes.length > 0 || expenses.length > 0 || currentDataExists ) {
        const currentRecordIndex = updatedMonthlyRecords.findIndex(r => r.month === month && r.year === year);
        const newRecord: MonthlyRecord = { month, year, incomes, expenses };
        if (currentRecordIndex > -1) {
            updatedMonthlyRecords[currentRecordIndex] = newRecord;
        } else {
            updatedMonthlyRecords.push(newRecord);
        }
    }
    
    const recordsToSave = updatedMonthlyRecords.filter(r => 
        (r.incomes.length > 0 || r.expenses.length > 0) || (r.month === month && r.year === year)
    );

    const dataToSave: AppData = { monthlyData: recordsToSave, userSettings };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    setAllMonthlyRecords(recordsToSave); 
  }, [incomes, expenses, month, year, userSettings, allMonthlyRecords]);


  const handleMonthYearChange = useCallback((newMonth: string, newYear: number) => {
    const existingRecord = allMonthlyRecords.find(r => r.month === newMonth && r.year === newYear);
    if (existingRecord) {
      setIncomes(existingRecord.incomes);
      setExpenses(existingRecord.expenses);
    } else {
      // When switching to a new month/year without existing data,
      // use the initial predefined incomes and expenses.
      setIncomes(INITIAL_INCOMES); 
      setExpenses(INITIAL_EXPENSES); 
    }
    setMonth(newMonth);
    setYear(newYear);
  }, [allMonthlyRecords]);


  const openModal = useCallback((config: NonNullable<typeof modalConfig>) => {
    setModalConfig(config);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalConfig(null);
  }, []);
  
  const getCategoryOptions = (type: ItemType) => {
    return type === ItemType.INCOME ? userSettings.categoriesIncome : userSettings.categoriesExpense;
  };

  const handleAddItem = useCallback((type: ItemType) => {
    openModal({
      title: `Adicionar Nov${type === ItemType.INCOME ? 'a Renda' : 'a Despesa'}`,
      fields: [
        { name: 'name', label: 'Nome', type: 'text', value: '' },
        { name: 'category', label: 'Categoria', type: 'creatable-select', options: getCategoryOptions(type), value: '', itemType: type, placeholder: 'Selecione ou crie uma categoria' },
        { name: 'notes', label: 'Notas (Opcional)', type: 'textarea', value: '' },
        { name: 'isRecurring', label: 'Item Recorrente', type: 'checkbox', value: false },
      ],
      confirmText: 'Adicionar',
      onConfirm: (values) => {
        if (values.name && values.name.trim() !== '') {
          const newItem: FinancialItem = { 
            id: generateId(), 
            name: values.name.trim(), 
            value: 0, 
            category: values.category?.trim() || undefined,
            notes: values.notes?.trim() || undefined,
            isRecurring: values.isRecurring || false,
          };
          if (type === ItemType.INCOME) {
            setIncomes(prev => [...prev, newItem]);
            if (values.category && !userSettings.categoriesIncome.includes(values.category)) {
              setUserSettings(prev => ({...prev, categoriesIncome: [...prev.categoriesIncome, values.category]}));
            }
          } else {
            setExpenses(prev => [...prev, newItem]);
             if (values.category && !userSettings.categoriesExpense.includes(values.category)) {
              setUserSettings(prev => ({...prev, categoriesExpense: [...prev.categoriesExpense, values.category]}));
            }
          }
          closeModal();
        } else {
          alert("O nome não pode estar vazio.");
        }
      }
    });
  }, [openModal, closeModal, userSettings.categoriesIncome, userSettings.categoriesExpense]);
  
  const handleRenameItem = useCallback((id: string, type: ItemType, currentItem: FinancialItem) => {
    openModal({
      title: `Editar ${type === ItemType.INCOME ? 'Renda' : 'Despesa'}`,
      fields: [
        { name: 'name', label: 'Nome', type: 'text', value: currentItem.name },
        { name: 'category', label: 'Categoria', type: 'creatable-select', options: getCategoryOptions(type), value: currentItem.category || '', itemType: type, placeholder: 'Selecione ou crie uma categoria'},
        { name: 'notes', label: 'Notas (Opcional)', type: 'textarea', value: currentItem.notes || '' },
        { name: 'isRecurring', label: 'Item Recorrente', type: 'checkbox', value: currentItem.isRecurring || false },
      ],
      confirmText: 'Salvar',
      onConfirm: (values) => {
        if (values.name && values.name.trim() !== '') {
          const setter = type === ItemType.INCOME ? setIncomes : setExpenses;
          setter(prev => prev.map(item => item.id === id ? { 
            ...item, 
            name: values.name.trim(),
            category: values.category?.trim() || undefined,
            notes: values.notes?.trim() || undefined,
            isRecurring: values.isRecurring || false,
          } : item));

          if (values.category) {
            const categoryList = type === ItemType.INCOME ? userSettings.categoriesIncome : userSettings.categoriesExpense;
            if (!categoryList.includes(values.category)) {
              setUserSettings(prev => type === ItemType.INCOME ? 
                {...prev, categoriesIncome: [...prev.categoriesIncome, values.category]} :
                {...prev, categoriesExpense: [...prev.categoriesExpense, values.category]}
              );
            }
          }
          closeModal();
        } else {
          alert("O nome não pode estar vazio.");
        }
      }
    });
  }, [openModal, closeModal, userSettings.categoriesIncome, userSettings.categoriesExpense]);

  const handleDeleteItem = useCallback((id: string, type: ItemType) => {
    openModal({
      title: `Excluir ${type === ItemType.INCOME ? 'Renda' : 'Despesa'}?`,
      content: <p>Tem certeza que deseja excluir este item: <strong>{ (type === ItemType.INCOME ? incomes : expenses).find(i=>i.id===id)?.name }</strong>?</p>,
      confirmText: 'Excluir',
      onConfirm: () => {
        const setter = type === ItemType.INCOME ? setIncomes : setExpenses;
        setter(prev => prev.filter(item => item.id !== id));
        closeModal();
      }
    });
  }, [openModal, closeModal, incomes, expenses]);

  const handleValueChange = useCallback((id: string, newValue: number, type: ItemType) => {
    const setter = type === ItemType.INCOME ? setIncomes : setExpenses;
    setter(prev => prev.map(item => item.id === id ? { ...item, value: isNaN(newValue) ? 0 : newValue } : item));
  }, []);

  const handleUpdateBudgets = useCallback((newBudgets: { [category: string]: number }) => {
    setUserSettings(prev => ({ ...prev, expenseBudgets: newBudgets }));
    setIsBudgetModalOpen(false);
  }, []);

  const handleCopyRecurringItems = useCallback(() => {
    const currentMonthIndexValue = MONTHS.indexOf(month);
    const prevMonthData = currentMonthIndexValue === 0 
      ? { month: MONTHS[11], year: year - 1 } 
      : { month: MONTHS[currentMonthIndexValue - 1], year: year };

    const prevMonthRecord = allMonthlyRecords.find(r => r.month === prevMonthData.month && r.year === prevMonthData.year);

    if (!prevMonthRecord) {
      alert("Nenhum dado encontrado para o mês anterior para copiar itens recorrentes.");
      return;
    }

    const recurringIncomesToCopy = prevMonthRecord.incomes
        .filter(item => item.isRecurring)
        .map(item => ({ ...item, id: generateId(), value: item.value })); 
    
    const recurringExpensesToCopy = prevMonthRecord.expenses
        .filter(item => item.isRecurring)
        .map(item => ({ ...item, id: generateId(), value: item.value })); 

    setIncomes(prev => {
      const existingNames = new Set(prev.map(i => i.name.toLowerCase()));
      const newItems = recurringIncomesToCopy.filter(ri => !existingNames.has(ri.name.toLowerCase()));
      return [...prev, ...newItems];
    });
    setExpenses(prev => {
      const existingNames = new Set(prev.map(i => i.name.toLowerCase()));
      const newItems = recurringExpensesToCopy.filter(re => !existingNames.has(re.name.toLowerCase()));
      return [...prev, ...newItems];
    });

    alert("Itens recorrentes do mês anterior foram copiados.");

  }, [month, year, allMonthlyRecords]);


  const totalIncome = useMemo(() => incomes.reduce((sum, item) => sum + item.value, 0), [incomes]);
  const totalExpenses = useMemo(() => expenses.reduce((sum, item) => sum + item.value, 0), [expenses]);
  const balance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  return (
    <>
      <div 
        id="pdf-content-area" 
        className="bg-white p-4 md:p-6 rounded-lg shadow-xl max-w-4xl mx-auto my-8 print:shadow-none print:p-0 print:bg-white print:my-0 print:mx-0 print:max-w-full"
      >
        <Header title="Controle Financeiro Familiar" />
        <MonthYearSelector
          month={month}
          year={year}
          onMonthChange={(newMonth) => handleMonthYearChange(newMonth, year)}
          onYearChange={(newYear) => handleMonthYearChange(month, newYear)}
          months={MONTHS}
        />
        <div className="flex flex-wrap justify-center gap-2 my-4 print:hidden">
            <button
                onClick={handleCopyRecurringItems}
                className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm shadow"
                title="Copiar itens recorrentes do mês anterior"
            >
                <ArrowPathIcon className="w-5 h-5 mr-1" /> Copiar Recorrentes
            </button>
            <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="flex items-center bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 transition-colors text-sm shadow"
                title="Gerenciar orçamentos"
            >
                <CogIcon className="w-5 h-5 mr-1" /> Orçamentos
            </button>
            <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="flex items-center bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors text-sm shadow"
                title="Ver histórico financeiro"
            >
                <ArchiveBoxIcon className="w-5 h-5 mr-1" /> Histórico
            </button>
        </div>

        <div className="mt-6 space-y-6 md:space-y-8 print:space-y-4 print:mt-2">
          <FinancialSection
            title="Rendas"
            items={incomes}
            itemType={ItemType.INCOME}
            onAddItem={() => handleAddItem(ItemType.INCOME)}
            onDeleteItem={handleDeleteItem}
            onRenameItem={handleRenameItem}
            onValueChange={handleValueChange}
            categories={userSettings.categoriesIncome}
          />
          <FinancialSection
            title="Despesas"
            items={expenses}
            itemType={ItemType.EXPENSE}
            onAddItem={() => handleAddItem(ItemType.EXPENSE)}
            onDeleteItem={handleDeleteItem}
            onRenameItem={handleRenameItem}
            onValueChange={handleValueChange}
            categories={userSettings.categoriesExpense}
            budgets={userSettings.expenseBudgets}
          />
        </div>
        <SummarySection
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          expenses={expenses} 
          expenseCategories={userSettings.categoriesExpense}
          expenseBudgets={userSettings.expenseBudgets}
        />
      </div>
      <div className="fixed bottom-6 right-6 z-50 print:hidden">
         <PdfExportButton targetId="pdf-content-area" month={month} year={year} />
      </div>
      
      {isModalOpen && modalConfig && (
        <Modal
          title={modalConfig.title}
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={modalConfig.onConfirm}
          fields={modalConfig.fields}
          confirmText={modalConfig.confirmText}
          content={modalConfig.content}
        />
      )}
      {isBudgetModalOpen && (
        <BudgetModal
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          categories={userSettings.categoriesExpense}
          currentBudgets={userSettings.expenseBudgets}
          onSave={handleUpdateBudgets}
        />
      )}
      {isHistoryModalOpen && (
        <HistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          monthlyRecords={allMonthlyRecords}
        />
      )}
    </>
  );
};

export default FinancialControlPage;