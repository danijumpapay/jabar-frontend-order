import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useOrderStore } from "../../store/useOrderStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
  const setView = useOrderStore((s) => s.setView);
  const setStep = useOrderStore((s) => s.setStep);
  const [isOpen, setIsOpen] = useState(false);

  const handleGoHome = () => {
    setView("order");
    setStep(1);
    setIsOpen(false);
  };

  const navigateTo = (view: "tracking" | "tutorial") => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 font-inter text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8 flex-1">
          <img
            src="/logo-kangpajak.svg"
            alt="Kang Pajak Logo"
            className="h-7 md:h-8 w-auto cursor-pointer transition-opacity hover:opacity-80"
            onClick={handleGoHome}
          />

          <div className="hidden md:flex relative flex-1 max-w-md ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
            <Input
              type="text"
              placeholder="Cari Layanan"
              className="w-full bg-gray-50 border-gray-200 rounded-xl pl-10 focus-visible:ring-[#27AAE1]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => navigateTo("tracking")}
              className="btn-kang-primary text-white px-6 rounded-full font-bold shadow-lg shadow-[#27AAE1]/20 transition-all active:scale-95"
            >
              Cek Order
            </Button>
            <Button
              variant="outline"
              onClick={() => navigateTo("tutorial")}
              className="border-gray-200 text-gray-600 px-6 rounded-full font-semibold hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              Tutorial Order
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 py-6 flex flex-col gap-3">
          <Button
            onClick={() => navigateTo("tracking")}
            className="btn-kang-primary w-full h-12 text-white rounded-xl font-bold transition-all active:scale-[0.98]"
          >
            Cek Order
          </Button>
          <Button
            variant="outline"
            onClick={() => navigateTo("tutorial")}
            className="w-full h-12 border-gray-200 text-gray-600 rounded-xl font-semibold transition-all active:scale-[0.98]"
          >
            Tutorial Order
          </Button>
        </div>
      </div>
    </nav>
  );
};
