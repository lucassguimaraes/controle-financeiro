import { FinancialItem } from './types';

export const MONTHS: string[] = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

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

export const LOCAL_STORAGE_KEY = 'familyFinanceApp';

export const INITIAL_CATEGORIES_INCOME: string[] = ['Salário', 'Bônus', 'Freelance', 'Investimentos', 'Outras Rendas'];
export const INITIAL_CATEGORIES_EXPENSE: string[] = [
  'Moradia', 'Alimentação', 'Transporte', 'Contas Fixas', 'Saúde', 
  'Educação', 'Lazer', 'Vestuário', 'Cuidados Pessoais', 'Dívidas', 'Investimentos/Poupança', 'Outras Despesas'
];

export const INITIAL_INCOMES: FinancialItem[] = [
  { id: 'income-initial-1', name: 'Salário Principal', value: 0, category: 'Salário', isRecurring: true },
];

export const INITIAL_EXPENSES: FinancialItem[] = [
  { id: 'expense-initial-1', name: 'Aluguel/Financiamento', value: 0, category: 'Moradia', isRecurring: true },
  { id: 'expense-initial-2', name: 'Supermercado', value: 0, category: 'Alimentação', isRecurring: true },
  { id: 'expense-initial-3', name: 'Contas (Água, Luz, Gás, Internet)', value: 0, category: 'Contas Fixas', isRecurring: true },
  { id: 'expense-initial-4', name: 'Transporte', value: 0, category: 'Transporte' },
  { id: 'expense-initial-5', name: 'Plano de Saúde/Medicamentos', value: 0, category: 'Saúde', isRecurring: true },
];

export const generateId = (): string => `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
