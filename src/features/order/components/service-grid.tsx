import { useOrderStore } from '../../../store/use-order-store';

const SERVICES = [
  { id: '1', title: 'Mutasi STNK', price: 150000, image: '/services/mutasi.png' },
  { id: '2', title: 'Urus STNK Tahunan', price: 40000, image: '/services/tahunan.png' },
  { id: '3', title: 'Urus STNK 5 Tahun', price: 50000, image: '/services/5tahun.png' },
  { id: '4', title: 'Balik Nama', price: 200000, image: '/services/balik-nama.png' },
  { id: '5', title: 'Blokir Nomor Plat', price: 150000, image: '/services/blokir.png' },
];

export const ServiceGrid = () => {
  const setService = useOrderStore((s) => s.setService);

  return (
    <section className="w-full mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Layanan Kami</h2>
        <button className="text-sm text-gray-500 flex items-center gap-2 border border-gray-200 px-4 py-1.5 rounded-full hover:bg-gray-50">
          <span>❓</span> Bantuan
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {SERVICES.map((item) => (
          <div 
            key={item.id}
            onClick={() => setService(item)} // Sekarang sudah tidak error
            className="bg-white rounded-2xl p-0 overflow-hidden border border-transparent hover:border-jumpapay-blue transition-all cursor-pointer group"
          >
            <img 
              src={item.image} // Pastikan ini juga disesuaikan menjadi .image
              alt={item.title} 
              className="w-full aspect-square object-cover" 
            />
            <div className="p-3">
              <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{item.title}</h3>
              <div className="mt-2 flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Mulai dari</span>
                <span className="font-bold text-jumpapay-blue text-xs md:text-sm">
                  Rp{item.price.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};