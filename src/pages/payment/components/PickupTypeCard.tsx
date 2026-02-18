import { useState, useEffect, useRef } from 'react';
import { MapPin, Building2, Ticket, AlertCircle, MotorbikeIcon, Truck } from 'lucide-react';
import { westJavaCities } from '@/data/west-java-cities';
import { formatCurrency } from '@/lib/utils';
import { DeliveryOption } from '@/types/payment';

interface PickupTypeCardProps {
  address: string;
  onEditAddress: () => void;
  onFeeChange: (fee: number) => void;
  vehicleType: string;
  region: string;
}

const COVERED_CITIES = [
  'Kota Bandung',
  'Kota Bekasi',
  'Kota Depok'
];

export const PickupTypeCard = ({ address, onEditAddress, onFeeChange, vehicleType, region }: PickupTypeCardProps) => {
  const [selectedCity, setSelectedCity] = useState(COVERED_CITIES[0]);
  const [isManualCity, setIsManualCity] = useState(false);
  const [manualCity, setManualCity] = useState('');
  const [selectedId, setSelectedId] = useState('express');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isOutOfRange = isManualCity;
  const surcharge = isOutOfRange ? 19900 : 0;
  const etaOffset = isOutOfRange ? ' + 2 hari' : '';

  const isMotor = vehicleType.toLowerCase() === 'motor';

  const options: DeliveryOption[] = [
    {
      id: 'express',
      title: 'Express',
      price: isMotor ? 29900 : 59900,
      eta: `1 - 2 hari${etaOffset}`,
      bonus: isMotor ? 'Voucher belanja Planet Ban max 20K' : 'Voucher Mobeng senilai 100K',
      icon: <MotorbikeIcon size={22} />
    },
    {
      id: 'reguler',
      title: 'Reguler',
      price: isMotor ? 19900 : 49900,
      eta: `3 - 5 hari${etaOffset}`,
      bonus: isMotor ? 'Voucher belanja Planet Ban max 20K' : 'Voucher Mobeng senilai 100K',
      icon: <Truck size={22} />
    }
  ];

  const samsatOption: DeliveryOption = {
    id: 'samsat',
    title: 'Ambil di Samsat',
    price: 0,
    eta: 'Gratis',
    icon: <Building2 size={22} />
  };

  useEffect(() => {
    if (selectedId === 'samsat') {
      onFeeChange(0);
    } else {
      const option = options.find(o => o.id === selectedId);
      if (option) {
        onFeeChange(option.price + surcharge);
      }
    }
  }, [selectedId, isManualCity, vehicleType, surcharge, onFeeChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleCityChange = (val: string) => {
    if (val === 'others') {
      setIsManualCity(true);
      setSelectedCity('');
      setManualCity('');
      setSuggestions([]);
    } else {
      setIsManualCity(false);
      setSelectedCity(val);
      setManualCity('');
    }
  };

  const handleManualCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setManualCity(val);

    if (val.length > 0) {
      const filtered = westJavaCities.filter(city =>
        city.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (city: string) => {
    setManualCity(city);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const currentCity = isManualCity ? manualCity : selectedCity;
  const isSamsat = selectedId === 'samsat';

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-sm text-left font-inter transition-all duration-300">
      <h3 className="font-bold text-gray-800 mb-6 text-lg">Pengantaran Dokumen</h3>
      <div className="mb-6 space-y-3">
        <label className="text-sm font-semibold text-gray-700">Pilih Kota / Kabupaten</label>
        <div className="relative">
          {!isManualCity ? (
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
            >
              {COVERED_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
              <option value="others">Lainya (Input manual)</option>
            </select>
          ) : (
            <div className="relative animate-in fade-in zoom-in-95" ref={wrapperRef}>
              <input
                type="text"
                value={manualCity}
                onChange={handleManualCityChange}
                placeholder="Ketik nama kota / kabupaten"
                className="w-full p-3 pl-4 pr-24 border border-blue-200 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                autoFocus
                onFocus={() => manualCity.length > 0 && setShowSuggestions(true)}
              />
              <button
                onClick={() => { setIsManualCity(false); setSelectedCity(COVERED_CITIES[0]); }}
                className="absolute right-2 top-2 bottom-2 px-3 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Batal
              </button>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto">
                  {suggestions.map((city, index) => (
                    <button
                      key={index}
                      onClick={() => selectSuggestion(city)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 font-medium transition-colors border-b border-gray-50 last:border-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {!isManualCity && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          )}
        </div>
        {isOutOfRange && (
          <div className="flex items-start gap-2 text-xs text-orange-600 bg-orange-50 p-3 rounded-xl">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <p>Lokasi diluar jangkauan utama, akan dikenakan biaya tambahan <b>Rp19.900</b> dan estimasi waktu <b>+2 hari kerja</b>.</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const finalPrice = option.price + surcharge;

          return (
            <label
              key={option.id}
              className={`flex flex-col p-5 border rounded-[28px] cursor-pointer transition-all relative overflow-hidden group ${isSelected ? 'border-[#27AAE1] bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              onClick={() => setSelectedId(option.id)}
            >
              <div className="flex items-start gap-4 z-10">
                <div className={`w-5 h-5 mt-1 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-[#27AAE1]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                  {isSelected && <div className="w-2.5 h-2.5 bg-[#27AAE1] rounded-full"></div>}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`${isSelected ? 'text-[#27AAE1]' : 'text-gray-400'}`}>{option.icon}</span>
                        <span className="font-bold text-gray-800">{option.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{option.eta}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#27AAE1]">{formatCurrency(finalPrice)}</p>
                      {surcharge > 0 && <p className="text-[10px] text-orange-500 font-medium">(+Extra Rp{Math.floor(surcharge / 1000)}K)</p>}
                    </div>
                  </div>

                  {(option.bonus || option.extra) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {option.bonus && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold border border-green-100">
                          <Ticket size={12} />
                          <span>{option.bonus}</span>
                        </div>
                      )}
                      {option.extra && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-[10px] font-bold border border-orange-100">
                          <AlertCircle size={12} />
                          <span>{option.extra}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </label>
          );
        })}

        <label
          className={`flex flex-col p-5 border rounded-[28px] cursor-pointer transition-all ${isSamsat ? 'border-[#27AAE1] bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          onClick={() => setSelectedId(samsatOption.id)}
        >
          <div className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSamsat ? 'border-[#27AAE1]' : 'border-gray-300'}`}>
              {isSamsat && <div className="w-2.5 h-2.5 bg-[#27AAE1] rounded-full"></div>}
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`${isSamsat ? 'text-[#27AAE1]' : 'text-gray-400'}`}>{samsatOption.icon}</span>
                <div>
                  <p className="font-bold text-gray-800">{samsatOption.title}</p>
                  <p className="text-xs text-gray-500 font-medium">Pengmbilan mandiri di kantor samsat <b>{region}</b></p>
                </div>
              </div>
              <span className="font-bold text-green-600">Gratis</span>
            </div>
          </div>
        </label>
      </div>

      {!isSamsat && (
        <div className="mt-8 border-t border-gray-50 pt-6 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-[#FF4D4D] fill-[#FF4D4D]" />
            <h4 className="font-bold text-sm text-gray-800">Lokasi Pengiriman Dokumen</h4>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <p className={`text-[14px] leading-relaxed ${address ? 'text-gray-600 font-medium' : 'text-[#27AAE1] font-bold italic'}`}>
                {address || 'Silakan masukkan alamat penjemputan dokumen Anda'}
              </p>
              {currentCity && <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">{currentCity}</p>}
            </div>
            <button onClick={onEditAddress} className="px-5 py-2 border border-gray-200 rounded-full text-[12px] font-bold text-gray-600 hover:bg-gray-50 shrink-0 transition-colors">
              {address ? 'Ubah Alamat' : 'Input Alamat'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};