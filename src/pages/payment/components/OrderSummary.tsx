import { useState } from 'react';
import { PriceDetailModal } from './PriceDetailModal';
import { CheckCircle2, Ticket, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { formatCurrency } from '@/lib/utils';
import { parseCurrency, getVehicleType } from '@/lib/order-utils';
import { createOrder } from '@/api/order';
import { toast } from 'sonner';

interface OrderSummaryProps {
  serviceImage?: string;
  serviceTitle?: string;
  deliveryFee: number;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isDetailValid?: boolean;
  paymentMethod?: string;
  onPayClick?: () => void;
}

export const OrderSummary = ({ serviceImage, serviceTitle, deliveryFee, address, city, latitude, longitude, onPayClick, isDetailValid = true, paymentMethod = 'BJB' }: OrderSummaryProps) => {
  const { setStep, setOrderId, setBookingId, orderData, setOrderData, selectedService, selectedPromoId } = useOrderStore();
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucherType, setAppliedVoucherType] = useState<'NONE' | 'DISCOUNT' | 'ONGKIR'>('NONE');
  const [voucherError, setVoucherError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { apiVehicleData } = orderData;

  const pkbPokok = parseCurrency(apiVehicleData?.PKB_POKOK);
  const pkbDenda = parseCurrency(apiVehicleData?.PKB_DENDA);
  const swdPokok = parseCurrency(apiVehicleData?.SWD_POKOK);
  const swdDenda = parseCurrency(apiVehicleData?.SWD_DENDA);
  const pnbStnk = parseCurrency(apiVehicleData?.ADM_STNK);
  const pnbTnkb = parseCurrency(apiVehicleData?.ADM_TNKB);

  const opsenPokok = parseCurrency(apiVehicleData?.OPSEN_POKOK);
  const opsenDenda = parseCurrency(apiVehicleData?.OPSEN_DENDA);

  const baseSubtotal = pkbPokok + pkbDenda + swdPokok + swdDenda + opsenPokok + opsenDenda + pnbStnk + pnbTnkb;
  const adminFee = 10000;

  const isOngkirVoucher = appliedVoucherType === 'ONGKIR';
  const isDiscountVoucher = appliedVoucherType === 'DISCOUNT';
  const currentPickupFee = (isOngkirVoucher || deliveryFee === 0) ? 0 : deliveryFee;
  const discountAmount = isDiscountVoucher ? Math.round(baseSubtotal * 0.05) : 0;

  const totalAmount = baseSubtotal + adminFee + currentPickupFee - discountAmount;

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

  const handlePayNow = async () => {
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

    setIsSubmitting(true);

    try {
      const derivedVehicleType = getVehicleType(apiVehicleData?.SWD_POKOK);

      const payload = {
        name: orderData.name || '',
        email: orderData.email || '',
        phoneNumber: orderData.phoneNumber || '',
        identityNumber: orderData.identityNumber || '',
        plateNumber: orderData.plateNumber || '',
        chassisNumber: orderData.chassisNumber || '',
        serviceId: selectedService?.id || '1',
        deliveryFee: deliveryFee,
        totalAmount: totalAmount,
        address: address || '',
        latitude: latitude,
        longitude: longitude,
        isSamsatPickup: deliveryFee === 0,
        city: city || orderData.kotaTujuan || '',
        paymentMethod: paymentMethod || 'BJB',
        voucherCode: voucherCode || '',
        promoId: selectedPromoId || '',
        vehicleType: derivedVehicleType,
        mutationType: orderData.mutationType || 'Lengkap',
        taxData: apiVehicleData,
      };

      const response = await createOrder(payload);

      if (response.success && response.results) {
        setOrderId(response.results.orderId);
        setBookingId(response.results.bookingId);
        setOrderData({
          ...orderData,
          totalAmount: totalAmount,
          finalTotal: response.results.finalTotal,
          paymentDetails: response.results.paymentDetails
        });

        const linkUrl = response.results.paymentDetails?.link_url || response.results.paymentDetails?.payment_url;
        
        if (linkUrl) {
           window.open(linkUrl, '_blank');
        }

        if (onPayClick) {
          onPayClick();
        } else {
          setStep(4);
        }
        window.scrollTo(0, 0);
      } else {
        toast.error(response.message || "Terjadi kesalahan saat membuat order");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const priceBreakdown = [
    { label: 'PKB Pokok', value: pkbPokok },
    { label: 'PKB Denda', value: pkbDenda },
    { label: 'SWDKLLJ Pokok', value: swdPokok },
    { label: 'SWDKLLJ Denda', value: swdDenda },
    { label: 'PNB STNK', value: pnbStnk },
    { label: 'PNB TNKB', value: pnbTnkb },
    { label: 'OPSEN PKB Pokok', value: opsenPokok },
    { label: 'OPSEN PKB Denda', value: opsenDenda },
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
        </div>
        <button
          onClick={() => setIsPriceModalOpen(true)}
          className="text-[10px] font-bold text-[#27AAE1] border border-sky-100 bg-sky-50/50 px-2 py-1 rounded-md hover:bg-sky-100 transition-colors"
        >
          Detail Harga
        </button>
      </div>

      <div className="mb-8 space-y-3">
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Kode Voucher</label>
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
              className="btn-kang-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide transition-colors"
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
            {formatCurrency(totalAmount)}
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
        disabled={isSubmitting}
        className="btn-kang-primary w-full text-white py-4 rounded-2xl font-extrabold text-base mt-8 shadow-lg shadow-sky-100 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Memproses...
          </>
        ) : 'Bayar Sekarang'}
      </button>

      <PriceDetailModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        items={priceBreakdown}
        total={baseSubtotal}
      />
    </div>
  );
};