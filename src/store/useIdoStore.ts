import { create } from 'zustand';
import { collection, addDoc, getDocs, query, orderBy, updateDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface IdoSubmission {
  id: string;
  projectName: string;
  tokenSymbol: string;
  tokenSupply: string;
  saleAmount: string;
  tokenPrice: string;
  minAllocation: string;
  maxAllocation: string;
  startDate: string;
  endDate: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface IdoStore {
  submissions: IdoSubmission[];
  loading: boolean;
  error: string | null;
  fetchSubmissions: () => Promise<void>;
  addSubmission: (submission: Omit<IdoSubmission, 'id' | 'submittedAt'>) => Promise<void>;
  updateStatus: (id: string, status: IdoSubmission['status']) => Promise<void>;
  subscribeToSubmissions: () => () => void;
}

export const useIdoStore = create<IdoStore>((set) => ({
  submissions: [],
  loading: false,
  error: null,

  fetchSubmissions: async () => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, 'ido_submissions'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const submissions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IdoSubmission[];
      set({ submissions, loading: false });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch submissions', 
        loading: false 
      });
    }
  },

  addSubmission: async (submission) => {
    try {
      const submissionData = {
        ...submission,
        status: 'pending',
        submittedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'ido_submissions'), submissionData);
      
      // Add the new submission to the local state with the generated ID
      const newSubmission = {
        id: docRef.id,
        ...submissionData,
        submittedAt: new Date().toISOString() // Use local date for immediate display
      };

      set(state => ({
        submissions: [newSubmission, ...state.submissions]
      }));

      return docRef.id;
    } catch (error) {
      console.error('Error adding submission:', error);
      throw error;
    }
  },

  updateStatus: async (id: string, status: IdoSubmission['status']) => {
    try {
      const docRef = doc(db, 'ido_submissions', id);
      await updateDoc(docRef, { status });
      set(state => ({
        submissions: state.submissions.map(sub =>
          sub.id === id ? { ...sub, status } : sub
        )
      }));
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

  subscribeToSubmissions: () => {
    set({ loading: true });
    const q = query(collection(db, 'ido_submissions'), orderBy('submittedAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const submissions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          submittedAt: doc.data().submittedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        })) as IdoSubmission[];
        set({ submissions, loading: false });
      },
      (error) => {
        console.error('Error subscribing to submissions:', error);
        set({ error: error.message, loading: false });
      }
    );

    return unsubscribe;
  }
}));