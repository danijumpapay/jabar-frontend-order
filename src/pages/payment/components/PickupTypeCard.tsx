import { MapPin } from 'lucide-react';

interface PickupTypeCardProps {
  onEditAddress: () => void;
}

export const PickupTypeCard = ({ onEditAddress }: PickupTypeCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-sm text-left">
      <h3 className="font-bold text-gray-800 mb-6 text-base font-inter">Tipe Penjemputan Dokumen</h3>
      <label className="flex items-center justify-between p-5 border border-[#27AAE1] bg-blue-50/30 rounded-3xl cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full border-2 border-[#27AAE1] flex items-center justify-center shrink-0">
            <div className="w-3 h-3 bg-[#27AAE1] rounded-full"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#27AAE1] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,120a41,41,0,0,0-6.6.55l-5.82-15.14A55.64,55.64,0,0,1,216,104a8,8,0,0,0,0-16H196.88L183.47,53.13A8,8,0,0,0,176,48H144a8,8,0,0,0,0,16h26.51l9.23,24H152c-18.5,0-33.5,4.31-43.37,12.46a16,16,0,0,1-16.76,2.07C81.29,97.72,31.13,77.33,26.71,75.6L21,73.36A17.74,17.74,0,0,0,16,72a8,8,0,0,0-2.87,15.46h0c.46.18,47.19,18.3,72.13,29.63a32.15,32.15,0,0,0,33.56-4.29c4.86-4,14.57-8.8,33.19-8.8h18.82a71.74,71.74,0,0,0-24.17,36.59A15.86,15.86,0,0,1,131.32,152H79.2a40,40,0,1,0,0,16h52.12a31.91,31.91,0,0,0,30.74-23.1,56,56,0,0,1,26.59-33.72l5.82,15.13A40,40,0,1,0,216,120ZM40,168H62.62a24,24,0,1,1,0-16H40a8,8,0,0,0,0,16Zm176,16a24,24,0,0,1-15.58-42.23l8.11,21.1a8,8,0,1,0,14.94-5.74L215.35,136l.65,0a24,24,0,0,1,0,48Z"></path>
              </svg>
            </div>
            <div>
              <p className="text-[16px] text-gray-800 font-bold leading-tight font-inter">Dokumen Dijemput</p>
              <p className="text-[16px] font-bold text-gray-800 mt-1 font-inter">Rp50.000</p>
            </div>
          </div>
        </div>
      </label>
      
      <div className="mt-8 border-t border-gray-50 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={20} className="text-[#FF4D4D] fill-[#FF4D4D]" />
          <h4 className="font-bold text-sm text-gray-800 font-inter">Lokasi Pengambilan Dokumen</h4>
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <p className="text-[14px] text-gray-500 max-w-xl leading-relaxed font-medium font-inter">
            Bukit Golf Mediterania, Cluster Royal Mansion, Blok Royal No. 5, PIK FIT, Pantai Indah Kapuk, Jakarta Utara
          </p>
          <button 
            onClick={onEditAddress}
            className="px-5 py-2 border border-gray-200 rounded-full text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all font-inter"
          >
            Ubah Alamat
          </button>
        </div>
      </div>
    </div>
  );
};