import { useState } from 'react';
import { PriceDetailModal } from './PriceDetailModal';
import { CheckCircle2, Ticket, XCircle, AlertCircle } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { formatCurrency } from '@/lib/utils';

interface OrderSummaryProps {
  serviceImage?: string;
  serviceTitle?: string;
  deliveryFee: number;
  address?: string;
  isDetailValid?: boolean;
  onPayClick?: () => void;
}

export const OrderSummary = ({ serviceImage, serviceTitle, deliveryFee, address, onPayClick, isDetailValid = true }: OrderSummaryProps) => {
  const { setStep, setOrderId, orderData, setOrderData } = useOrderStore();
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucherType, setAppliedVoucherType] = useState<'NONE' | 'DISCOUNT' | 'ONGKIR'>('NONE');
  const [voucherError, setVoucherError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [detailError, setDetailError] = useState(false);

  const baseSubtotal = 345600;
  const adminFee = 10000;

  const isOngkirVoucher = appliedVoucherType === 'ONGKIR';
  const isDiscountVoucher = appliedVoucherType === 'DISCOUNT';
  const currentPickupFee = (isOngkirVoucher || deliveryFee === 0) ? 0 : deliveryFee;
  const discountAmount = isDiscountVoucher ? Math.round(baseSubtotal * 0.05) : 0;

  // Correct calculation for external total (includes all fees)
  const finalTotal = baseSubtotal + adminFee + currentPickupFee - discountAmount;

  // Calculate total for modal (excluding admin and ongkir as they are not separate items in the list)
  const modalTotal = baseSubtotal - discountAmount;

  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toLowerCase();
    if (code === 'voucher') {
      setAppliedVoucherType('DISCOUNT');
      setVoucherError(false);
    } else if (code === 'ongkir') {
      setAppliedVoucherType('ONGKIR');
      setVoucherError(false);
    } else {
      setVoucherError(true);
      setAppliedVoucherType('NONE');
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucherType('NONE');
    setVoucherCode('');
    setVoucherError(false);
  };

  const handlePayNow = () => {
    setAddressError(false);
    setDetailError(false);

    const isAddressMissing = !address ||
      address.trim() === '' ||
      address.toLowerCase().includes('belum ada alamat');

    if (deliveryFee > 0 && isAddressMissing) {
      setAddressError(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isDetailValid) {
      setDetailError(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setAddressError(false);
    setOrderId("12345");
    setOrderData({
      ...orderData,
      finalTotal: finalTotal
    });

    if (onPayClick) {
      onPayClick();
    } else {
      setStep(4);
    }
    window.scrollTo(0, 0);
  };

  const priceBreakdown = [
    { label: 'PKB Pokok', value: 90700 },
    { label: 'PKB Denda', value: 0 },
    { label: 'SWDKLLJ Pokok', value: 35000 },
    { label: 'SWDKLLJ Denda', value: 0 },
    { label: 'PNB STNK', value: 100000 },
    { label: 'PNB TNKB', value: 60000 },
    { label: 'OPSEN PKB Pokok', value: 59900 },
    { label: 'OPSEN PKB Denda', value: 0 },
    ...(isDiscountVoucher ? [{ label: 'Diskon Voucher (5%)', value: -discountAmount, isBold: true }] : []),
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-8 shadow-sm sticky top-8 text-left transition-all font-inter">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-base">Detail Order</h3>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <img
          src={serviceImage || '/services/mutasi.png'}
          className="w-16 h-16 rounded-2xl object-cover border border-gray-50"
          alt="Service"
        />
        <div className="flex-1">
          <p className="font-bold text-[13px] text-gray-800 leading-tight mb-1">
            {serviceTitle || 'Mutasi STNK'}
          </p>
          <p className="text-[13px] font-bold text-gray-900">{formatCurrency(345600)}</p>
        </div>
        <button
          onClick={() => setIsPriceModalOpen(true)}
          className="text-[10px] font-bold text-[#27AAE1] border border-sky-100 bg-sky-50/50 px-2 py-1 rounded-md hover:bg-sky-100 transition-colors"
        >
          Detail Harga
        </button>
      </div>

      <div className="mb-8 space-y-3">
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Voucher Code</label>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => {
                setVoucherCode(e.target.value);
                setVoucherError(false);
              }}
              disabled={appliedVoucherType !== 'NONE'}
              placeholder="KODE VOUCHER"
              className={`w-full bg-gray-50 border ${voucherError ? 'border-red-500' : 'border-gray-100'} rounded-2xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:border-[#27AAE1] transition-all disabled:opacity-60 uppercase`}
            />
          </div>
          {appliedVoucherType === 'NONE' ? (
            <button
              onClick={handleApplyVoucher}
              className="btn-akang-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide transition-colors"
            >
              Apply
            </button>
          ) : (
            <button
              onClick={handleRemoveVoucher}
              className="bg-red-50 text-red-500 px-4 rounded-2xl text-xs font-bold hover:bg-red-100 transition-all"
            >
              Hapus
            </button>
          )}
        </div>
        {voucherError && (
          <p className="text-[10px] text-red-500 font-medium ml-1 flex items-center gap-1">
            <XCircle size={12} /> Kode voucher tidak valid
          </p>
        )}
        {appliedVoucherType !== 'NONE' && (
          <p className="text-[10px] text-green-600 font-medium ml-1 flex items-center gap-1">
            <CheckCircle2 size={12} />
            {isOngkirVoucher ? 'Voucher Ongkir Berhasil!' : 'Voucher Diskon 5% Berhasil!'}
          </p>
        )}
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Subtotal</span>
          <span className="text-gray-800 font-bold">{formatCurrency(baseSubtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Biaya Admin</span>
          <span className="text-gray-800 font-bold">{formatCurrency(adminFee)}</span>
        </div>

        {isDiscountVoucher && (
          <div className="flex justify-between text-sm animate-in fade-in slide-in-from-top-1">
            <span className="text-gray-400 font-medium">Diskon Voucher</span>
            <span className="text-green-600 font-bold">-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Ongkir</span>
          <div className="flex gap-2">
            <span className={`font-bold ${(isOngkirVoucher || deliveryFee === 0) ? 'text-gray-300 line-through' : 'text-gray-800'}`}>
              {formatCurrency(deliveryFee)}
            </span>
            {(isOngkirVoucher || deliveryFee === 0) && <span className="text-[#27AAE1] font-bold">Gratis</span>}
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
          <span className="font-bold text-gray-800 text-lg">Total</span>
          <span className="text-2xl font-black text-gray-900 underline decoration-gray-100 underline-offset-8">
            {formatCurrency(finalTotal)}
          </span>
        </div>
      </div>

      {addressError && (
        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="text-red-500 shrink-0" size={18} />
          <p className="text-[11px] font-bold text-red-600 leading-tight">
            Alamat pengantaran belum diisi. Silakan lengkapi lokasi pengantaran dokumen terlebih dahulu.
          </p>
        </div>
      )}

      {detailError && (
        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="text-red-500 shrink-0" size={18} />
          <p className="text-[11px] font-bold text-red-600 leading-tight">
            Detail pengiriman belum lengkap. Mohon isi kota/kabupaten tujuan pengiriman dokumen.
          </p>
        </div>
      )}

      <button
        onClick={handlePayNow}
        className="btn-akang-primary w-full text-white py-4 rounded-2xl font-extrabold text-base mt-8 shadow-lg shadow-sky-100 transition-all active:scale-[0.98]"
      >
        Bayar Sekarang
      </button>

      <PriceDetailModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        items={priceBreakdown}
        total={modalTotal}
      />
    </div>
  );
};