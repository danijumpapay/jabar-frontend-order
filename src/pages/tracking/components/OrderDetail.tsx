import { Clock } from 'lucide-react';
import { OrderInfo } from '../types';

interface OrderDetailProps {
  data: OrderInfo[];
}

export const OrderDetail = ({ data }: OrderDetailProps) => (
  <div className="space-y-10">
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-left border-b border-gray-50 pb-4">
      {data.map((item, i) => (
        <div key={i} className="space-y-1 font-inter">
          <p className="text-xs text-gray-400 font-medium">{item.label}</p>
          <p className="text-sm font-bold text-gray-900">{item.val}</p>
        </div>
      ))}
    </div>

    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 space-y-4 border border-gray-100/50 text-left">
      <p className="text-sm font-bold text-gray-800">JumpaPay akan membantu pengurusan dokumenmu:</p>
      <ul className="text-xs text-gray-600 space-y-2 list-disc ml-4">
        <li>KTP Asli Pemilik Kendaraan Baru</li>
        <li>STNK Asli Kendaraan</li>
      </ul>
      <div className="pt-2">
        <div className="flex items-center gap-2 text-gray-800 mb-1">
          <Clock size={16} className="text-jumpapay-blue" />
          <p className="text-sm">Dokumen milikmu akan diambil pada: <span className="text-green-600 font-bold ml-1">24 Desember 2025 | 09.00 - 12.00</span></p>
        </div>
        <div className="flex items-center gap-2 text-gray-800 mb-1">
          <p className="text-xs text-gray-600">Ingin mengubah jadwal pengambilan dokumen? </p>
          <a href="https://wa.me/628119509889" target="_blank" rel="noreferrer" className="text-xs text-jumpapay-blue font-bold hover:underline">
            Hubungi CS JumpaPay di Whatsapp dengan klik di sini.
          </a>
        </div>
      </div>
    </div>
  </div>
);