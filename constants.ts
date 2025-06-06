import { FinancialItem } from './types';

export enum AppRoute {
  HOME = '/',
  ABOUT = '/about',
  PRIVACY = '/privacy',
}

export const APP_ROUTES = {
  HOME: AppRoute.HOME,
  ABOUT: AppRoute.ABOUT,
  PRIVACY: AppRoute.PRIVACY,
};

export enum ItemType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const MONTHS: string[] = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const INITIAL_INCOMES: FinancialItem[] = [
  { id: 'init-inc-1', name: 'Salário Principal', value: 0, category: 'Salário', isRecurring: true, notes: '' },
];

export const INITIAL_EXPENSES: FinancialItem[] = [
  { id: 'init-exp-1', name: 'Aluguel/Financiamento', value: 0, category: 'Moradia', isRecurring: true, notes: '' },
  { id: 'init-exp-2', name: 'Supermercado', value: 0, category: 'Alimentação', isRecurring: false, notes: '' },
  { id: 'init-exp-3', name: 'Contas (Água, Luz, Gás, Internet)', value: 0, category: 'Contas Fixas', isRecurring: true, notes: '' },
  { id: 'init-exp-4', name: 'Transporte', value: 0, category: 'Transporte', isRecurring: false, notes: '' },
  { id: 'init-exp-5', name: 'Plano de Saúde/Medicamentos', value: 0, category: 'Saúde', isRecurring: true, notes: '' },
];

export const INITIAL_CATEGORIES_INCOME: string[] = ['Salário', 'Freelance', 'Investimentos', 'Presente', 'Outros'];
export const INITIAL_CATEGORIES_EXPENSE: string[] = ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Contas Fixas', 'Vestuário', 'Outros'];

export const LOCAL_STORAGE_KEY = 'financialControlAppData_v1';

export const generateId = (): string => {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};