import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
}

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string | null) => void;
  getSelectedAddress: () => Address | null;
}

export const useAddress = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,
      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            { ...address, id: Date.now().toString() },
          ],
        })),
      updateAddress: (id, address) =>
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...address, id } : a
          ),
        })),
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
          selectedAddressId:
            state.selectedAddressId === id ? null : state.selectedAddressId,
        })),
      selectAddress: (id) => set({ selectedAddressId: id }),
      getSelectedAddress: () => {
        const state = get();
        return state.addresses.find((a) => a.id === state.selectedAddressId) || null;
      },
    }),
    {
      name: 'alphachap-addresses',
    }
  )
);
