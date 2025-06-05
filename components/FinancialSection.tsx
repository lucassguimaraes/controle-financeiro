import React, { useMemo } from 'react';
import { FinancialItem, ItemType } from '../types';
import FinancialItemRow from './FinancialItemRow';
import { PlusIcon } from './icons/PlusIcon';

interface FinancialSectionProps {
  title: string;
  items: FinancialItem[];
  itemType: ItemType;
  onAddItem: () => void;
  onDeleteItem: (id: string, type: ItemType) => void;
  onRenameItem: (id: string, type: ItemType, currentItem: FinancialItem) => void;
  onValueChange: (id: string, value: number, type: ItemType) => void;
  categories: string[];
  budgets?: { [category: string]: number };
}

const FinancialSection: React.FC<FinancialSectionProps> = ({
  title,
  items,
  itemType,
  onAddItem,
  onDeleteItem,
  onRenameItem,
  onValueChange,
  categories, // Unused directly here, but passed to item rows or for future category-specific logic
  budgets, // For expenses section
}) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  // Calculate total budget for expenses if applicable
  const totalBudget = useMemo(() => {
    if (itemType === ItemType.EXPENSE && budgets) {
      return Object.values(budgets).reduce((sum, budgetVal) => sum + budgetVal, 0);
    }
    return null;
  }, [itemType, budgets]); // Removed items dependency as it's not directly used for total budget calculation

  return (
    <section className="p-4 md:p-6 bg-white rounded-lg shadow-md border border-gray-200 print:shadow-none print:border-none print:p-2 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 print:text-lg">{title}</h2>
      </div>
      <div className="space-y-3"> {/* Removed flex-grow */}
        {items.length === 0 && (
          <p className="text-gray-500 italic">Nenhum item adicionado.</p>
        )}
        {items.map((item) => (
          <FinancialItemRow
            key={item.id}
            item={item}
            itemType={itemType}
            onDeleteItem={onDeleteItem}
            onRenameItem={onRenameItem}
            onValueChange={onValueChange}
            categoryBudget={itemType === ItemType.EXPENSE && item.category && budgets ? budgets[item.category] : undefined}
          />
        ))}
      </div>
      
      <div className="mt-4 print:hidden">
        <button
          onClick={onAddItem}
          className="w-full flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
          aria-label={itemType === ItemType.INCOME ? "Adicionar Nova Renda" : "Adicionar Nova Despesa"}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          {itemType === ItemType.INCOME ? "Adicionar Nova Renda" : "Adicionar Nova Despesa"}
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-lg font-semibold text-right text-gray-800 print:text-base">
          Total {title}: <span className={itemType === ItemType.INCOME ? "text-green-600" : "text-red-600"}>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </p>
        {itemType === ItemType.EXPENSE && totalBudget !== null && totalBudget > 0 && (
           <p className="text-sm text-right text-gray-600 print:text-xs">
            Orçamento Total: R$ {totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            {total > totalBudget && <span className="text-red-500 ml-1">(Ultrapassado!)</span>}
          </p>
        )}
      </div>
    </section>
  );
};

export default FinancialSection;