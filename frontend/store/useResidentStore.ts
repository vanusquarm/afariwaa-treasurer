import { create } from 'zustand';
import { Resident, PaymentStatus } from '../types';
import { INITIAL_RESIDENTS } from '../constants/mockData';

interface ResidentState {
  residents: Resident[];
  selectedResident: Resident | null;
  addResident: (resident: Resident) => void;
  updateResident: (id: string, updates: Partial<Resident>) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus) => void;
  setSelectedResident: (resident: Resident | null) => void;
  getResidentById: (id: string) => Resident | undefined;
  getResidentsWithOutstandingDues: () => Resident[];
}

export const useResidentStore = create<ResidentState>((set, get) => ({
  residents: INITIAL_RESIDENTS,
  selectedResident: null,
  
  addResident: (resident) =>
    set((state) => ({
      residents: [...state.residents, resident],
    })),
  
  updateResident: (id, updates) =>
    set((state) => ({
      residents: state.residents.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),
  
  updatePaymentStatus: (id, status) =>
    set((state) => ({
      residents: state.residents.map((r) =>
        r.id === id
          ? { ...r, paymentStatus: status, totalDuesOwed: status === 'paid' ? 0 : r.totalDuesOwed }
          : r
      ),
    })),
  
  setSelectedResident: (resident) =>
    set(() => ({
      selectedResident: resident,
    })),
  
  getResidentById: (id) => {
    const state = get();
    return state.residents.find((r) => r.id === id);
  },
  
  getResidentsWithOutstandingDues: () => {
    const state = get();
    return state.residents.filter(
      (r) => r.paymentStatus === 'unpaid' || r.paymentStatus === 'partial'
    );
  },
}));
