import { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, Copy, ChevronDown, ChevronUp, Landmark, Smartphone, Check, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { formatCurrency } from '@/lib/utils';
import { getPaymentStatus } from '@/api/order';
import { toast } from 'sonner';

const PAYMENT_INSTRUCTIONS: Record<string, { atm: string[], mobile: string[] }> = {
  BJB: {
    atm: [
      "Masukkan Kartu ATM dan PIN Anda",
      "Pilih menu Transaksi Lainnya",
      "Pilih menu Transfer",
      "Pilih menu Ke Rekening BJB Virtual Account",
      "Masukkan nomor VA yang tertera",
      "Periksa detail tagihan, lalu pilih Ya/OK"
    ],
    mobile: [
      "Login ke aplikasi m-BJB",
      "Pilih menu m-Transfer",
      "Pilih BJB Virtual Account",
      "Input nomor VA yang tertera",
      "Periksa detail tagihan, lalu klik Send",
      "Masukkan PIN m-BJB Anda"
    ]
  },
  BCA: {
    atm: [
      "Masukkan Kartu ATM dan PIN BCA Anda",
      "Pilih menu Transaksi Lainnya",
      "Pilih menu Transfer",
      "Pilih menu Ke Rekening BCA Virtual Account",
      "Masukkan nomor VA yang tertera",
      "Periksa detail tagihan, lalu pilih Ya/OK"
    ],
    mobile: [
      "Login ke m-BCA (BCA Mobile)",
      "Pilih menu m-Transfer",
      "Pilih BCA Virtual Account",
      "Input nomor VA yang tertera",
      "Periksa detail tagihan, lalu klik Send",
      "Masukkan PIN m-BCA Anda"
    ]
  },
  MANDIRI: {
    atm: [
      "Masukkan Kartu ATM dan PIN Mandiri Anda",
      "Pilih menu Bayar/Beli",
      "Pilih Multi Payment atau Other",
      "Masukkan Kode Perusahaan jika diminta, atau pilih Virtual Account",
      "Masukkan nomor VA yang tertera",
      "Periksa detail tagihan, lalu pilih Benar/Ya"
    ],
    mobile: [
      "Login ke aplikasi Livin' by Mandiri",
      "Pilih menu Bayar",
      "Pilih E-Commerce atau Virtual Account",
      "Pilih Penyedia Jasa atau masukkan nomor VA",
      "Input nomor VA tertera",
      "Tekan Lanjut dan masukkan PIN Anda"
    ]
  },
  BNI: {
    atm: [
      "Masukkan Kartu ATM dan PIN BNI Anda",
      "Pilih menu Menu Lain",
      "Pilih Transfer",
      "Pilih jenis rekening asal dan pilih Ke Rekening BNI",
      "Pilih Virtual Account Billing",
      "Masukkan nomor VA, lalu pilih Benar"
    ],
    mobile: [
      "Login ke BNI Mobile Banking",
      "Pilih menu Transfer",
      "Pilih Virtual Account Billing",
      "Pilih rekening debet",
      "Input nomor VA pada tab Input Baru",
      "Periksa detail dan masukkan Password Transaksi"
    ]
  },
  BRI: {
    atm: [
      "Masukkan Kartu ATM dan PIN BRI Anda",
      "Pilih menu Transaksi Lain",
      "Pilih menu Pembayaran",
      "Pilih menu Lainnya",
      "Pilih menu BRIVA",
      "Masukkan nomor VA, lalu pilih Ya"
    ],
    mobile: [
      "Login ke aplikasi BRImo",
      "Pilih menu BRIVA",
      "Pilih Sumber Dana",
      "Input nomor VA yang tertera",
      "Periksa detail tagihan, lalu klik Bayar",
      "Masukkan PIN BRImo Anda"
    ]
  },
  PERMATA: {
    atm: [
      "Masukkan Kartu ATM dan PIN Permata Anda",
      "Pilih menu Transaksi Lainnya",
      "Pilih menu Pembayaran",
      "Pilih menu Virtual Account",
      "Masukkan nomor VA yang tertera",
      "Periksa detail tagihan, lalu pilih Ya"
    ],
    mobile: [
      "Login ke PermataMobile X",
      "Pilih menu Bayar Tagihan",
      "Pilih Virtual Account",
      "Input nomor VA yang tertera",
      "Periksa detail tagihan, lalu klik Konfirmasi",
      "Masukkan PIN Anda"
    ]
  }
};

export const WaitingPaymentPage = () => {
  const { setStep, orderData, resetOrder } = useOrderStore();
  const [openAccordion, setOpenAccordion] = useState<string | null>('atm');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60);
  const [isVerifying, setIsVerifying] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const paymentDetails = orderData?.paymentDetails;
  const orderId = useOrderStore.getState().orderId;
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);


  const vaNumber =
    paymentDetails?.va_numbers?.[0]?.va_number ||
    paymentDetails?.va_number ||
    paymentDetails?.permata_va_number ||
    paymentDetails?.bca_va_number ||
    paymentDetails?.bni_va_number ||
    paymentDetails?.bri_va_number ||
    "gagal generate VA";

  const bankName =
    paymentDetails?.va_numbers?.[0]?.bank?.toUpperCase() ||
    (paymentDetails?.permata_va_number ? "PERMATA" :
      paymentDetails?.bca_va_number ? "BCA" :
        paymentDetails?.bni_va_number ? "BNI" :
          paymentDetails?.bri_va_number ? "BRI" : "BJB");

  const instructions = PAYMENT_INSTRUCTIONS[bankName] || PAYMENT_INSTRUCTIONS.BJB;

  const checkPaymentStatus = useCallback(async (isManual = false) => {
    if (!orderId) return;

    try {
      if (isManual) setIsVerifying(true);
      const resp = await getPaymentStatus(orderId);

      if (resp.success && resp.results?.paid) {
        if (pollTimerRef.current) clearInterval(pollTimerRef.current);
        toast.success("Pembayaran Terverifikasi!");
        setStep(5);
      } else if (isManual) {
        toast.error("Pembayaran belum kami terima. Silakan selesaikan pembayaran terlebih dahulu.");
      }
    } catch (err) {
    } finally {
      if (isManual) setIsVerifying(false);
    }
  }, [orderId, setStep]);

  useEffect(() => {
    if (orderId) {
      pollTimerRef.current = setInterval(() => {
        checkPaymentStatus(false);
      }, 5000);
    }

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [orderId, checkPaymentStatus]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmCancel = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleFinalExit = () => {
    setShowSuccessModal(false);
    resetOrder();
    setStep(1);
  };

  return (
    <div className="md:py-8 space-y-8 font-inter animate-in fade-in duration-500">
      <div className="text-left">
        <Breadcrumbs
          parentPage="Pembayaran"
          onParentClick={() => setStep(3)}
          currentPage="Menunggu Pembayaran"
        />
      </div>

      <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm">
        <div className="p-8 md:p-10 text-center border-b border-gray-50 bg-gray-50/30">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full mb-4">
            <Clock size={16} className={timeLeft > 0 ? "animate-pulse" : ""} />
            <span className="text-xs font-bold uppercase tracking-wider">Menunggu Pembayaran</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Selesaikan Sebelum</h1>
          <p className="text-xl font-mono font-bold text-[#27AAE1]">
            {timeLeft > 0 ? formatTime(timeLeft) : "WAKTU HABIS"}
          </p>
        </div>

        <div className="p-8 space-y-8 text-left">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nomor Order</p>
                  <p className="font-bold text-gray-800">{useOrderStore.getState().bookingId || "-"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Metode Pembayaran</p>
                  <p className="font-bold text-gray-800">{bankName} Virtual Account</p>
                </div>
              </div>
              <img src={`/payments/${bankName.toLowerCase()}.svg`} alt={bankName} className="h-10" />
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 relative group">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Nomor Virtual Account</p>
              <div className="flex justify-between items-center">
                <span className="text-xl md:text-2xl font-black text-gray-900 tracking-widest">{vaNumber}</span>
                <div className="relative">
                  {copied && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1.5 px-3 rounded-lg animate-in fade-in zoom-in duration-200 font-bold whitespace-nowrap">
                      Berhasil Disalin!
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                  <button
                    onClick={() => handleCopy(vaNumber)}
                    className={`p-3 rounded-xl transition-all shadow-sm border ${copied
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-white border-gray-200 text-[#27AAE1] hover:bg-[#27AAE1] hover:text-white'
                      }`}
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-2">
              <span className="text-sm text-gray-500 font-medium">Total Tagihan</span>
              <span className="text-xl font-black text-gray-900">
                {formatCurrency(orderData?.finalTotal || 0)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-sm mb-4">Instruksi Pembayaran</h4>
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'atm' ? null : 'atm')}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Landmark size={18} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-700">ATM {bankName}</span>
                </div>
                {openAccordion === 'atm' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openAccordion === 'atm' && (
                <div className="p-4 pt-0 text-sm text-gray-500 leading-relaxed space-y-2 font-medium bg-white">
                  <ol className="list-decimal ml-4 space-y-2">
                    {instructions.atm.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'mobile' ? null : 'mobile')}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-700">Mobile Banking {bankName}</span>
                </div>
                {openAccordion === 'mobile' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openAccordion === 'mobile' && (
                <div className="p-4 pt-0 text-sm text-gray-500 leading-relaxed space-y-2 font-medium bg-white">
                  <ol className="list-decimal ml-4 space-y-2">
                    {instructions.mobile.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50/50 space-y-4">
          <button
            onClick={() => checkPaymentStatus(true)}
            disabled={timeLeft <= 0 || isVerifying}
            className="btn-kang-primary w-full text-white py-4 rounded-2xl font-extrabold text-sm shadow-lg shadow-sky-100 transition-all disabled:bg-gray-300 flex items-center justify-center gap-2"
          >
            {isVerifying && <Loader2 size={18} className="animate-spin" />}
            {isVerifying ? "Memverifikasi..." : "Saya Sudah Bayar"}
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full bg-white text-gray-500 py-4 rounded-2xl font-bold text-sm hover:text-red-500 transition-all"
          >
            Batalkan Pesanan
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl animate-in zoom-in-95 duration-300 text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
              <AlertTriangle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">Batalkan Pesanan?</h3>
              <p className="text-sm text-gray-500 font-medium">Apakah Anda yakin ingin membatalkan pesanan ini? Data yang sudah diisi akan hilang.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="py-4 rounded-2xl font-bold text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={confirmCancel}
                className="py-4 rounded-2xl font-extrabold text-sm text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-100 transition-colors"
              >
                Ya, Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl animate-in zoom-in-95 duration-300 text-center space-y-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle2 size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">Berhasil Dibatalkan</h3>
              <p className="text-sm text-gray-500 font-medium">Pesanan Anda telah berhasil dibatalkan secara permanen.</p>
            </div>
            <button
              onClick={handleFinalExit}
              className="w-full py-4 rounded-2xl font-extrabold text-sm text-white bg-[#27AAE1] shadow-lg shadow-sky-100 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};