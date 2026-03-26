import { create } from 'zustand';
import { Announcement } from '../types';
import { MOCK_ANNOUNCEMENTS } from '../constants/mockData';

interface AnnouncementState {
  announcements: Announcement[];
  selectedAnnouncement: Announcement | null;
  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  setSelectedAnnouncement: (announcement: Announcement | null) => void;
  getAnnouncementsByPriority: (priority: string) => Announcement[];
  getAnnouncementsByCategory: (category: string) => Announcement[];
  incrementViews: (id: string) => void;
  likeAnnouncement: (id: string) => void;
}

export const useAnnouncementStore = create<AnnouncementState>((set, get) => ({
  announcements: MOCK_ANNOUNCEMENTS,
  selectedAnnouncement: null,
  
  addAnnouncement: (announcement) =>
    set((state) => ({
      announcements: [announcement, ...state.announcements],
    })),
  
  updateAnnouncement: (id, updates) =>
    set((state) => ({
      announcements: state.announcements.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),
  
  deleteAnnouncement: (id) =>
    set((state) => ({
      announcements: state.announcements.filter((a) => a.id !== id),
    })),
  
  setSelectedAnnouncement: (announcement) =>
    set(() => ({
      selectedAnnouncement: announcement,
    })),
  
  getAnnouncementsByPriority: (priority) => {
    const state = get();
    return state.announcements.filter((a) => a.priority === priority);
  },
  
  getAnnouncementsByCategory: (category) => {
    const state = get();
    return state.announcements.filter((a) => a.category === category);
  },
  
  incrementViews: (id) =>
    set((state) => ({
      announcements: state.announcements.map((a) =>
        a.id === id ? { ...a, views: a.views + 1 } : a
      ),
    })),
  
  likeAnnouncement: (id) =>
    set((state) => ({
      announcements: state.announcements.map((a) =>
        a.id === id ? { ...a, likes: a.likes + 1 } : a
      ),
    })),
}));
