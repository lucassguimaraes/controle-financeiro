import React, { useState, useEffect } from 'react';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  currentBudgets: { [category: string]: number };
  onSave: (newBudgets: { [category: string]: number }) => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ isOpen, onClose, categories, currentBudgets, onSave }) => {
  const [budgets, setBudgets] = useState<{ [category: string]: number }>({});

  useEffect(() => {
    if (isOpen) {
      setBudgets(currentBudgets);
    }
  }, [isOpen, currentBudgets]);

  if (!isOpen) return null;

  const handleChange = (category: string, value: string) => {
    setBudgets(prev => ({ ...prev, [category]: parseFloat(value) || 0 }));
  };

  const handleSave = () => {
    onSave(budgets);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:hidden">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Gerenciar Orçamentos de Despesas</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {categories.map(category => (
            <div key={category} className="flex items-center justify-between">
              <label htmlFor={`budget-${category}`} className="text-gray-700">{category}:</label>
              <div className="flex items-center">
                <span className="mr-1 text-gray-600">R$</span>
                <input
                  type="number"
                  id={`budget-${category}`}
                  value={budgets[category] || ''}
                  placeholder="0.00"
                  onChange={e => handleChange(category, e.target.value)}
                  className="w-32 p-2 border border-gray-300 rounded-md text-right"
                />
              </div>
            </div>
          ))}
          {categories.length === 0 && <p className="text-gray-500">Nenhuma categoria de despesa definida.</p>}
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">Salvar Orçamentos</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
