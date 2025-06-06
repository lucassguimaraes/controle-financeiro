import React from 'react';
import { FinancialItem } from '../types';
import { ItemType } from '../constants'; // Ensure ItemType is imported

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

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.528 0c-.985 0-1.953.186-2.872.547M8 10.5h4.744" />
  </svg>
);

const FinancialSection: React.FC<FinancialSectionProps> = ({
  title,
  items,
  itemType,
  onAddItem,
  onDeleteItem,
  onRenameItem,
  onValueChange,
}) => {
  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="bg-white p-4 md:p-6 rounded-lg shadow-md print:shadow-none print:p-2">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 print:text-lg">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md print:p-1 print:bg-transparent print:border-b">
            <div className="flex-1">
              <span className="text-gray-800 font-medium print:text-sm">{item.name}</span>
              {item.category && <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full print:hidden">{item.category}</span>}
              {item.isRecurring && <span className="ml-1 text-blue-500 print:hidden" title="Recorrente">↻</span>}
              {item.notes && <p className="text-xs text-gray-500 mt-0.5 print:hidden">{item.notes}</p>}
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-sm text-gray-600 print:text-xs">R$</span>
              <input
                type="number"
                aria-label={`Valor para ${item.name}`}
                value={item.value === 0 ? '' : item.value.toString()}
                placeholder="0.00"
                onChange={(e) => onValueChange(item.id, parseFloat(e.target.value) || 0, itemType)}
                className="w-20 md:w-28 text-right p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 print:border-none print:w-16 print:text-sm"
              />
              <button onClick={() => onRenameItem(item.id, itemType, item)} className="text-blue-600 hover:text-blue-800 print:hidden" title="Editar Item">
                <PencilIcon />
              </button>
              <button onClick={() => onDeleteItem(item.id, itemType)} className="text-red-600 hover:text-red-800 print:hidden" title="Excluir Item">
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500 text-sm print:hidden">Nenhum item adicionado.</p>}
      </div>
      <button
        onClick={onAddItem}
        className="mt-4 w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-colors print:hidden"
      >
        <PlusIcon /> Adicionar Nov{itemType === ItemType.INCOME ? 'a Renda' : 'a Despesa'}
      </button>
       <div className="mt-4 text-right">
        <span className="text-gray-700 font-semibold">Total {title}: </span>
        <span className={`font-bold ${itemType === ItemType.INCOME ? 'text-green-600' : 'text-red-600'}`}>
          R$ {formatCurrency(items.reduce((sum, item) => sum + item.value, 0))}
        </span>
      </div>
    </section>
  );
};

export default FinancialSection;
