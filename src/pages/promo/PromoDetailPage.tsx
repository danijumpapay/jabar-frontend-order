import { useMemo } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { useOrderStore } from '@/store/useOrderStore';
import { ShieldCheck, Calendar, Tag, AlertCircle } from 'lucide-react';

interface PromoSection {
  title: string;
  icon?: React.ReactNode;
  items: string[];
}

interface PromoContent {
  title: string;
  bannerImg: string;
  badge: string;
  expiry: string;
  sections: PromoSection[];
}

const PROMO_DATA: Record<string, PromoContent> = {
  "planet-ban": {
    title: "Syarat & Ketentuan Promo Planet Ban x JumpaPay",
    bannerImg: "/banners/promo-planet-ban.png",
    badge: "Voucher Rp20.000",
    expiry: "Masa Aktif: 90 Hari setelah order",
    sections: [
      {
        title: "Mekanisme Program",
        icon: <Tag size={18} />,
        items: [
          "Pelanggan berhak mendapatkan Voucher Belanja Planet Ban dengan nilai maksimal Rp20.000.",
          "Voucher hanya akan diberikan setelah pelanggan berhasil menyelesaikan order/transaksi melalui platform atau layanan JumpaPay.",
        ]
      },
      {
        title: "Ketentuan Penggunaan Voucher",
        icon: <ShieldCheck size={18} />,
        items: [
          "Voucher dapat digunakan untuk pembelian ban motor atau produk lainnya di seluruh outlet Planet Ban.",
          "Potongan Harga: Nilai voucher (maksimal Rp20.000) akan langsung memotong total tagihan belanja.",
          "Voucher hanya dapat digunakan untuk 1 (satu) kali transaksi dan tidak dapat digabungkan dengan promo voucher lainnya.",
          "Voucher tidak dapat diuangkan atau ditukar dengan uang tunai."
        ]
      }
    ]
  },
  "jumpapay-special": {
    title: "Syarat & Ketentuan Promo Spesial Pengguna Baru JumpaPay",
    bannerImg: "https://placehold.co/1300x308/2AB0E5/white?text=Promo+JumpaPay",
    badge: "Potongan Rp50.000",
    expiry: "Hingga 31 Des 2026",
    sections: [
      {
        title: "Mekanisme Program",
        icon: <Tag size={18} />,
        items: [
          "Promo khusus untuk transaksi pertama di platform JumpaPay.",
          "Potongan harga otomatis didapatkan saat memilih layanan STNK atau Pajak.",
          "Berlaku untuk semua jenis kendaraan roda dua dan roda empat."
        ]
      },
      {
        title: "Ketentuan Penggunaan",
        icon: <ShieldCheck size={18} />,
        items: [
          "Minimum transaksi untuk mendapatkan potongan adalah Rp200.000.",
          "Promo hanya dapat digunakan 1 kali per nomor WhatsApp/Email.",
          "Tidak dapat digabungkan dengan promo voucher lainnya.",
          "Keputusan JumpaPay mengenai keabsahan transaksi bersifat mutlak."
        ]
      }
    ]
  }
};

export const PromoDetailPage = () => {
  const { setView, selectedPromoId } = useOrderStore();
  
  const content = useMemo((): PromoContent => {
    const id = selectedPromoId || 'planet-ban';
    return PROMO_DATA[id] || PROMO_DATA['planet-ban'];
  }, [selectedPromoId]);

  return (
    <div className="max-w-3xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in duration-500 text-left">
      <div className="px-4 md:px-0">
        <Breadcrumbs currentPage="Detail Promo" onParentClick={() => setView('order')} />
      </div>

      <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden aspect-video md:aspect-21/9 shadow-lg mx-4 md:mx-0">
        <img 
          src={content.bannerImg} 
          alt={content.title} 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
          <span className="text-sky-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Exclusive Promo</span>
          <h1 className="text-white text-2xl md:text-4xl font-black leading-tight">{content.title}</h1>
        </div>
      </div>

      <div className="px-4 md:px-0 space-y-10">
        <div className="flex flex-wrap gap-4">
          <div className="bg-sky-50 px-4 py-2 rounded-full flex items-center gap-2 text-[#27AAE1]">
            <Calendar size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">{content.expiry}</span>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-full flex items-center gap-2 text-green-600">
            <Tag size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">{content.badge}</span>
          </div>
        </div>

        <div className="space-y-10">
          {content.sections.map((section: PromoSection, idx: number) => (
            <section key={idx} className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-[#27AAE1]">
                  {section.icon || <ShieldCheck size={18} />}
                </div>
                <h3 className="font-black text-base uppercase tracking-tight">{idx + 1}. {section.title}</h3>
              </div>
              <ul className="space-y-3 ml-11">
                {section.items.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                    <span className="text-sky-300 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-100 p-6 rounded-[24px] flex gap-4">
          <AlertCircle className="text-amber-500 shrink-0" size={20} />
          <div className="space-y-2">
            <h4 className="font-bold text-amber-900 text-sm">Informasi Tambahan</h4>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Pihak penyelenggara berhak mengubah syarat dan ketentuan sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Jika ditemukan indikasi kecurangan, pemberian voucher atau diskon dapat dibatalkan secara sepihak.
            </p>
          </div>
        </div>

        <div className="pt-4 pb-12">
          <button 
            onClick={() => { setView('order'); window.scrollTo(0, 0); }}
            className="w-full h-14 bg-white border-2 border-[#27AAE1] text-[#27AAE1] hover:bg-[#27AAE1] hover:text-white rounded-full font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
          >
          Tutup
          </button>
        </div>
      </div>
    </div>
  );
};