import { useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { AddressModal } from './components/AddressModal';
import { PickupTypeCard } from './components/PickupTypeCard';
import { PaymentMethods } from './components/PaymentMethods';
import { OrderSummary } from './components/OrderSummary';

interface AddressData {
  alamatLengkap: string;
  kota: string;
  keterangan: string;
}

export const PaymentPage = () => {
  const { selectedService, setStep } = useOrderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('BJB');
  const [deliveryFee, setDeliveryFee] = useState(19900);

  const [addressData, setAddressData] = useState<AddressData>({
    alamatLengkap: '',
    kota: '',
    keterangan: ''
  });

  const handleUpdateAddress = (data: AddressData) => {
    setAddressData(data);
  };

  const displayAddress = addressData.alamatLengkap 
    ? `${addressData.alamatLengkap}, ${addressData.kota}` 
    : 'Belum ada alamat ditetapkan';

  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in">
      <div className="text-left">
        <Breadcrumbs 
          parentPage="Detail Order" 
          onParentClick={() => setStep(2)} 
          currentPage="Pembayaran" 
        />
      </div>
      
      <div className="space-y-2 text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pembayaran</h1>
        <p className="text-sm text-gray-500">Selesaikan pembayaran untuk memproses pengurusan surat kendaraanmu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PickupTypeCard 
            address={displayAddress} 
            onEditAddress={() => setIsModalOpen(true)}
            onFeeChange={setDeliveryFee}
          />
          <PaymentMethods 
            selectedMethod={selectedMethod} 
            onSelect={setSelectedMethod} 
          />
        </div>

        <div className="space-y-6">
          <OrderSummary 
            serviceImage={selectedService?.image}
            serviceTitle={selectedService?.title}
            deliveryFee={deliveryFee}
            address={displayAddress}
            onPayClick={() => setStep(4)}
          />
        </div>
      </div>

      <AddressModal 
        key={isModalOpen ? 'opened' : 'closed'}
        isOpen={isModalOpen}
        initialData={addressData}
        onSave={handleUpdateAddress}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};