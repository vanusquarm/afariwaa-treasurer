import { create } from 'zustand';
import { Event } from '../types';
import { MOCK_EVENTS } from '../constants/mockData';

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setSelectedEvent: (event: Event | null) => void;
  getUpcomingEvents: () => Event[];
  getPastEvents: () => Event[];
  getEventsByStatus: (status: string) => Event[];
}

export const useEventStore = create<EventState>((set, get) => ({
  events: MOCK_EVENTS,
  selectedEvent: null,
  
  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events],
    })),
  
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),
  
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
  
  setSelectedEvent: (event) =>
    set(() => ({
      selectedEvent: event,
    })),
  
  getUpcomingEvents: () => {
    const state = get();
    const today = new Date().toISOString().split('T')[0];
    return state.events.filter((e) => e.startDate >= today && e.status !== 'cancelled');
  },
  
  getPastEvents: () => {
    const state = get();
    const today = new Date().toISOString().split('T')[0];
    return state.events.filter((e) => e.endDate < today);
  },
  
  getEventsByStatus: (status) => {
    const state = get();
    return state.events.filter((e) => e.status === status);
  },
}));
