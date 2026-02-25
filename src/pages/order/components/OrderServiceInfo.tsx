import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface OrderServiceInfoProps {
  title?: string;
  image?: string;
  description?: string;
}

export const OrderServiceInfo = ({ title, description }: OrderServiceInfoProps) => {
  const [showFullDetail, setShowFullDetail] = useState(false);

  return (
    <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
      <div className="w-full">
        <div className="overflow-hidden shadow-sm bg-gray-100 aspect-video w-full rounded-2xl md:rounded-[40px]">
          <img
            src='/jabar-illustration.webp'
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          {title || 'Mutasi STNK'}
        </h1>

        <div className="bg-[#F8F9FA] p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-gray-100">
          <div className={`text-gray-600 leading-relaxed text-sm transition-all duration-300 ${showFullDetail ? '' : 'line-clamp-3'}`}>
            {description ||
              `Kang Pajak merupakan Mitra resmi Bapenda Jabar dan Bank BJB untuk melayani pembayaran pajak kendaraan bermotor secara online di daerah Jawa Barat. Anda dapat melakukan pembayaran pajak kendaraan dengan mudah dan cepat tanpa harus datang ke kantor Samsat`}
          </div>

          <Button
            variant="ghost"
            type="button"
            onClick={() => setShowFullDetail(!showFullDetail)}
            className="mt-4 p-0 h-auto text-[#27AAE1] font-bold text-xs md:text-sm hover:bg-transparent hover:opacity-80 flex items-center gap-2"
          >
            {showFullDetail ? 'Tutup Detail' : 'Lihat Detail'}
            {showFullDetail ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};