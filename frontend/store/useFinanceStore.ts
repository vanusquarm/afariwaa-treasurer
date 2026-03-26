import { create } from 'zustand';
import { Transaction, FinancialSummary } from '../types';
import { MOCK_TRANSACTIONS, INITIAL_RESIDENTS } from '../constants/mockData';

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  getFinancialSummary: () => FinancialSummary;
  getTransactionsByCategory: (category: string) => Transaction[];
  getTransactionsByResident: (residentId: string) => Transaction[];
  getTransactionsByPeriod: (startDate: string, endDate: string) => Transaction[];
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: MOCK_TRANSACTIONS,
  
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
  
  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
  
  getFinancialSummary: () => {
    const state = get();
    const credits = state.transactions
      .filter((t) => t.type === 'credit' && t.status === 'completed')
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    const debits = state.transactions
      .filter((t) => t.type === 'debit' && t.status === 'completed')
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    const pending = state.transactions
      .filter((t) => t.status === 'pending')
      .reduce((acc, curr) => acc + (curr.type === 'credit' ? curr.amount : -curr.amount), 0);
    
    const residents = INITIAL_RESIDENTS;
    return {
      totalCollected: credits,
      totalExpenses: debits,
      balance: credits - debits,
      pendingAmount: pending,
      residents: {
        paid: residents.filter((r) => r.paymentStatus === 'paid').length,
        partial: residents.filter((r) => r.paymentStatus === 'partial').length,
        unpaid: residents.filter((r) => r.paymentStatus === 'unpaid').length,
      },
    };
  },
  
  getTransactionsByCategory: (category) => {
    const state = get();
    return state.transactions.filter((t) => t.category === category);
  },
  
  getTransactionsByResident: (residentId) => {
    const state = get();
    return state.transactions.filter((t) => t.residentId === residentId);
  },
  
  getTransactionsByPeriod: (startDate, endDate) => {
    const state = get();
    return state.transactions.filter(
      (t) => t.date >= startDate && t.date <= endDate
    );
  },
}));
