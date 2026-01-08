import { useOrderStore } from '../../../store/useOrderStore';
import { HelpCircle } from 'lucide-react';

const SERVICES = [
  { id: '1', title: 'Mutasi STNK', price: 150000, image: '/services/mutasi.png' },
  { id: '2', title: 'Urus STNK Tahunan', price: 40000, image: '/services/tahunan.png' },
  { id: '3', title: 'Urus STNK 5 Tahun', price: 50000, image: '/services/5tahun.png' },
  { id: '4', title: 'Balik Nama', price: 200000, image: '/services/balik-nama.png' },
  { id: '5', title: 'Blokir Nomor Plat', price: 150000, image: '/services/blokir.png' },
];

export const ServiceGrid = () => {
  const setService = useOrderStore((s) => s.setService);
  const setView = useOrderStore((s) => s.setView);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Layanan Kami</h2>

        <button 
          onClick={() => setView('bantuan')}
          className="hidden md:flex items-center gap-2 bg-white border border-gray-200 pl-3 pr-5 py-2 rounded-full shadow-sm hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
        >
          <HelpCircle size={20} className="text-[#1A1A1A]" />
          <span className="text-[#1A1A1A] font-bold text-[15px]">Bantuan</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {SERVICES.map((item) => (
          <div 
            key={item.id}
            onClick={() => setService(item)}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer group transition-all"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
               <img 
                 src={item.image}
                 alt={item.title} 
                 className="w-full h-full object-cover transition-transform group-hover:scale-110" 
               />
            </div>
            <div className="pt-3 px-1">
              <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{item.title}</h3>
              <div className="mt-2 flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Mulai dari</span>
                <span className="font-bold text-jumpapay-blue text-xs md:text-sm">
                  Rp{item.price.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};