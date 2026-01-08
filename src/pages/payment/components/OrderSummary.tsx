interface OrderSummaryProps {
  serviceImage?: string;
  serviceTitle?: string;
}

export const OrderSummary = ({ serviceImage, serviceTitle }: OrderSummaryProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-8 shadow-sm sticky top-8 text-left">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-base">Detail Order</h3>
        <button className="bg-[#27AAE1] text-white px-3 py-1.5 rounded-lg text-[10px] hover:bg-sky-500 font-extrabold tracking-wide">Tambah Jasa</button>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <img src={serviceImage || '/services/mutasi.png'} className="w-16 h-16 rounded-2xl object-cover" alt="Service" />
        <div className="flex-1">
          <p className="font-bold text-[13px] text-gray-800 leading-tight mb-1">{serviceTitle || 'Mutasi STNK'}</p>
          <p className="text-[13px] font-bold text-gray-900">Rp2.651.000</p>
        </div>
        <button className="text-[10px] font-bold text-gray-500 border border-gray-100 px-2 py-1 rounded-md">Detail Harga</button>
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Subtotal</span>
          <span className="text-gray-800 font-bold">2.651.000</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Biaya Penjemputan</span>
          <div className="flex gap-2">
            <span className="text-gray-300 line-through font-bold">50.000</span>
            <span className="text-[#27AAE1] font-bold">Gratis</span>
          </div>
        </div>
        <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
          <span className="font-bold text-gray-800 text-lg">Total</span>
          <span className="text-2xl font-black text-gray-900 underline decoration-gray-100 underline-offset-8">2.651.000</span>
        </div>
      </div>

      <button className="w-full bg-[#27AAE1] text-white py-4.5 rounded-2xl font-extrabold text-base mt-8 shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all active:scale-[0.98]">
        Bayar Sekarang
      </button>
    </div>
  );
};