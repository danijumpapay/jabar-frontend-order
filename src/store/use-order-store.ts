import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Service {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface OrderData {
  email?: string;
  whatsapp?: string;
  plateNumber?: string;
  vehicleType?: 'Mobil' | 'Motor';
  statusMutasi?: 'Lengkap' | 'Submit' | 'Cabut';
}

interface OrderState {
  step: number;
  selectedService: Service | null;
  orderData: OrderData;
  
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
      selectedService: null,
      orderData: {
        vehicleType: 'Mobil',
        statusMutasi: 'Lengkap',
      },

      setService: (service) => 
        set({ selectedService: service, step: 2 }),

      setOrderData: (data) => 
        set((state) => ({ 
          orderData: { ...state.orderData, ...data } 
        })),

      nextStep: () => 
        set((state) => ({ step: state.step + 1 })),

      prevStep: () => 
        set((state) => ({ step: Math.max(1, state.step - 1) })),

      resetOrder: () => 
        set({ step: 1, selectedService: null, orderData: {} }),
    }),
    {
      name: 'jumpapay-order-storage',
    }
  )
);