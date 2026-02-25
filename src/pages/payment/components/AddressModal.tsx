import { useState } from 'react';
import { X, History, MapPin, Trash2, Info, LocateFixed, Loader2 } from 'lucide-react';
import { AddressData } from '@/types/payment';
import { toast } from 'sonner';
import { MapSelector } from './MapSelector';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AddressData;
  onSave: (newData: AddressData) => void;
}

const TooltipLabel = ({ label, info, required }: { label: string; info: string; required?: boolean }) => (
  <div className="flex items-center gap-2 ml-1 group relative">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <Info size={14} className="text-gray-300 cursor-help hover:text-[#27AAE1] transition-colors" />
      <div className="absolute top-full left-0 mt-2 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-[10px] rounded-lg shadow-xl z-110 leading-relaxed animate-in fade-in zoom-in duration-200">
        {info}
        <div className="absolute bottom-full left-2 border-8 border-transparent border-b-gray-800"></div>
      </div>
    </div>
  </div>
);

export const AddressModal = ({ isOpen, onClose, initialData, onSave }: AddressModalProps) => {
  const [formData, setFormData] = useState<AddressData>({
    alamatLengkap: initialData.alamatLengkap || '',
    kota: initialData.kota || '',
    keterangan: initialData.keterangan || ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({});

  const [history, setHistory] = useState<AddressData[]>(() => {
    const savedHistory = localStorage.getItem('address_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [isLocating, setIsLocating] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: -6.9175,
    lng: 107.6191
  });

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.state || '';
        const fullAddress = data.display_name;

        setFormData(prev => ({
          ...prev,
          alamatLengkap: fullAddress,
          kota: city
        }));
        setErrors({});
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Gagal mendapatkan alamat dari lokasi.");
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolokasi tidak didukung oleh browser Anda");
      return;
    }

    setIsLocating(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    const successCallback = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCoords({ lat: latitude, lng: longitude });
      await reverseGeocode(latitude, longitude);
      toast.success("Lokasi berhasil didapatkan");
      setIsLocating(false);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error);

      // If high accuracy failed, try again with low accuracy
      if (options.enableHighAccuracy) {
        console.log("Retrying with low accuracy...");
        navigator.geolocation.getCurrentPosition(
          successCallback,
          (secondError) => {
            console.error("Geolocation second error:", secondError);
            let message = "Gagal mendapatkan lokasi.";
            if (secondError.code === 1) message = "Izin lokasi ditolak. Silakan aktifkan izin lokasi di browser Anda.";
            else if (secondError.code === 2) message = "Lokasi tidak tersedia. Pastikan GPS/Layanan lokasi aktif.";
            else if (secondError.code === 3) message = "Waktu habis saat mencoba mendapatkan lokasi.";
            toast.error(message);
            setIsLocating(false);
          },
          { ...options, enableHighAccuracy: false }
        );
        return;
      }

      let message = "Gagal mendapatkan lokasi.";
      if (error.code === 1) message = "Izin lokasi ditolak. Silakan aktifkan izin lokasi di browser Anda.";
      else if (error.code === 2) message = "Lokasi tidak tersedia. Pastikan GPS/Layanan lokasi aktif.";
      else if (error.code === 3) message = "Waktu habis saat mencoba mendapatkan lokasi.";
      toast.error(message);
      setIsLocating(false);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  };

  const handleMapChange = async (lat: number, lng: number) => {
    setCoords({ lat, lng });
    await reverseGeocode(lat, lng);
  };

  const handleChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const deleteHistory = (e: React.MouseEvent, indexToDelete: number) => {
    e.stopPropagation();
    const updatedHistory = history.filter((_, index) => index !== indexToDelete);
    setHistory(updatedHistory);
    localStorage.setItem('address_history', JSON.stringify(updatedHistory));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof AddressData, string>> = {};
    if (!formData.alamatLengkap.trim()) newErrors.alamatLengkap = "Alamat lengkap wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      const updatedHistory = [
        formData,
        ...history.filter(item => item.alamatLengkap !== formData.alamatLengkap)
      ].slice(0, 3);
      localStorage.setItem('address_history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      onSave(formData);
      onClose();
    }
  };

  const selectFromHistory = (item: AddressData) => {
    setFormData({
      alamatLengkap: item.alamatLengkap,
      kota: item.kota,
      keterangan: item.keterangan
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 font-inter">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-[32px] md:rounded-[40px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <h3 className="font-bold text-gray-800 text-lg font-inter">Detail Pengambilan Dokumen</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 text-left overflow-y-auto scrollbar-hide">
          {history.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 ml-1">
                <History size={14} />
                <label className="text-[10px] font-bold uppercase tracking-widest font-inter">Riwayat Alamat</label>
              </div>
              <div className="grid gap-2">
                {history.map((item, idx) => (
                  <div key={idx} className="relative group/item">
                    <button type="button" onClick={() => selectFromHistory(item)} className="w-full flex items-start gap-3 p-3 pr-10 rounded-2xl border border-gray-100 hover:border-[#27AAE1] hover:bg-sky-50 transition-all text-left">
                      <MapPin size={16} className="text-gray-300 group-hover/item:text-[#27AAE1] mt-0.5 shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-gray-700 truncate">{item.alamatLengkap}</p>
                        <p className="text-[10px] text-gray-400 font-medium font-inter">{item.kota}</p>
                      </div>
                    </button>
                    <button onClick={(e) => deleteHistory(e, idx)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover/item:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4 pt-2 border-t border-dashed border-gray-100">
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-100 text-gray-500 hover:border-[#27AAE1] hover:text-[#27AAE1] hover:bg-sky-50 transition-all font-bold text-sm"
            >
              {isLocating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <LocateFixed size={18} />
              )}
              {isLocating ? 'Mencari Lokasi...' : 'Pin Lokasi Saat Ini'}
            </button>

            <div className="relative group/map">
              <MapSelector lat={coords.lat} lng={coords.lng} onChange={handleMapChange} />
            </div>

            <div className="space-y-1">
              <TooltipLabel label="Alamat Lengkap" required info="Contoh: Perumahan Mahkota Mas Blok O4 RT 002/RW 009 Kec Cidadap" />
              <textarea rows={3} value={formData.alamatLengkap} onChange={(e) => handleChange('alamatLengkap', e.target.value)} className={`w-full bg-gray-50 border ${errors.alamatLengkap ? 'border-red-500' : 'border-gray-100'} rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#27AAE1] transition-all resize-none mt-2 font-inter`} />
              {errors.alamatLengkap && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.alamatLengkap}</p>}
            </div>

            <div className="space-y-1">
              <TooltipLabel label="Keterangan Tambahan (Opsional)" info="Contoh: Rumah Hook, warna hijau, pagar hitam" />
              <textarea rows={2} value={formData.keterangan} onChange={(e) => handleChange('keterangan', e.target.value)} className={`w-full bg-gray-50 border ${errors.keterangan ? 'border-red-500' : 'border-gray-100'} rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#27AAE1] transition-all resize-none mt-2 font-inter`} />
              {errors.keterangan && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.keterangan}</p>}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50/50 flex gap-3 border-t border-gray-100 sticky bottom-0 z-10">
          <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all text-sm font-inter">Batal</button>
          <button type="button" onClick={handleSave} className="flex-1 bg-[#27AAE1] text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all text-sm font-inter">Simpan Detail</button>
        </div>
      </div>
    </div>
  );
};