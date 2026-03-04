import { useState, useEffect, useMemo } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Card, CardContent } from "@/components/ui/card";
import { SearchForm } from './components/SearchForm';
import { OrderDetail } from './components/OrderDetail';
import { StatusTimeline } from './components/StatusTimeline';
import { getOrderDetail } from '@/api/order';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

export const TrackingPage = () => {
  const { bookingId: storeBookingId, setBookingId } = useOrderStore();

  const [orderNumber, setOrderNumber] = useState(() => storeBookingId || '');
  const [status, setStatus] = useState<'idle' | 'found' | 'not-found' | 'loading'>('idle');
  const [orderData, setOrderData] = useState<any>(null);

  const [error, setError] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('order_history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const performSearch = async (targetId: string) => {
    setStatus('loading');
    setError(false);

    try {
      const response = await getOrderDetail(targetId);
      if (response.success && response.results) {
        const order = response.results;


        if (order.orderStatusId === 7) {
          toast.info("Order ditemukan, silakan selesaikan pembayaran");
        }

        setOrderData(order);
        setStatus('found');

        if (!history.includes(targetId)) {
          const newHist = [targetId, ...history].slice(0, 5);
          setHistory(newHist);
          localStorage.setItem('order_history', JSON.stringify(newHist));
        }
      } else {
        setStatus('not-found');
      }
    } catch (err) {
      toast.error("Gagal mengambil detail order. Silakan coba lagi.");
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (storeBookingId) {
      performSearch(storeBookingId);
    }
  }, []);

  const handlePayNow = () => {
    if (!orderData) return;

    useOrderStore.getState().setOrderId(orderData.orderId);
    useOrderStore.getState().setBookingId(orderData.bookingId);
    useOrderStore.getState().setOrderData({
      name: orderData.name,
      email: orderData.email,
      phoneNumber: orderData.phoneNumber,
      plateNumber: orderData.plateNumber,
      finalTotal: orderData.finalTotal,
      paymentDetails: orderData.paymentDetails
    });
    useOrderStore.getState().setStep(4);
    useOrderStore.getState().setView('order');
    toast.success("Melanjutkan proses pembayaran...");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNumber = orderNumber.trim();

    if (!targetNumber) {
      setError(true);
      return;
    }

    setBookingId(targetNumber);
    performSearch(targetNumber);
  };

  const currentOrderDisplayData = useMemo(() => {
    if (!orderData) return [];

    return [
      { label: "Nomor Order", val: orderData.bookingId },
      { label: "Tanggal Order", val: orderData.orderDate },
      { label: "Nama Customer", val: orderData.name },
      { label: "Layanan", val: orderData.serviceName },
      { label: "Total Pembayaran", val: orderData.totalAmount }
    ];
  }, [orderData]);

  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in duration-500">
      <div className="text-left">
        <Breadcrumbs currentPage="Cek Order" />
      </div>

      <div className="space-y-2 text-left">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Cek Order</h1>
        <p className="text-sm text-gray-500">Pantau progress orderan kamu dengan mencari nomor order di sini</p>
      </div>

      <Card className="rounded-[32px] border-gray-100 shadow-sm overflow-hidden bg-white text-left">
        <CardContent className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                setOrderNumber('');
                setBookingId('');
                setStatus('idle');
                setOrderData(null);
              }}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
          <SearchForm
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            handleSearch={handleSearch}
            error={error}
            history={history}
          />
        </CardContent>
      </Card>

      {status === 'loading' && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-bold animate-pulse">Sedang mencari order...</p>
        </div>
      )}

      {status === 'found' && orderData && (
        <Card className="rounded-[32px] border-gray-100 shadow-xl shadow-gray-100/50 animate-in slide-in-from-top-4 duration-500 bg-white">
          <CardContent className="p-6 md:p-10 space-y-10 text-left">
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <h3 className="font-bold text-gray-800 text-lg">Detail Order</h3>
              <div className="flex items-center gap-3">
                {orderData.orderStatusId === 7 && (
                  <button
                    onClick={handlePayNow}
                    className="text-xs font-black px-4 py-2 rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95"
                  >
                    Bayar Sekarang
                  </button>
                )}
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider bg-blue-50 text-[#27AAE1]`}>
                  {orderData.status}
                </span>
              </div>
            </div>

            <OrderDetail data={currentOrderDisplayData} orderDate={orderData.createdAt} />

            {orderData.orderStatusId === 8 && orderData.cancelReason && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-red-500 p-2 rounded-lg text-white mt-1">
                  <Search size={20} />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-red-900 text-sm">Informasi Pembatalan</p>
                  <p className="text-red-700 text-xs leading-relaxed font-medium">
                    {orderData.cancelReason}
                  </p>
                </div>
              </div>
            )}

            <div className="py-4">
              <StatusTimeline steps={orderData.steps} />
            </div>
          </CardContent>
        </Card>
      )}

      {status === 'not-found' && (
        <div className="text-center py-12">
          <div className="w-64 h-64 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-200">
            <Search size={96} strokeWidth={1} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mt-4">Nomor Order Tidak Ditemukan</h3>
          <p className="text-gray-400 text-sm">Pastikan nomor order yang kamu masukkan sudah benar.</p>
        </div>
      )}
    </div>
  );
};