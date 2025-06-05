import React, { useState, useEffect } from 'react';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  currentBudgets: { [category: string]: number };
  onSave: (newBudgets: { [category: string]: number }) => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ isOpen, onClose, categories, currentBudgets, onSave }) => {
  const [budgets, setBudgets] = useState<{ [category: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      const initialBudgets = categories.reduce((acc, cat) => {
        acc[cat] = currentBudgets[cat]?.toString() || '';
        return acc;
      }, {} as { [category: string]: string });
      setBudgets(initialBudgets);
    }
  }, [isOpen, categories, currentBudgets]);

  const handleChange = (category: string, value: string) => {
    // Allow only numbers or empty string
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setBudgets(prev => ({ ...prev, [category]: value }));
    }
  };

  const handleSave = () => {
    const numericBudgets = Object.entries(budgets).reduce((acc, [cat, valStr]) => {
      const valNum = parseFloat(valStr.replace(',', '.'));
      if (!isNaN(valNum) && valNum > 0) {
        acc[cat] = valNum;
      }
      return acc;
    }, {} as { [category: string]: number });
    onSave(numericBudgets);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print:hidden" role="dialog" aria-modal="true" aria-labelledby="budget-modal-title">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <h2 id="budget-modal-title" className="text-xl font-semibold mb-4 text-gray-800">Gerenciar Orçamentos de Despesas</h2>
        
        <div className="overflow-y-auto flex-grow pr-2">
          {categories.length === 0 && <p className="text-gray-600">Nenhuma categoria de despesa definida.</p>}
          {categories.map(category => (
            <div key={category} className="flex items-center justify-between mb-3">
              <label htmlFor={`budget-${category}`} className="text-gray-700 flex-1 mr-2">{category}:</label>
              <div className="flex items-center">
                <span className="mr-1 text-gray-500">R$</span>
                <input
                  type="text"
                  id={`budget-${category}`}
                  value={budgets[category] || ''}
                  onChange={(e) => handleChange(category, e.target.value)}
                  placeholder="0,00"
                  className="w-32 p-2 border border-gray-300 rounded-md text-right focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Salvar Orçamentos
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
