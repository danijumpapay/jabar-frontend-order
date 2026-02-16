import { useState } from 'react';
import { Clock, Building2, FileText, AlertCircle, X } from 'lucide-react';
import { OrderInfo } from '../types';

interface OrderDetailProps {
  data: OrderInfo[];
}

export const OrderDetail = ({ data }: OrderDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-left border-b border-gray-50 pb-4">
        {data.map((item, i) => (
          <div key={i} className="space-y-1 font-inter">
            <p className="text-xs text-gray-400 font-medium">{item.label}</p>
            <p className="text-sm font-bold text-gray-900">{item.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 space-y-4 border border-gray-100/50 text-left">
        <p className="text-sm font-bold text-gray-800">Akang Pajak akan membantu pengurusan dokumenmu</p>
        
        {/* <p className="text-xs text-gray-600">Untuk proses tahunan an. Pribadi, berikut dokumen yang akan kami ambil :</p>
        <ul className="text-xs text-gray-600 space-y-2 list-disc ml-4">
          <li>Asli STNK lengkap bolak balik</li>
          <li>Asli eKTP</li>
        </ul>

        <div className="pt-2 flex flex-col gap-3">
          <p className="text-xs text-gray-600">Untuk proses tahunan an. PT, klik tombol di bawah untuk melihat detail dokumen :</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-white border border-akang-pajak-blue text-akang-pajak-blue px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-sm w-fit"
          >
            <Building2 size={14} />
            LIHAT SYARAT DOKUMEN PT
          </button>
        </div> */}

          <div className="flex items-center gap-2 text-gray-800 mb-1">
            <Clock className="text-akang-pajak-blue w-[50px] h-[50px] md:w-5 md:h-5" />
            <p className="text-sm">Dokumen milikmu akan diantarkan pada: <span className="text-green-600 font-bold ml-1">1 Februari 2026 | 08.00 - 20.00</span></p>
          </div>
          <div className="flex items-center gap-2 text-gray-800 mb-1">
            <p className="text-xs text-gray-600">Ada kendala atau pertanyaan tentang dokumen? </p>
            <a href="https://wa.me/6281110139532" target="_blank" rel="noreferrer" className="text-xs text-akang-pajak-blue font-bold hover:underline">
              Hubungi CS Akang Pajak di Whatsapp dengan klik di sini.
            </a>
          </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-99 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3 text-gray-900">
                <Building2 className="text-akang-pajak-blue" size={24} />
                <h3 className="font-bold text-lg">Syarat Dokumen Tahunan PT</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-left">
              <p className="text-sm font-bold text-gray-800 border-l-4 border-akang-pajak-blue pl-3">
                Untuk proses tahunan an. PT, berikut dokumen yang akan kami ambil :
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">(1.) ASLI</p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc ml-5 font-medium">
                    <li>Asli STNK lengkap 2 lembar bolak balik</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">(2.) FOTO COPY</p>
                  <ul className="text-sm text-gray-700 space-y-1.5 ml-1 font-medium">
                    <li>• Foto copy BPKB</li>
                    <li>• Foto copy NPWP PT</li>
                    <li>• Foto copy SIUP PT</li>
                    <li>• Foto copy NIB Berbasis Risiko PT terbaru</li>
                    <li>• Foto copy Izin Lokasi PT</li>
                    <li>• Foto copy eKTP penanggung jawab PT, yang menandatanganin Surat Kuasa</li>
                  </ul>
                  <p className="mt-3 text-[11px] bg-amber-50 text-amber-700 p-2 rounded border border-amber-100 font-bold">
                    Semua dokumen foto copy wajib di stempel basah PT
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-600 font-bold flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-500" />
                    SEMUA DOKUMEN WAJIB TERBARU & ALAMAT DI SEMUA DOKUMEN WAJIB SAMA
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">(3.) SURAT KUASA</p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc ml-5 font-medium">
                    <li>Asli Surat Kuasa di atas kertas KOP PT, tanda tangan penanggung jawab PT, bermaterai dan berstempel basah PT</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-blue-900 mb-1">
                      <FileText size={16} />
                      <p className="text-xs font-black uppercase">NOTE UNTUK SURAT KUASA (WAJIB DIPERHATIKAN)</p>
                    </div>
                    <p className="text-[11px] text-blue-800 font-semibold italic">Sering ditolak karena surat kuasa, mohon pastikan:</p>
                    <ul className="space-y-1 text-[12px] text-blue-700 font-medium">
                      <li className="flex gap-2"><span>-</span> <span>Wajib pakai kop surat</span></li>
                      <li className="flex gap-2"><span>-</span> <span>Ada alamat jelas wajib sama sesuai NIB</span></li>
                      <li className="flex gap-2"><span>-</span> <span>Ada no telp (bukan no wa)</span></li>
                      <li className="flex gap-2"><span>-</span> <span>Bermaterai</span></li>
                      <li className="flex gap-2"><span>-</span> <span>Tanda tangan asli penanggung jawab PT</span></li>
                      <li className="flex gap-2"><span>-</span> <span>Stempel basah PT asli</span></li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">(4.) PRINT OUT EKTP AGENT Akang Pajak</p>
                  <ul className="text-sm text-gray-700 space-y-1 font-medium">
                    <li className="flex gap-2">• <span>Print out eKTP agent Akang Pajak yang distempel basah PT</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-akang-pajak-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};