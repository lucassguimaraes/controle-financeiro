import React, { useState, useEffect } from 'react';
import { ItemType } from '../constants';

interface ModalField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'creatable-select';
  value?: any;
  options?: string[];
  placeholder?: string;
  itemType?: ItemType; // For creatable-select to fetch correct categories
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields?: ModalField[];
  content?: React.ReactNode;
  onConfirm: (values?: any) => void;
  confirmText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  content,
  onConfirm,
  confirmText = 'Confirmar',
}) => {
  const [formValues, setFormValues] = useState<any>({});
  const [newCategory, setNewCategory] = useState('');


  useEffect(() => {
    if (fields) {
      const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = field.value === undefined ? (field.type === 'checkbox' ? false : '') : field.value;
        return acc;
      }, {} as any);
      setFormValues(initialValues);
    }
  }, [fields, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormValues((prev: any) => ({ ...prev, [name]: checked }));
    } else {
        setFormValues((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleCreatableChange = (name: string, value: string) => {
    if (value === '__add_new__') {
        const created = window.prompt("Nova categoria:");
        if (created && created.trim() !== "") {
            setFormValues((prev: any) => ({ ...prev, [name]: created.trim() }));
            // Note: Actual update to global categories list should happen in onConfirm in parent component
            setNewCategory(created.trim()); // Trigger re-render for select
        } else {
            setFormValues((prev: any) => ({ ...prev, [name]: '' })); // Reset if cancelled
        }
    } else {
        setFormValues((prev: any) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = () => {
    onConfirm(formValues);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:hidden">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {content ? (
          <div>{content}</div>
        ) : (
          fields && fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              ) : field.type === 'select' || field.type === 'creatable-select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={(e) => field.type === 'creatable-select' ? handleCreatableChange(field.name, e.target.value) : handleChange(e) }
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">{field.placeholder || 'Selecione...'}</option>
                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  {newCategory && !field.options?.includes(newCategory) && <option value={newCategory}>{newCategory}</option>}
                  {field.type === 'creatable-select' && <option value="__add_new__">Adicionar nova...</option>}
                </select>
              ) : field.type === 'checkbox' ? (
                 <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={formValues[field.name] || false}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              )}
            </div>
          ))
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
