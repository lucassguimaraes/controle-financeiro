import { ItemType } from './constants'; // Added this import

// No global types needed for this specific addition yet.
// This file can be used for shared types across the application.

export interface FinancialItem {
  id: string;
  name: string;
  value: number;
  category?: string;
  notes?: string;
  isRecurring: boolean;
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
