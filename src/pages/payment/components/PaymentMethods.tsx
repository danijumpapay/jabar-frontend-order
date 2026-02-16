interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

interface PaymentMethodsProps {
  selectedMethod: string;
  onSelect: (id: string) => void;
}

export const PaymentMethods = ({ selectedMethod, onSelect }: PaymentMethodsProps) => {
  const paymentMethods: PaymentMethod[] = [
    { id: 'BJB', name: 'VA BJB', logo: '/payments/bjb.svg' },
    { id: 'QRIS', name: 'QRIS', logo: '/payments/qris.svg' },
    { id: 'CC', name: 'Credit Card', logo: '/payments/cc.png' },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-sm space-y-8 text-left">
      <h3 className="font-bold text-gray-800 text-base">Metode Pembayaran</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          
          return (
            <div 
              key={method.id} 
              onClick={() => onSelect(method.id)}
              className={`p-4 md:p-5 border rounded-2xl flex items-center gap-3 md:gap-4 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-[#27AAE1] bg-[#F0F9FF]' 
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              <div className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-all ${
                isSelected ? 'border-[#27AAE1] bg-white' : 'border-gray-300'
              }`}>
                {isSelected && <div className="w-2.5 h-2.5 bg-[#27AAE1] rounded-full" />}
              </div>

              <div className="flex flex-1 items-center justify-between gap-2">
                <div className="h-6 md:h-7 w-12 md:w-14 flex items-center justify-center shrink-0">
                  <img 
                    src={method.logo} 
                    alt={method.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                <span className={`text-[10px] md:text-[11px] font-bold text-right leading-tight ${
                  isSelected ? 'text-[#27AAE1]' : 'text-gray-700'
                }`}>
                  {method.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};