export interface FinancialItem {
  id: string;
  name: string;
  value: number;
  category?: string;
  notes?: string;
  isRecurring?: boolean;
}

export enum ItemType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface UserSettings {
  categoriesIncome: string[];
  categoriesExpense: string[];
  expenseBudgets: { [category: string]: number };
}

export interface MonthlyRecord {
  month: string;
  year: number;
  incomes: FinancialItem[];
  expenses: FinancialItem[];
}

export interface AppData {
  monthlyData: MonthlyRecord[];
  userSettings: UserSettings;
}
