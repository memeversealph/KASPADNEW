import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface IDOSubmission {
  id?: string;
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
  createdAt: Date;
}

const IDO_COLLECTION = 'ido_submissions';

export const submitIDO = async (data: Omit<IDOSubmission, 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, IDO_COLLECTION), {
      ...data,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting IDO:', error);
    throw error;
  }
};

export const getIDOSubmissions = async (): Promise<IDOSubmission[]> => {
  try {
    const q = query(collection(db, IDO_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as IDOSubmission));
  } catch (error) {
    console.error('Error getting IDO submissions:', error);
    throw error;
  }
};

export const subscribeToIDOSubmissions = (
  callback: (submissions: IDOSubmission[]) => void
) => {
  const q = query(collection(db, IDO_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const submissions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as IDOSubmission));
    callback(submissions);
  });
};