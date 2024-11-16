import { create } from 'zustand';

interface VisitorState {
  visitorCount: number;
  incrementVisitor: () => void;
}

export const useVisitorStore = create<VisitorState>((set) => ({
  visitorCount: Number(localStorage.getItem('visitorCount') || '323'),
  
  incrementVisitor: () => {
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    // Only count if it's a new day or first visit
    if (lastVisit !== today) {
      const newCount = Number(localStorage.getItem('visitorCount') || '323') + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('lastVisit', today);
      set({ visitorCount: newCount });
    }
  },
}));