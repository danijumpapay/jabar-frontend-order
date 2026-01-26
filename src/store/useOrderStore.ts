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
  jenisKendaraan?: string;
  jenisMutasi?: string;
  isDataMatch?: string;
  kotaCabut?: string;
  kotaTujuan?: string;
  ktp?: File | null;
  stnk?: File | null;
  bpkb?: File | null;
}

interface OrderState {
  step: number;
  view: 'order' | 'tracking' | 'refund' | 'bantuan' | 'tutorial' | 'promo-detail';
  selectedService: Service | null;
  selectedPromoId: string | null;
  orderData: OrderData;
  orderId: string | null;
  
  setView: (view: OrderState['view']) => void;
  setStep: (step: number) => void;
  setService: (service: Service) => void;
  setSelectedPromoId: (id: string | null) => void;
  setOrderData: (data: Partial<OrderData>) => void;
  setOrderId: (id: string | null) => void;
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
      selectedPromoId: null,
      orderId: null,
      orderData: {
        jenisKendaraan: 'Mobil',
        jenisMutasi: 'Lengkap',
        isDataMatch: 'Ya'
      },

      setView: (view) => set({ view }),
      
      setStep: (step) => set({ step }),

      setService: (service) => 
        set({ selectedService: service, step: 2, view: 'order' }),

      setSelectedPromoId: (id) => set({ selectedPromoId: id }),

      setOrderData: (data) => 
        set((state) => ({ 
          orderData: { ...state.orderData, ...data } 
        })),

      setOrderId: (id) => set({ orderId: id }),

      nextStep: () => 
        set((state) => ({ step: state.step + 1, view: 'order' })),

      prevStep: () => 
        set((state) => ({ step: Math.max(1, state.step - 1), view: 'order' })),

      resetOrder: () => 
        set({ 
          step: 1, 
          view: 'order', 
          selectedService: null, 
          selectedPromoId: null,
          orderId: null,
          orderData: { 
            jenisKendaraan: 'Mobil', 
            jenisMutasi: 'Lengkap', 
            isDataMatch: 'Ya' 
          } 
        }),
    }),
    {
      name: 'jumpapay-order-storage',
      partialize: (state) => ({
        ...state,
        orderData: {
          ...state.orderData,
          ktp: null,
          stnk: null,
          bpkb: null
        }
      })
    }
  )
);