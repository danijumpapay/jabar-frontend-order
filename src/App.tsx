import { Navbar } from './components/shared/Navbar';
import { OrderForm, PaymentPage, PromoSlider, ServiceGrid } from './features/order/components';
import { TrackingPage } from './features/tracking/components/TrackingPage';
import { RefundPage } from './features/tracking/components/RefundPage';
import { useOrderStore } from './store/useOrderStore';
import { Home, Search, Video, HelpCircle } from 'lucide-react';
import { HelpPage } from './features/support/components/HelpPage';
import { TutorialPage } from './features/support/components/TutorialPage';

function App() {
  const { step, view, setView, resetOrder } = useOrderStore(); 

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 pb-32">
        {view === 'tracking' ? (
          <TrackingPage />
        ) : view === 'refund' ? (
          <RefundPage />
        ) : view === 'bantuan' ? (
          <HelpPage />
        ) : view === 'tutorial' ? (
          <TutorialPage />
        ) : (
          <div className="animate-in fade-in duration-500">
            {step === 1 ? (
              <div className="flex flex-col gap-6 md:gap-12 mt-4 md:mt-8">
                <PromoSlider />
                <ServiceGrid />
              </div>
            ) : step === 2 ? (
              <div className="w-full">
                <OrderForm />
              </div>
            ) : (
              <div className="w-full">
                <PaymentPage />
              </div>
            )}
          </div>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50">
        <button
          onClick={() => resetOrder()}
          className={`flex flex-col items-center gap-1 ${view === 'order' && step === 1 ? 'text-jumpapay-blue' : 'text-gray-400'}`}
        >
          <Home size={22} strokeWidth={view === 'order' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Home</span>
        </button>

        <button 
          onClick={() => setView('tracking')}
          className={`flex flex-col items-center gap-1 ${view === 'tracking' || view === 'refund' ? 'text-jumpapay-blue' : 'text-gray-400'}`}
        >
          <Search size={22} strokeWidth={view === 'tracking' || view === 'refund' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Cek Order</span>
        </button>

        <button 
          onClick={() => setView('tutorial')}
          className={`flex flex-col items-center gap-1 ${view === 'tutorial' ? 'text-jumpapay-blue' : 'text-gray-400'}`}
        >
          <Video size={22} strokeWidth={view === 'tutorial' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Tutorial</span>
        </button>

        <button 
          onClick={() => setView('bantuan')}
          className={`flex flex-col items-center gap-1 ${view === 'bantuan' ? 'text-jumpapay-blue' : 'text-gray-400'}`}
        >
          <HelpCircle size={22} strokeWidth={view === 'bantuan' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold font-inter">Bantuan</span>
        </button>
      </div>
    </div>
  );
}

export default App;