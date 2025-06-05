import React, { useState, useMemo } from 'react';
import { FinancialItem, ItemType } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon'; // Using for recurring
import { InformationCircleIcon } from './icons/InformationCircleIcon'; // For notes tooltip

interface FinancialItemRowProps {
  item: FinancialItem;
  itemType: ItemType;
  onDeleteItem: (id: string, type: ItemType) => void;
  onRenameItem: (id: string, type: ItemType, currentItem: FinancialItem) => void;
  onValueChange: (id: string, value: number, type: ItemType) => void;
  categoryBudget?: number;
}

const FinancialItemRow: React.FC<FinancialItemRowProps> = ({
  item,
  itemType,
  onDeleteItem,
  onRenameItem,
  onValueChange,
  categoryBudget,
}) => {
  const [inputValue, setInputValue] = useState<string>(item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ','));


  React.useEffect(() => {
     // Update input when item.value changes externally (e.g. copy recurring sets to 0)
     setInputValue(item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ','));
  }, [item.value]);


  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);
    // Basic validation for format as user types (allows comma for decimal)
    if (rawValue === '' || rawValue === '-' || /^-?\d*[,.]?\d*$/.test(rawValue)) {
       // Valid intermediate state, actual parsing onBlur
    }
  };

  const handleBlur = () => {
    // Replace comma with dot for parseFloat, then parse
    let numericValue = parseFloat(inputValue.replace(',', '.'));
    if (isNaN(numericValue)) {
      numericValue = 0;
    }
    // Update internal state to reflect the formatted, parsed value
    setInputValue(numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ','));
    onValueChange(item.id, numericValue, itemType);
  };

  const isOverBudget = useMemo(() => {
    if (itemType === ItemType.EXPENSE && typeof categoryBudget === 'number' && item.value > categoryBudget && categoryBudget > 0) {
      return true;
    }
    return false;
  }, [itemType, item.value, categoryBudget]);

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-md border ${isOverBudget ? 'border-red-300 bg-red-50' : 'border-gray-200'} print:p-1 print:border-b print:rounded-none print:bg-transparent`}>
      <div className="flex-1 mb-2 sm:mb-0 min-w-0">
        <span className="text-gray-700 print:text-sm block truncate" title={item.name}>{item.name}</span>
        {item.category && (
          <span className="text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded-full print:text-xs mr-1">
            {item.category}
          </span>
        )}
        {item.isRecurring && (
          <ArrowPathIcon className="w-3 h-3 inline text-blue-500 print:hidden" title="Item Recorrente" />
        )}
        {item.notes && (
          <span className="group relative inline-block ml-1 print:hidden">
            <InformationCircleIcon className="w-4 h-4 inline text-gray-400 hover:text-gray-600" />
            <span className="absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-xs -translate-x-1/2 transform rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity break-words">
              {item.notes}
            </span>
          </span>
        )}
        {isOverBudget && (
           <span className="text-xs text-red-600 block sm:inline ml-0 sm:ml-1">(Acima do orçamento da categoria!)</span>
        )}
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 w-full sm:w-auto">
        <span className="text-gray-500 print:hidden">R$</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleValueChange}
          onBlur={handleBlur}
          className={`p-1.5 sm:p-2 border border-gray-300 rounded-md w-24 text-right focus:ring-primary focus:border-primary print:border-none print:p-0 print:w-16 print:text-sm ${isOverBudget ? 'border-red-500' : ''}`}
          aria-label={`Valor para ${item.name}`}
        />
        <button
          onClick={() => onRenameItem(item.id, itemType, item)}
          className="p-1.5 sm:p-2 text-gray-500 hover:text-primary transition-colors print:hidden"
          aria-label={`Editar ${item.name}`}
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDeleteItem(item.id, itemType)}
          className="p-1.5 sm:p-2 text-gray-500 hover:text-danger transition-colors print:hidden"
          aria-label={`Excluir ${item.name}`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FinancialItemRow;
