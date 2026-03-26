import { create } from 'zustand';
import { MaintenanceRequest, MaintenanceStatus } from '../types';
import { MOCK_MAINTENANCE } from '../constants/mockData';

interface MaintenanceState {
  requests: MaintenanceRequest[];
  selectedRequest: MaintenanceRequest | null;
  addRequest: (request: MaintenanceRequest) => void;
  updateRequest: (id: string, updates: Partial<MaintenanceRequest>) => void;
  updateRequestStatus: (id: string, status: MaintenanceStatus) => void;
  setSelectedRequest: (request: MaintenanceRequest | null) => void;
  getRequestsByStatus: (status: MaintenanceStatus) => MaintenanceRequest[];
  getRequestsByPriority: (priority: string) => MaintenanceRequest[];
  getRequestsByCategory: (category: string) => MaintenanceRequest[];
}

export const useMaintenanceStore = create<MaintenanceState>((set, get) => ({
  requests: MOCK_MAINTENANCE,
  selectedRequest: null,
  
  addRequest: (request) =>
    set((state) => ({
      requests: [request, ...state.requests],
    })),
  
  updateRequest: (id, updates) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),
  
  updateRequestStatus: (id, status) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id ? { ...r, status, updatedAt: new Date().toISOString().split('T')[0] } : r
      ),
    })),
  
  setSelectedRequest: (request) =>
    set(() => ({
      selectedRequest: request,
    })),
  
  getRequestsByStatus: (status) => {
    const state = get();
    return state.requests.filter((r) => r.status === status);
  },
  
  getRequestsByPriority: (priority) => {
    const state = get();
    return state.requests.filter((r) => r.priority === priority);
  },
  
  getRequestsByCategory: (category) => {
    const state = get();
    return state.requests.filter((r) => r.category === category);
  },
}));
