import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PriceItem } from '@/types/payment';

interface PriceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: PriceItem[];
  total: number;
}

export const PriceDetailModal = ({ isOpen, onClose, items, total }: PriceDetailModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 font-inter">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg font-inter">Rincian Pembayaran</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center font-inter">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className={`text-sm ${item.isBold ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <div className="flex justify-between items-center font-inter">
              <span className="text-base font-bold text-gray-900">Total Tagihan</span>
              <span className="text-lg font-extrabold text-[#27AAE1]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <button
            onClick={onClose}
            className="w-full bg-[#27AAE1] text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all font-inter text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};