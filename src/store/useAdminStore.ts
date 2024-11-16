import { create } from 'zustand';

interface AdminState {
  isAdmin: boolean;
  adminAddress: string | null;
  checkIsAdmin: (address: string) => boolean;
  setAdminStatus: (status: boolean, address: string | null) => void;
}

// In a real application, this would be fetched from a backend
const ADMIN_ADDRESSES = [
  '0x1234567890123456789012345678901234567890', // Replace with actual admin addresses
];

export const useAdminStore = create<AdminState>((set, get) => ({
  isAdmin: false,
  adminAddress: null,
  
  checkIsAdmin: (address: string) => {
    return ADMIN_ADDRESSES.includes(address.toLowerCase());
  },
  
  setAdminStatus: (status: boolean, address: string | null) => {
    set({ isAdmin: status, adminAddress: address });
  },
}));