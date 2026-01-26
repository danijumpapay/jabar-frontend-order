import { Navbar } from './components/shared/Navbar';
import { HomePage } from './pages/home';
import { OrderForm } from './pages/order';
import { PaymentPage } from './pages/payment';
import { WaitingPaymentPage } from './pages/payment/components/WaitingPaymentPage';
import { PaymentSuccessPage } from './pages/payment/components/PaymentSuccessPage.tsx';
import { DocumentUploadPage } from './pages/payment/components/DocumentUploadPage.tsx';
import { PromoDetailPage } from './pages/promo/PromoDetailPage.tsx';
import { TrackingPage } from './pages/tracking';
import { RefundPage } from './pages/refund';
import { HelpPage } from './pages/help';
import { TutorialPage } from './pages/tutorial';
import { useOrderStore } from './store/useOrderStore';
import { Home, Search, Video, HelpCircle } from 'lucide-react';

function App() {
  const { step, view, setView, setStep, setOrderId } = useOrderStore(); 

  const renderContent = () => {
    if (view === 'promo-detail') return <PromoDetailPage />;
    if (view === 'tracking') return <TrackingPage />;
    if (view === 'refund') return <RefundPage />;
    if (view === 'bantuan') return <HelpPage />;
    if (view === 'tutorial') return <TutorialPage />;

    switch (step) {
      case 1: return <HomePage />;
      case 2: return <OrderForm />;
      case 3: return <PaymentPage />;
      case 4: return <WaitingPaymentPage />;
      case 5: return <DocumentUploadPage />;
      case 6: return <PaymentSuccessPage />;
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
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 pb-32">
        {renderContent()}
      </main>

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