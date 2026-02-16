import { useState, useEffect, useCallback } from 'react';
import { Clock, Copy, ChevronDown, ChevronUp, Landmark, Smartphone, Check, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const WaitingPaymentPage = () => {
  const { setStep, orderData, resetOrder } = useOrderStore();
  const [openAccordion, setOpenAccordion] = useState<string | null>('atm');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Metode Pembayaran</p>
                <p className="font-bold text-gray-800">BJB Virtual Account</p>
              </div>
              <img src="/payments/bjb.svg" alt="BJB" className="h-10" />
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 relative group">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Nomor Virtual Account</p>
              <div className="flex justify-between items-center">
                <span className="text-xl md:text-2xl font-black text-gray-900 tracking-widest">8837300012345678</span>
                <div className="relative">
                  {copied && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1.5 px-3 rounded-lg animate-in fade-in zoom-in duration-200 font-bold whitespace-nowrap">
                      Berhasil Disalin!
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                  <button 
                    onClick={() => handleCopy('8837300012345678')}
                    className={`p-3 rounded-xl transition-all shadow-sm border ${
                      copied 
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
                Rp{(orderData?.finalTotal || 0).toLocaleString('id-ID')}
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
                  <span className="text-sm font-bold text-gray-700">ATM BJB</span>
                </div>
                {openAccordion === 'atm' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openAccordion === 'atm' && (
                <div className="p-4 pt-0 text-sm text-gray-500 leading-relaxed space-y-2 font-medium bg-white">
                  <ol className="list-decimal ml-4 space-y-2">
                    <li>Masukkan Kartu ATM dan PIN Anda</li>
                    <li>Pilih menu <span className="text-gray-800 font-bold">Transaksi Lainnya</span></li>
                    <li>Pilih menu <span className="text-gray-800 font-bold">Transfer</span></li>
                    <li>Pilih menu <span className="text-gray-800 font-bold">Ke Rekening BJB Virtual Account</span></li>
                    <li>Masukkan nomor VA diatas</li>
                    <li>Tagihan akan muncul, pilih <span className="text-gray-800 font-bold">Ya/OK</span></li>
                  </ol>
                </div>
              )}
            </div>

            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenAccordion(openAccordion === 'mBJB' ? null : 'mBJB')}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-700">m-BJB (BJB Mobile)</span>
                </div>
                {openAccordion === 'mBJB' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openAccordion === 'mBJB' && (
                <div className="p-4 pt-0 text-sm text-gray-500 leading-relaxed space-y-2 font-medium bg-white">
                  <ol className="list-decimal ml-4 space-y-2">
                    <li>Login ke aplikasi m-BJB</li>
                    <li>Pilih menu <span className="text-gray-800 font-bold">m-Transfer</span></li>
                    <li>Pilih <span className="text-gray-800 font-bold">BJB Virtual Account</span></li>
                    <li>Input nomor VA yang tertera</li>
                    <li>Periksa detail tagihan, lalu klik <span className="text-gray-800 font-bold">Send</span></li>
                    <li>Masukkan PIN m-BJB Anda</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50/50 space-y-4">
          <button 
            onClick={() => setStep(5)}
            disabled={timeLeft <= 0}
            className="btn-akang-primary w-full text-white py-4 rounded-2xl font-extrabold text-sm shadow-lg shadow-sky-100 transition-all disabled:bg-gray-300"
          >
            Saya Sudah Bayar
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