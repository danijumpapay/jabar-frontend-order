import { X, Navigation } from 'lucide-react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddressModal = ({ isOpen, onClose }: AddressModalProps) => {
  if (!isOpen) return null;

  const labelStyles = "text-xs font-bold text-gray-400 uppercase tracking-wider font-inter";
  const inputStyles = "w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:border-[#27AAE1] font-inter transition-all";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-[32px] md:rounded-[40px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg font-inter">Ubah Alamat Penjemputan</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-left">
          <div className="space-y-2">
            <label className={labelStyles}>Detail Alamat</label>
            <textarea 
              rows={3}
              className={`${inputStyles} rounded-2xl p-4`}
              placeholder="Masukkan alamat lengkap (Nama jalan, nomor rumah, dsb)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelStyles}>Kota</label>
              <input type="text" className={inputStyles} placeholder="Jakarta Utara" />
            </div>
            <div className="space-y-2">
              <label className={labelStyles}>Kode Pos</label>
              <input type="text" className={inputStyles} placeholder="14460" />
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-[#27AAE1] hover:text-[#27AAE1] transition-all font-inter text-sm font-bold">
            <Navigation size={18} />
            Pilih via Google Maps
          </button>
        </div>

        <div className="p-6 bg-gray-50/50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all text-sm">Batal</button>
          <button className="flex-1 bg-[#27AAE1] text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all text-sm">Simpan Alamat</button>
        </div>
      </div>
    </div>
  );
};