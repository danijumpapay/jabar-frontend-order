import { Search } from 'lucide-react';
import { useOrderStore } from '../../store/use-order-store';

export const Navbar = () => {
  const resetOrder = useOrderStore((s) => s.resetOrder);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-container mx-auto px-4 md:px-0 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8 flex-1">
          <img 
            src="/logo-jumpapay.svg" 
            alt="JumpaPay" 
            className="h-8 w-auto cursor-pointer" 
            onClick={() => resetOrder()}
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
          <button className="bg-jumpapay-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90">
            Cek Order
          </button>
          <button className="hidden md:block border border-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-50">
            Tutorial Order
          </button>
        </div>
      </div>
    </nav>
  );
};