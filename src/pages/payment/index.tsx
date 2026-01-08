import { useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

import { AddressModal } from './components/AddressModal';
import { PickupTypeCard } from './components/PickupTypeCard';
import { PaymentMethods } from './components/PaymentMethods';
import { OrderSummary } from './components/OrderSummary';

export const PaymentPage = () => {
  const { selectedService, setStep } = useOrderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('QRIS');

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8 font-inter animate-in fade-in duration-500">
      <div className="mb-2 text-left">
        <Breadcrumbs 
          parentPage="Detail Order" 
          onParentClick={() => setStep(2)} 
          currentPage="Payment" 
        />
      </div>

      <div className="space-y-2 text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Pembayaran</h1>
        <p className="text-sm md:text-base text-gray-500 font-medium">Selesaikan pembayaran untuk memproses pengurusan surat kendaraanmu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PickupTypeCard onEditAddress={() => setIsModalOpen(true)} />
          <PaymentMethods 
            selectedMethod={selectedMethod} 
            onSelect={setSelectedMethod} 
          />
        </div>

        <div className="space-y-6">
          <OrderSummary 
            serviceImage={selectedService?.image}
            serviceTitle={selectedService?.title}
          />
        </div>
      </div>

      <AddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};