import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ItemType } from '../types'; // For itemType prop in creatable-select

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'creatable-select';
  value?: any;
  options?: string[]; // For select and creatable-select
  placeholder?: string;
  itemType?: ItemType; // For creatable-select to access correct category list
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (values?: any) => void; // values will be an object of fieldName: fieldValue
  fields?: FormField[];
  content?: React.ReactNode; // For simple confirmation modals without forms
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onConfirm,
  fields,
  content,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && fields) {
      const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = field.value !== undefined ? field.value : (field.type === 'checkbox' ? false : '');
        return acc;
      }, {} as { [key: string]: any });
      setFormValues(initialValues);
      // Focus the first input field when modal opens
      setTimeout(() => firstInputRef.current?.focus(), 0);
    }
  }, [isOpen, fields]);

  const handleInputChange = (name: string, value: any, type: string) => {
    setFormValues(prev => ({ ...prev, [name]: type === 'checkbox' ? (value as HTMLInputElement).checked : value }));
  };

  const handleConfirm = useCallback(() => {
    onConfirm(formValues);
  }, [formValues, onConfirm]);
  
  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !(event.target instanceof HTMLTextAreaElement)) { // Allow enter in textarea
      handleConfirm();
    }
  }, [handleConfirm]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print:hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 id="modal-title" className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        
        {content ? (
          <div className="mb-4 text-gray-600">{content}</div>
        ) : fields && fields.length > 0 ? (
          <form onSubmit={(e) => { e.preventDefault(); handleConfirm(); }} onKeyPress={handleKeyPress}>
            <div className="space-y-4 mb-6">
              {fields.map((field, index) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={3}
                      value={formValues[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value, field.type)}
                      placeholder={field.placeholder}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      ref={index === 0 ? firstInputRef as React.RefObject<HTMLTextAreaElement> : null}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formValues[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value, field.type)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      ref={index === 0 ? firstInputRef as React.RefObject<HTMLSelectElement> : null}
                    >
                      <option value="">{field.placeholder || 'Selecione...'}</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : field.type === 'creatable-select' ? (
                    // Simplified creatable: select + text input for new category
                    <>
                      <select
                        id={`${field.name}-select`}
                        value={formValues[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value, field.type)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary mb-1"
                         ref={index === 0 ? firstInputRef as React.RefObject<HTMLSelectElement> : null}
                      >
                        <option value="">{field.placeholder || 'Selecione ou digite nova'}</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <input
                        type="text"
                        id={`${field.name}-new`}
                        placeholder="Ou digite uma nova categoria aqui"
                        onChange={(e) => handleInputChange(field.name, e.target.value, field.type)} // Overwrites select if typed
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                      />
                    </>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center">
                      <input
                        id={field.name}
                        name={field.name}
                        type="checkbox"
                        checked={formValues[field.name] || false}
                        onChange={(e) => handleInputChange(field.name, e.target, field.type)}
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        ref={index === 0 ? firstInputRef as React.RefObject<HTMLInputElement> : null}
                      />
                       <label htmlFor={field.name} className="ml-2 block text-sm text-gray-900">
                         {/* Label is already above, this is for specific checkbox text if needed, or remove */}
                      </label>
                    </div>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formValues[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value, field.type)}
                      placeholder={field.placeholder}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      ref={index === 0 ? firstInputRef as React.RefObject<HTMLInputElement> : null}
                      autoFocus={index === 0}
                    />
                  )}
                </div>
              ))}
            </div>
          </form>
        ) : null}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type={fields && fields.length > 0 ? "submit" : "button"} // Submit if it's a form
            onClick={fields && fields.length > 0 ? handleConfirm : () => onConfirm()} // handleConfirm if form, else direct onConfirm for simple modals
            form={fields && fields.length > 0 ? "modal-form" : undefined} // Associate with form if exists
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
