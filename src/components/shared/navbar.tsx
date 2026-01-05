import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';

export const Navbar = () => {
  const resetOrder = useOrderStore((s) => s.resetOrder);
  const setView = useOrderStore((s) => s.setView);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 font-inter">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8 flex-1">
          <img 
            src="/logo-jumpapay.svg" 
            alt="JumpaPay" 
            className="h-7 md:h-8 w-auto cursor-pointer" 
            onClick={() => {
              resetOrder();
              setIsOpen(false);
            }}
          />
          
          <div className="hidden md:flex relative flex-1 max-w-md ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari Layanan" 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-jumpapay-blue"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-800 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => {
                setView('tracking');
                setIsOpen(false);
              }}
              className="bg-jumpapay-blue text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-sky-500 transition-all cursor-pointer"
            >
              Cek Order
            </button>
            <button 
              onClick={() => {
                setView('tutorial');
                setIsOpen(false);
              }}
              className="border border-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all cursor-pointer"
            >
              Tutorial Order
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-gray-100 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 flex flex-col gap-3">
          <button 
            onClick={() => {
              setView('tracking');
              setIsOpen(false);
            }}
            className="w-full bg-jumpapay-blue text-white px-5 py-3 rounded-xl text-sm font-bold text-center active:scale-[0.98] transition-all"
          >
            Cek Order
          </button>
          <button 
            onClick={() => {
              setView('tutorial');
              setIsOpen(false);
            }}
            className="w-full border border-gray-200 text-gray-600 px-5 py-3 rounded-xl text-sm font-semibold text-center"
          >
            Tutorial Order
          </button>
        </div>
      </div>
    </nav>
  );
};