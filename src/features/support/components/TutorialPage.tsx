import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useOrderStore } from '../../../store/useOrderStore';

const whatsappSteps = [
  { id: 1, title: "Chat ke Nomor JP", desc: "Chat ke nomor WhatsApp JumpaPay dan memberitahu nama, lalu klik menu \"Pilih Layanan\".", phoneImage: "/tutorial/mutasi/phone-step-1.png" },
  { id: 2, title: "Pilih Layanan", desc: "Pilih \"Mutasi Cabut Berkas\".", phoneImage: "/tutorial/mutasi/phone-step-2.png" },
  { id: 3, title: "Pilih Isi Data", desc: "Klik menu \"Isi Data\".", phoneImage: "/tutorial/mutasi/phone-step-3.png" },
  { id: 4, title: "Lengkapi Formulir", desc: "Isi formulir yang diminta pada form Mutasi Cabut Berkas. Pilih Selesai jika sudah.", phoneImage: "/tutorial/mutasi/phone-step-4.png" },
  { id: 5, title: "Quotation Diberikan", desc: "BOT Whatsapp akan memberikan Quotation total biaya yang perlu dibayarkan oleh user.", phoneImage: "/tutorial/mutasi/phone-step-5.png" },
  { id: 7, title: "Pilih Metode Pembayaran", desc: "Pilih metode pembayaran, misalnya: QRIS. Lalu akan muncul gambar QRIS.", phoneImage: "/tutorial/mutasi/phone-step-7.png" },
  { id: 8, title: "Invoice Dikirim", desc: "Invoice akan dikirimkan setelah pembayaran berhasil.", phoneImage: "/tutorial/mutasi/phone-step-8.png" },
  { id: 9, title: "Unggah Dokumen", desc: "Selanjutnya akan diminta untuk Unggah KTP Pemilik Baru, BPKB, dan STNK. Pilih Selesai jika sudah.", phoneImage: "/tutorial/mutasi/phone-step-9.png" },
  { id: 10, title: "Isi Alamat Lengkap", desc: "Lalu, akan diminta memasukkan alamat lengkap lokasi pengambilan.", phoneImage: "/tutorial/mutasi/phone-step-10.png" },
  { id: 11, title: "Share Lokasi", desc: "Nanti akan diminta untuk share lokasi tempat penjemputan dokumen dan diconfirm via WA oleh CS.", phoneImage: "/tutorial/mutasi/phone-step-11.png" },
  { id: 12, title: "Jemput Dokumen", desc: "Kemudian, dokumen akan dijemput dan diproses oleh JumpaPay pada H+1 hari kerja setelah order.", phoneImage: "/tutorial/mutasi/phone-step-12.png" },
  { id: 13, title: "Cek Status Order", desc: "Kode order akan dikirimkan lalu status order dapat dilihat dengan mengetik kode order.", phoneImage: "/tutorial/mutasi/phone-step-13.png" }
];

const categories = ["STNK Tahunan", "STNK 5 Tahunan", "Mutasi (Cabut Berkas)", "Mutasi (Submit Berkas)", "Mutasi Lengkap", "Balik Nama", "Blokir Plat"];

export const TutorialPage = () => {
  const { setView } = useOrderStore();
  const [activeTab, setActiveTab] = useState<'website' | 'whatsapp'>('whatsapp');
  const [activeCategory, setActiveCategory] = useState("Mutasi (Cabut Berkas)");
  const [activeStepId, setActiveStepId] = useState(1);

  const currentStep = whatsappSteps.find(s => s.id === activeStepId) || whatsappSteps[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-8 font-inter">
      <div className="flex items-center gap-2 text-xs font-medium mb-2">
        <button onClick={() => setView('order')} className="text-gray-400 hover:text-jumpapay-blue transition-colors cursor-pointer">Order</button>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-gray-800">Tutorial Order</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Tutorial Order</h1>
        <p className="text-sm text-gray-500 max-w-2xl">Ikuti panduan langkah demi langkah untuk melakukan order layanan di JumpaPay dengan benar.</p>
      </div>

      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('website')}
          className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'website' ? 'text-jumpapay-blue' : 'text-gray-400'}`}
        >
          Tutorial Order Website
          {activeTab === 'website' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jumpapay-blue" />}
        </button>
        <button 
          onClick={() => setActiveTab('whatsapp')}
          className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'whatsapp' ? 'text-jumpapay-blue' : 'text-gray-400'}`}
        >
          Tutorial Order Whatsapp
          {activeTab === 'whatsapp' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jumpapay-blue" />}
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat 
              ? 'bg-[#E0F4FF] border-jumpapay-blue text-jumpapay-blue' 
              : 'bg-[#F8F9FA] border-gray-100 text-gray-400 hover:border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex justify-center lg:justify-start">
          <div 
            style={{ width: '479px', height: '576px', borderRadius: '48px' }}
            className="relative overflow-hidden bg-white shadow-sm border border-sky-50 flex items-end justify-center"
          >
            <img 
              src="/tutorial/bg-tutorial.png" 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <img 
              key={currentStep.id}
              src={currentStep.phoneImage} 
              alt={currentStep.title} 
              className="relative z-10 w-85 h-auto transition-all duration-500 animate-in fade-in zoom-in-95 translate-y-20 md:translate-y-30"
            />
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {whatsappSteps.map((step) => (
            <div 
              key={step.id} 
              onClick={() => setActiveStepId(step.id)}
              className={`cursor-pointer border rounded-2xl md:rounded-4xl p-4 md:p-6 space-y-3 md:space-y-4 transition-all duration-300 min-h-45 md:min-h-55 flex flex-col justify-start ${
                activeStepId === step.id 
                ? 'bg-[#E0F4FF] border-jumpapay-blue shadow-sm' 
                : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
              }`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shrink-0 transition-colors ${
                activeStepId === step.id ? 'bg-jumpapay-blue text-white' : 'bg-[#E0F4FF] text-jumpapay-blue'
              }`}>
                {step.id}
              </div>
              <div className="space-y-1 md:space-y-2">
                <h3 className="font-bold text-gray-900 text-sm md:text-[16px] leading-tight">{step.title}</h3>
                <p className="text-[11px] md:text-[13px] text-gray-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};