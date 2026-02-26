import { useEffect } from 'react';
import { Navbar } from './components/shared/Navbar';
import { HomePage } from './pages/home';
import { OrderForm } from './pages/order';
import { PaymentPage } from './pages/payment';
import { WaitingPaymentPage } from './pages/payment/components/WaitingPaymentPage';
import { PaymentSuccessPage } from './pages/payment/components/PaymentSuccessPage.tsx';
import { PromoDetailPage } from './pages/promo/PromoDetailPage.tsx';
import { TrackingPage } from './pages/tracking';
import { RefundPage } from './pages/refund';
import { HelpPage } from './pages/help';
import { TutorialPage } from './pages/tutorial';
import { useOrderStore } from './store/useOrderStore';
import { Home, Search, Video, HelpCircle } from 'lucide-react';
import { Toaster } from 'sonner';

function App() {
  const { step, view, setView, setStep, setOrderId, orderData, selectedService } = useOrderStore();

  useEffect(() => {
    const isStep2Invalid = step === 2 && !selectedService;
    const isStep3Invalid = step >= 3 && (
      !selectedService ||
      !orderData.name?.trim() ||
      !orderData.email?.trim() ||
      !orderData.whatsapp?.trim() ||
      !orderData.nik?.trim() ||
      !orderData.plateNumber?.trim() ||
      !orderData.apiVehicleData
    );

    if (view === 'order') {
      if (isStep2Invalid) {
        setStep(1);
      } else if (isStep3Invalid) {
        setStep(2);
      }
    }
  }, [step, selectedService, orderData, setStep, view]);

  const isFormDataIncomplete = (
    !selectedService ||
    !orderData.name?.trim() ||
    !orderData.email?.trim() ||
    !orderData.whatsapp?.trim() ||
    !orderData.nik?.trim() ||
    !orderData.plateNumber?.trim() ||
    !orderData.apiVehicleData
  );

  const renderContent = () => {
    if (view === 'promo-detail') return <PromoDetailPage />;
    if (view === 'tracking') return <TrackingPage />;
    if (view === 'refund') return <RefundPage />;
    if (view === 'bantuan') return <HelpPage />;
    if (view === 'tutorial') return <TutorialPage />;

    if (view === 'order') {
      if (step === 2 && !selectedService) return <HomePage />;
      if (step >= 3 && isFormDataIncomplete) return <OrderForm />;
    }

    switch (step) {
      case 1: return <HomePage />;
      case 2: return <OrderForm />;
      case 3: return <PaymentPage />;
      case 4: return <WaitingPaymentPage />;
      case 5: return <PaymentSuccessPage />;
      default: return <HomePage />;
    }
  };

  const handleNavClick = (targetView: 'order' | 'tracking' | 'refund' | 'bantuan' | 'tutorial', targetStep?: number) => {
    setOrderId(null);
    setView(targetView);
    if (targetStep) setStep(targetStep);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Toaster position="top-center" richColors />
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-10 lg:px-16">
        {renderContent()}
      </main>

      <footer className="w-full py-10 pb-40 md:pb-12 border-t border-gray-50 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="order-2 md:order-1">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium">
              © {new Date().getFullYear()} Kang Pajak. All Rights Reserved.
            </p>
          </div>

          <div className="order-1 md:order-2 flex items-center gap-3 bg-gray-50/50 px-4 py-2 rounded-2xl border border-gray-50">
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap mt-4">
              Mitra Resmi
            </p>
            <div className="h-4 w-px bg-gray-200 hidden md:block mt-4"></div>
            <img
              src="/logo-bapenda-jabar.png"
              alt="Bapenda Jabar"
              className="h-8 md:h-8 w-auto grayscale-0 opacity-100 transition-all duration-500 object-contain mt-5"
            />
            <img
              src="/payments/bjb.svg"
              alt="Bank BJB"
              className="h-8 md:h-8 w-auto grayscale-0 opacity-100 transition-all duration-500 object-contain"
            />
          </div>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50">
        <button
          onClick={() => handleNavClick('order', 1)}
          className={`flex flex-col items-center gap-1 ${view === 'order' ? 'text-[#27AAE1]' : 'text-gray-400'}`}
        >
          <Home size={22} strokeWidth={view === 'order' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Home</span>
        </button>

        <button
          onClick={() => handleNavClick('tracking')}
          className={`flex flex-col items-center gap-1 ${view === 'tracking' || view === 'refund' ? 'text-[#27AAE1]' : 'text-gray-400'}`}
        >
          <Search size={22} strokeWidth={view === 'tracking' || view === 'refund' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Cek Order</span>
        </button>

        <button
          onClick={() => handleNavClick('tutorial')}
          className={`flex flex-col items-center gap-1 ${view === 'tutorial' ? 'text-[#27AAE1]' : 'text-gray-400'}`}
        >
          <Video size={22} strokeWidth={view === 'tutorial' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Tutorial</span>
        </button>

        <button
          onClick={() => handleNavClick('bantuan')}
          className={`flex flex-col items-center gap-1 ${view === 'bantuan' ? 'text-[#27AAE1]' : 'text-gray-400'}`}
        >
          <HelpCircle size={22} strokeWidth={view === 'bantuan' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Bantuan</span>
        </button>
      </div>
    </div>
  );
}

export default App;