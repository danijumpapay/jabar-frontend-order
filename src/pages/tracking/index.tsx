import { useState, useEffect, useMemo } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchForm } from './components/SearchForm';
import { OrderDetail } from './components/OrderDetail';
import { StatusTimeline } from './components/StatusTimeline';

export const TrackingPage = () => {
  const { setView, orderId, setOrderId, setStep } = useOrderStore();

  const [orderNumber, setOrderNumber] = useState(() => orderId || '');
  const [status, setStatus] = useState<'idle' | 'found' | 'not-found'>(() =>
    (orderId === '12345' || orderId === '11111' || orderId === '00000' || orderId === '99999') ? 'found' : 'idle'
  );

  const [error, setError] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('order_history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    if (orderId) {
      if (orderId === '99999') {
        setView('order');
        setStep(5);
      }
      setOrderId(null);
    }
  }, [orderId, setOrderId, setStep, setView]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNumber = orderNumber.trim();

    if (!targetNumber) {
      setError(true);
      return;
    }

    if (targetNumber === '99999') {
      setView('order');
      setStep(5);
      return;
    }

    const validIds = ['12345', '11111', '00000'];

    if (!history.includes(targetNumber) && validIds.includes(targetNumber)) {
      const newHist = [targetNumber, ...history].slice(0, 5);
      setHistory(newHist);
      localStorage.setItem('order_history', JSON.stringify(newHist));
    }

    setError(false);
    setStatus(validIds.includes(targetNumber) ? 'found' : 'not-found');
  };

  const currentOrderData = useMemo(() => {
    const baseData = {
      nama: "Dani Sofyan",
      layanan: orderNumber === '12345' ? "Pajak 1 Tahun" : "Pajak 5 Tahun",
      harga: orderNumber === '12345' ? "Rp346.500" : "Rp400.000",
      tanggal: "11/01/2026"
    };

    return [
      { label: "Nomor Order", val: orderNumber },
      { label: "Tanggal Order", val: baseData.tanggal },
      { label: "Nama", val: baseData.nama },
      { label: "Layanan", val: baseData.layanan },
      { label: "Total Harga", val: baseData.harga }
    ];
  }, [orderNumber]);

  const steps = useMemo(() => {
    if (orderNumber === '11111') {
      return [
        { title: "Verifikasi Dokumen", completed: true },
        { title: "Pengurusan Dokumen", completed: true },
        { title: "Pengantaran Dokumen", completed: true },
        { title: "Selesai", completed: true },
      ];
    }
    if (orderNumber === '00000') {
      return [
        { title: "Pengajuan Pengembalian", completed: true },
        { title: "Verifikasi Admin", completed: false },
        { title: "Proses Refund", completed: false },
        { title: "Selesai", completed: false },
      ];
    }
    return [
      { title: "Verifikasi Dokumen", completed: true },
      { title: "Pengurusan Dokumen", completed: true },
      { title: "Pengantaran Dokumen", completed: false },
      { title: "Selesai", completed: false },
    ];
  }, [orderNumber]);

  const isCompleted = orderNumber === '11111';
  const isRefundStatus = orderNumber === '00000';
  const canRefund = isCompleted;

  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in duration-500">
      <div className="text-left">
        <Breadcrumbs currentPage="Cek Order" />
      </div>

      <div className="space-y-2 text-left">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Cek Order</h1>
        <p className="text-sm text-gray-500">Pantau progress orderan kamu dengan mencari nomor order di sini</p>
      </div>

      <Card className="rounded-[32px] border-gray-100 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-6 md:p-8">
          <SearchForm
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            handleSearch={handleSearch}
            error={error}
            history={history}
          />
        </CardContent>
      </Card>

      {status === 'found' && (
        <Card className="rounded-[32px] border-gray-100 shadow-xl shadow-gray-100/50 animate-in slide-in-from-top-4 duration-500 bg-white">
          <CardContent className="p-6 md:p-10 space-y-10 text-left">
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <h3 className="font-bold text-gray-800 text-lg">Order Detail</h3>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${isCompleted ? 'bg-green-50 text-green-600' :
                  isRefundStatus ? 'bg-orange-50 text-orange-600' :
                    'bg-blue-50 text-[#27AAE1]'
                }`}>
                {isCompleted ? 'Selesai' : isRefundStatus ? 'Refund Diproses' : 'In Progress'}
              </span>
            </div>

            <OrderDetail data={currentOrderData} />

            <div className="py-4">
              <StatusTimeline steps={steps} />
            </div>

            {canRefund && (
              <Button
                onClick={() => setView('refund')}
                variant="outline"
                className="w-full h-14 rounded-full border-2 border-kang-pajak-blue text-kang-pajak-blue font-bold transition-all hover:bg-kang-pajak-blue hover:text-white hover:shadow-md"
              >
                Ajukan Pembatalan / Refund
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {status === 'not-found' && (
        <div className="text-center py-12">
          <img src="/tracking/order-not-found.svg" className="w-64 mx-auto opacity-60" alt="Not Found" />
          <h3 className="text-lg font-bold text-gray-900 mt-4">Nomor Order Tidak Ditemukan</h3>
        </div>
      )}
    </div>
  );
};