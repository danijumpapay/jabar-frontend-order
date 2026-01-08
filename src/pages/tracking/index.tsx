import { useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchForm } from './components/SearchForm';
import { OrderDetail } from './components/OrderDetail';
import { StatusTimeline } from './components/StatusTimeline';


export const TrackingPage = () => {
  const { setView } = useOrderStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'found' | 'not-found'>('idle');
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('order_history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return setError(true);
    if (!history.includes(orderNumber)) {
      const newHist = [orderNumber, ...history].slice(0, 5);
      setHistory(newHist);
      localStorage.setItem('order_history', JSON.stringify(newHist));
    }
    setError(false);
    setStatus(orderNumber === '12345' ? 'found' : 'not-found');
  };

  const orderData = [
    { label: "Nomor Order", val: "12345" },
    { label: "Tanggal Order", val: "11/01/2025" },
    { label: "Nama", val: "Rayhan Alfaruq" },
    { label: "Layanan", val: "Pajak 1 Tahun" },
    { label: "Total Harga", val: "Rp240.000" }
  ];

  const steps = [
    { title: "Verifikasi Dokumen", completed: true },
    { title: "Pengambilan Dokumen", completed: true },
    { title: "Pengurusan Dokumen", completed: false },
    { title: "Pengembalian Dokumen", completed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in">
      <Breadcrumbs currentPage="Cek Order" />
      
      <div className="space-y-2 text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Cek Order</h1>
        <p className="text-sm text-gray-500">Pantau progress orderan kamu dengan mencari nomor order di sini</p>
      </div>

      <Card className="rounded-3xl border-gray-100 shadow-sm"><CardContent className="p-6 md:p-8">
        <SearchForm orderNumber={orderNumber} setOrderNumber={setOrderNumber} handleSearch={handleSearch} error={error} history={history} />
      </CardContent></Card>

      {status === 'found' && (
        <Card className="rounded-[32px] border-gray-100 shadow-xl animate-in slide-in-from-top-4"><CardContent className="p-6 md:p-10 space-y-8">
          <h3 className="font-bold text-gray-800 border-b border-gray-50 pb-4 text-left">Order Detail</h3>
          <OrderDetail data={orderData} />
          <StatusTimeline steps={steps} />
          <Button onClick={() => setView('refund')} variant="outline" className="w-full h-14 rounded-full border-2 border-jumpapay-blue text-jumpapay-blue font-bold transition-all hover:bg-jumpapay-blue hover:text-white hover:shadow-md">
            Ajukan Refund
          </Button>
        </CardContent></Card>
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