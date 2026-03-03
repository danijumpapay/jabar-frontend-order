import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VehicleTaxData } from '@/api/vehicle';

interface Service {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
}

interface OrderData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  identityNumber?: string;
  plateNumber?: string;
  chassisNumber?: string;
  vehicleType?: string;
  mutationType?: string;
  isDataMatch?: string;
  kotaCabut?: string;
  kotaTujuan?: string;
  ktp?: File | null;
  stnk?: File | null;
  bpkb?: File | null;
  totalAmount?: number;
  apiVehicleData?: VehicleTaxData;
}

interface OrderState {
  step: number;
  view: 'order' | 'tracking' | 'refund' | 'bantuan' | 'tutorial' | 'promo-detail';
  selectedService: Service | null;
  selectedPromoId: string | null;
  orderData: OrderData;
  orderId: string | null;
  bookingId: string | null;

  setView: (view: OrderState['view']) => void;
  setStep: (step: number) => void;
  setService: (service: Service) => void;
  setSelectedPromoId: (id: string | null) => void;
  setOrderData: (data: Partial<OrderData>) => void;
  setOrderId: (id: string | null) => void;
  setBookingId: (id: string | null) => void;
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
      bookingId: null,
      orderData: {
        name: '',
        email: '',
        phoneNumber: '',
        identityNumber: '',
        plateNumber: '',
        chassisNumber: '',
        vehicleType: 'Mobil',
        mutationType: 'Lengkap',
        isDataMatch: 'Ya',
        totalAmount: 0
      },

      setView: (view) => set({ view }),

      setStep: (step) => set({ step }),

      setService: (service) =>
        set((state) => {
          const isSameService = state.selectedService?.id === service.id;
          return {
            selectedService: service,
            step: 2,
            view: 'order',
            orderData: isSameService
              ? state.orderData
              : {
                name: '',
                email: '',
                phoneNumber: '',
                identityNumber: '',
                plateNumber: '',
                chassisNumber: '',
                vehicleType: 'Mobil',
                mutationType: 'Lengkap',
                isDataMatch: 'Ya',
                totalAmount: 0
              }
          };
        }),

      setSelectedPromoId: (id) => set({ selectedPromoId: id }),

      setOrderData: (data) =>
        set((state) => ({
          orderData: { ...state.orderData, ...data }
        })),

      setOrderId: (id) => set({ orderId: id }),

      setBookingId: (id) => set({ bookingId: id }),

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
          bookingId: null,
          orderData: {
            name: '',
            email: '',
            phoneNumber: '',
            identityNumber: '',
            plateNumber: '',
            chassisNumber: '',
            vehicleType: 'Mobil',
            mutationType: 'Lengkap',
            isDataMatch: 'Ya',
            totalAmount: 0
          }
        }),
    }),
    {
      name: 'KangPajak-order-storage',
      partialize: (state) => ({
        ...state,
        orderData: {
          ...state.orderData,
          ktp: null,
          stnk: null,
          bpkb: null,
          apiVehicleData: undefined
        }
      })
    }
  )
);