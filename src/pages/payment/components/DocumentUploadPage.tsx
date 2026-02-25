import { useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Upload, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const DocumentUploadPage = () => {
  const { setStep } = useOrderStore();
  const [uploads, setUploads] = useState({
    ktp: false,
    stnk: false,
    bpkb: false
  });

  const handleUpload = (type: keyof typeof uploads) => {
    setUploads(prev => ({ ...prev, [type]: true }));
  };

  const isAllUploaded = uploads.ktp && uploads.stnk && uploads.bpkb;

  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in duration-500">
      <div className="text-left px-4 md:px-0">
        <Breadcrumbs currentPage="Upload Dokumen" />
      </div>

      <div className="max-w-2xl mx-auto py-4 md:py-8 px-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#27AAE1]">
            <Upload size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Upload Dokumen</h1>
          <p className="text-gray-500 text-sm">Silakan unggah foto dokumen asli Anda untuk memproses pesanan</p>
        </div>

        <div className="space-y-4">
          {[
            { id: 'ktp', label: 'Foto KTP Pemilik', desc: 'Pastikan NIK dan Nama terlihat jelas' },
            { id: 'stnk', label: 'Foto STNK Asli', desc: 'Foto lembar depan dan belakang' },
            { id: 'bpkb', label: 'Foto BPKB', desc: 'Halaman identitas kendaraan' }
          ].map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleUpload(doc.id as keyof typeof uploads)}
              className={`group p-6 rounded-[24px] border-2 border-dashed transition-all cursor-pointer flex items-center gap-5 ${uploads[doc.id as keyof typeof uploads]
                  ? 'border-green-200 bg-green-50/30'
                  : 'border-gray-100 bg-white hover:border-[#27AAE1] hover:bg-sky-50/30'
                }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${uploads[doc.id as keyof typeof uploads] ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-sky-100 group-hover:text-[#27AAE1]'
                }`}>
                {uploads[doc.id as keyof typeof uploads] ? <CheckCircle2 size={28} /> : <FileText size={28} />}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-gray-900 leading-tight">{doc.label}</h4>
                <p className="text-[11px] text-gray-400 mt-1">{doc.desc}</p>
              </div>
              {!uploads[doc.id as keyof typeof uploads] && (
                <span className="text-[10px] font-black text-[#27AAE1] bg-sky-50 px-3 py-1.5 rounded-full uppercase tracking-wider">Pilih Foto</span>
              )}
            </div>
          ))}
        </div>

        <button
          disabled={!isAllUploaded}
          onClick={() => {
            setStep(6);
            window.scrollTo(0, 0);
          }}
          className={`w-full py-5 rounded-[24px] font-black text-lg mt-10 transition-all flex items-center justify-center gap-3 ${isAllUploaded
              ? 'btn-kang-primary text-white shadow-lg shadow-sky-100 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          Konfirmasi Dokumen <ArrowRight size={20} />
        </button>

        <p className="text-center text-[11px] text-gray-400 mt-8 px-6 leading-relaxed">
          Keamanan data Anda terjaga. Dokumen hanya digunakan untuk keperluan pengurusan administrasi kendaraan resmi.
        </p>
      </div>
    </div>
  );
};