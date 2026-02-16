import { useOrderStore } from '../../../store/useOrderStore';
import { HelpCircle } from 'lucide-react';
import SERVICES from '@/data/services.json';

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
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {SERVICES.map((item) => {
          const isActive = item.id === "1" || item.id === "2" || item.id === "3";
          
          return (
            <div 
              key={item.id}
              onClick={() => isActive && setService(item)}
              className={`bg-white rounded-2xl overflow-hidden transition-all group ${
                isActive 
                  ? 'cursor-pointer' 
                  : 'cursor-not-allowed opacity-60'
              }`}
            >
              <div className={`aspect-square rounded-2xl overflow-hidden ${!isActive && 'grayscale'}`}>
                <img 
                  src={item.image}
                  alt={item.title} 
                  className={`w-full h-full object-cover transition-transform ${isActive && 'group-hover:scale-110'}`} 
                />
              </div>
              <div className="pt-3 px-1 space-y-1">
                <h3 className={`font-bold text-sm md:text-base leading-tight ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                  {item.title}
                </h3>
                {!isActive && (
                  <p className="text-[10px] font-extrabold text-[#27AAE1] uppercase tracking-wider">
                    Segera Hadir
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};