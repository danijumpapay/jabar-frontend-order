import { useState } from 'react';
import { MapPin, Building2, Ticket, AlertCircle, MotorbikeIcon, Truck } from 'lucide-react';

interface PickupTypeCardProps {
  address: string;
  onEditAddress: () => void;
  onFeeChange: (fee: number) => void;
}

export const PickupTypeCard = ({ address, onEditAddress, onFeeChange }: PickupTypeCardProps) => {
  const [selectedId, setSelectedId] = useState('reguler');

  const deliveryOptions = [
    { id: 'express', title: 'Express', price: 29900, eta: '1 - 2 hari', bonus: 'Voucher belanja Planet Ban max 20K', extra: 'Luar jangkauan +19K dan 2 Hari kerja', icon: <MotorbikeIcon size={22} /> },
    { id: 'reguler', title: 'Reguler', price: 19900, eta: '3 - 5 hari', bonus: 'Voucher belanja Planet Ban max 20K', extra: 'Luar jangkauan +19K dan 2 Hari kerja', icon: <Truck size={22} /> },
    { id: 'samsat', title: 'Ambil di Samsat', price: 0, eta: 'Gratis', icon: <Building2 size={22} /> }
  ];

  const handleSelect = (id: string, price: number) => {
    setSelectedId(id);
    onFeeChange(price);
  };

  const isSamsat = selectedId === 'samsat';

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-sm text-left font-inter transition-all duration-300">
      <h3 className="font-bold text-gray-800 mb-6 text-base">Pengantaran Dokumen</h3>
      
      <div className="space-y-4">
        {deliveryOptions.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <label 
              key={option.id}
              className={`flex flex-col p-5 border rounded-[28px] cursor-pointer transition-all ${
                isSelected ? 'border-[#27AAE1] bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
              onClick={() => handleSelect(option.id, option.price)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#27AAE1]' : 'border-gray-300'}`}>
                    {isSelected && <div className="w-3 h-3 bg-[#27AAE1] rounded-full"></div>}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`${isSelected ? 'text-[#27AAE1]' : 'text-gray-400'} shrink-0`}>{option.icon}</div>
                    <div>
                      <p className="text-[15px] text-gray-800 font-bold leading-tight">{option.title}</p>
                      <p className={`text-[13px] font-bold mt-0.5 ${option.price === 0 ? 'text-green-600' : 'text-gray-600'}`}>
                        {option.price === 0 ? 'Gratis' : `Rp${option.price.toLocaleString('id-ID')}`}
                        <span className="ml-2 font-medium text-gray-400">({option.eta})</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {isSelected && (option.bonus || option.extra) && (
                <div className="mt-4 ml-10 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1">
                  {option.bonus && (
                    <div className="flex items-center gap-2 p-2 px-3 bg-green-50 rounded-xl border border-green-100 shrink-0">
                      <Ticket size={14} className="text-green-600" />
                      <p className="text-[10px] font-bold text-green-700 whitespace-nowrap">{option.bonus}</p>
                    </div>
                  )}
                  {option.extra && (
                    <div className="flex items-center gap-2 p-2 px-3 bg-orange-50 rounded-xl border border-orange-100 shrink-0">
                      <AlertCircle size={14} className="text-orange-600" />
                      <p className="text-[10px] font-bold text-orange-700 whitespace-nowrap">{option.extra}</p>
                    </div>
                  )}
                </div>
              )}
            </label>
          );
        })}
      </div>
      
      {!isSamsat && (
        <div className="mt-8 border-t border-gray-50 pt-6 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-[#FF4D4D] fill-[#FF4D4D]" />
            <h4 className="font-bold text-sm text-gray-800">Lokasi Pengiriman Dokumen</h4>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <p className={`text-[14px] max-w-xl leading-relaxed ${address ? 'text-gray-500 font-medium' : 'text-[#27AAE1] font-bold italic'}`}>
              {address || 'Silakan masukkan alamat penjemputan dokumen Anda'}
            </p>
            <button onClick={onEditAddress} className="px-5 py-2 border border-gray-200 rounded-full text-[12px] font-bold text-gray-600 hover:bg-gray-50 shrink-0">
              {address ? 'Ubah Alamat' : 'Input Alamat'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};