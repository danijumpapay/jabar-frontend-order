import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Service {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string; 
}

interface OrderData {
  email?: string;
  whatsapp?: string;
  plateNumber?: string;
  vehicleType?: 'Mobil' | 'Motor';
  statusMutasi?: 'Lengkap' | 'Submit' | 'Cabut';
  jenisMutasi?: string;
  jenisKendaraan?: string;
  isDataMatch?: string;
  kotaCabut?: string;
  kotaTujuan?: string;
}

interface OrderState {
  step: number;
  view: 'order' | 'tracking' | 'refund' | 'bantuan' | 'tutorial';
  selectedService: Service | null;
  orderData: OrderData;
  
  setView: (view: 'order' | 'tracking' | 'refund' | 'bantuan' | 'tutorial') => void;
  setService: (service: Service) => void;
  setOrderData: (data: Partial<OrderData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      step: 1,
      view: 'order',
      selectedService: null,
      orderData: {
        vehicleType: 'Mobil',
        statusMutasi: 'Lengkap',
      },

      setView: (view) => set({ view }),

      setService: (service) => 
        set({ selectedService: service, step: 2, view: 'order' }),

      setOrderData: (data) => 
        set((state) => ({ 
          orderData: { ...state.orderData, ...data } 
        })),

      nextStep: () => 
        set((state) => ({ step: state.step + 1, view: 'order' })),

      prevStep: () => 
        set((state) => ({ step: Math.max(1, state.step - 1), view: 'order' })),

      resetOrder: () => 
        set({ step: 1, view: 'order', selectedService: null, orderData: { vehicleType: 'Mobil', statusMutasi: 'Lengkap' } }),
    }),
    {
      name: 'jumpapay-order-storage',
    }
  )
);