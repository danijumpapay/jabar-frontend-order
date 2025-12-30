import { Navbar } from './components/shared/navbar';
import { PromoSlider } from './features/order/components/promo-slider'; 
import { ServiceGrid } from './features/order/components/service-grid';
import { OrderForm } from './features/order/components/order-form';
import { useOrderStore } from './store/use-order-store';

function App() {
  const step = useOrderStore((s) => s.step);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-container mx-auto px-4 md:px-0 pb-20">
        {step === 1 ? (
          <div className="flex flex-col gap-10">
            <PromoSlider />
            <ServiceGrid />
          </div>
        ) : (
          <div className="mt-10">
            <OrderForm />
          </div>
        )}
      </main>

      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50">
        <div className="flex flex-col items-center gap-1 text-jumpapay-blue">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
          <span className="text-xl">🔍</span>
          <span className="text-[10px] font-medium">Cek Order</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
          <span className="text-xl">🎥</span>
          <span className="text-[10px] font-medium">Tutorial</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
          <span className="text-xl">❓</span>
          <span className="text-[10px] font-medium">Bantuan</span>
        </div>
      </div>
    </div>
  );
}

export default App;