interface PaymentMethodsProps {
  selectedMethod: string;
  onSelect: (id: string) => void;
}

export const PaymentMethods = ({ selectedMethod, onSelect }: PaymentMethodsProps) => {
  const instantPayments = [
    { id: 'QRIS', name: 'QRIS', logo: '/payments/qris.svg' },
    { id: 'DANA', name: 'DANA', logo: '/payments/dana.svg' },
    { id: 'Gopay', name: 'Gopay', logo: '/payments/gopay.svg' },
    { id: 'OVO', name: 'OVO', logo: '/payments/ovo.svg' },
  ];

  const bankTransfers = [
    { id: 'BCA', name: 'BCA', logo: '/payments/bca.svg' },
    { id: 'BNI', name: 'BNI', logo: '/payments/bni.svg' },
    { id: 'Permata', name: 'Permata Bank', logo: '/payments/permata.svg' },
  ];

  const renderMethod = (method: any, isBank = false) => (
    <div 
      key={method.id} 
      onClick={() => onSelect(method.id)}
      className={`p-4 border rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
        selectedMethod === method.id ? 'border-[#27AAE1] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          selectedMethod === method.id ? 'border-[#27AAE1]' : 'border-gray-300'
        }`}>
          {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-[#27AAE1] rounded-full"></div>}
        </div>
        <img src={method.logo} alt={method.name} className={`${isBank ? 'h-6' : 'h-5'} w-auto object-contain`} />
      </div>
      {!isBank && <span className="text-sm font-bold text-gray-700">{method.name}</span>}
    </div>
  );

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-sm space-y-8 text-left">
      <h3 className="font-bold text-gray-800 text-base">Metode Pembayaran</h3>
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-gray-800">Instant Payment</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {instantPayments.map((m) => renderMethod(m))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-gray-800">Transfer Bank</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bankTransfers.map((m) => renderMethod(m, true))}
        </div>
      </div>
    </div>
  );
};