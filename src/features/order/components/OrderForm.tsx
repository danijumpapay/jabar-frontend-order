import { useState } from 'react';
import { useOrderStore } from '../../../store/useOrderStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronDown, ChevronUp } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Email tidak valid'),
  whatsapp: z.string().min(10, 'Nomor WhatsApp minimal 10 digit').regex(/^[0-9]+$/, 'Hanya boleh angka'),
  jenisMutasi: z.string().min(1, 'Pilih jenis mutasi'),
  jenisKendaraan: z.string().min(1, 'Pilih jenis kendaraan'),
  isDataMatch: z.string().min(1, 'Pilih salah satu'),
  kotaCabut: z.string().min(1, 'Pilih kota cabut berkas'),
  kotaTujuan: z.string().min(1, 'Pilih kota tujuan pindah'),
  plateNumber: z.string()
    .min(4, 'Nomor plat minimal 4 karakter')
    .max(12, 'Nomor plat maksimal 12 karakter')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Format plat tidak valid'),
});

type FormData = z.infer<typeof schema>;

export const OrderForm = () => {
  const { selectedService, orderData, setOrderData, nextStep, resetOrder } = useOrderStore();
  const [showFullDetail, setShowFullDetail] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...orderData,
      jenisMutasi: 'Lengkap',
      jenisKendaraan: 'Mobil',
      isDataMatch: 'Ya'
    }
  });

  const onSubmit = (data: FormData) => {
    setOrderData(data);
    nextStep();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-7xl mx-auto py-6 font-inter">
      <div className="w-full lg:w-163.25">
        <div className="flex items-center gap-2 text-xs mb-4 font-medium">
          <button 
            onClick={() => resetOrder()} 
            className="text-gray-400 hover:text-jumpapay-blue transition-colors cursor-pointer"
          >
            Order
          </button>
          <span className="text-gray-300">{'>'}</span>
          <span className="text-gray-800">Detail Order</span>
        </div>

        <div className="w-full flex justify-center lg:justify-start">
          <div className="overflow-hidden mb-8 shadow-sm bg-gray-100 w-95 h-63.25 rounded-2xl lg:w-163.25 lg:h-104.25 lg:rounded-3xl">
            <img 
              src={selectedService?.image || '/services/mutasi.png'} 
              alt={selectedService?.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
          {selectedService?.title || 'Mutasi STNK'}
        </h1>

        <div className="bg-[#F8F9FA] p-8 rounded-4xl border border-gray-100/50">
          <h3 className="font-bold text-gray-800 mb-3">Deskripsi:</h3>
          <div className={`text-gray-600 leading-relaxed text-sm transition-all duration-300 ${showFullDetail ? '' : 'line-clamp-3'}`}>
            {selectedService?.description || 
              `Apakah kamu ingin pindah kota dan perlu untuk mutasi STNK agar kendaraan kamu juga bisa ganti nomor sesuai kotamu? Jumpapay untuk bantu kamu urus proses Mutasi STNK. Kamu nggak perlu lagi bolak-balik cuma untuk urus administrasi berkas. Karena dengan layanan ini semua kebutuhan bisa selesai dari rumah aja.`}
          </div>
          
          <button 
            type="button"
            onClick={() => setShowFullDetail(!showFullDetail)}
            className="mt-4 flex items-center gap-2 text-jumpapay-blue font-bold text-sm hover:opacity-80"
          >
            {showFullDetail ? 'Tutup Detail' : 'Lihat Detail'} 
            {showFullDetail ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      <div className="flex-1 w-full lg:max-w-120">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Email (Untuk Pengiriman Invoice)</label>
            <input
              {...register('email')}
              className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-sm ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-jumpapay-blue'}`}
              placeholder="Ketik email kamu di sini. Contoh: jumpapay@mail.com"
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Nomor Whatsapp</label>
            <div className="flex gap-2">
              <div className="bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-400 text-sm flex items-center font-bold">+62</div>
              <input
                {...register('whatsapp')}
                className={`flex-1 px-4 py-3.5 rounded-xl border outline-none transition-all text-sm ${errors.whatsapp ? 'border-red-500' : 'border-gray-200 focus:border-jumpapay-blue'}`}
                placeholder="Awali dengan angka 8. Contoh: 88212345678."
              />
            </div>
            {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.whatsapp.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 text-[13px]">Jenis Mutasi</label>
            <div className="flex gap-3">
              {['Lengkap', 'Submit', 'Cabut'].map((val) => (
                <label key={val} className="flex-1 cursor-pointer">
                  <input type="radio" {...register('jenisMutasi')} value={val} className="hidden peer" />
                  <div className="py-2 text-center rounded-full border border-gray-100 bg-[#F3F4F6] text-gray-400 text-[13px] font-medium peer-checked:bg-[#E0F4FF] peer-checked:border-jumpapay-blue peer-checked:text-jumpapay-blue">
                    {val}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Kota Cabut Berkas</label>
              <div className="relative">
                <select {...register('kotaCabut')} className={`w-full px-4 py-3.5 rounded-xl border appearance-none bg-white text-sm ${errors.kotaCabut ? 'border-red-500' : 'border-gray-200 text-gray-400'}`}>
                  <option value="">Pilih kota cabut berkas. Hanya melayani kendaraan Plat B.</option>
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
              {errors.kotaCabut && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.kotaCabut.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Kota Tujuan Pindah Berkas</label>
              <div className="relative">
                <select {...register('kotaTujuan')} className={`w-full px-4 py-3.5 rounded-xl border appearance-none bg-white text-sm ${errors.kotaTujuan ? 'border-red-500' : 'border-gray-200 text-gray-400'}`}>
                  <option value="">Pilih kota tujuan pindah berkas.</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Surabaya">Surabaya</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
              {errors.kotaTujuan && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.kotaTujuan.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Nomor Plat Kendaraan</label>
            <input
              {...register('plateNumber')}
              className={`w-full px-4 py-3.5 rounded-xl border outline-none text-sm ${errors.plateNumber ? 'border-red-500' : 'border-gray-200 focus:border-jumpapay-blue'}`}
              placeholder="Ketik nomor plat kendaraan kamu di sini. Contoh: B 1234 BCA"
            />
            {errors.plateNumber && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.plateNumber.message}</p>}
          </div>

          <div className="bg-[#F8F9FA] p-8 rounded-4xl border border-gray-50/50">
            <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-3">
              Dokumen yang Harus Disiapkan
            </h4>
            
            <p className="text-[14px] text-[#4A4A4A] mb-2 font-normal">
              Mohon persiapkan dokumen berikut ini :
            </p>
            
            <ul className="text-[14px] text-[#4A4A4A] space-y-1 list-disc ml-5 leading-snug">
              <li className="pl-1">
                <span className="text-[#1A1A1A]">FC KTP Pemilik Kendaraan Baru</span>
              </li>
              <li className="pl-1">
                <span className="text-[#1A1A1A]">STNK Asli Kendaraan</span>
              </li>
              <li className="pl-1">
                <span className="text-[#1A1A1A]">BPKB Asli Kendaraan</span>
              </li>
              <li className="pl-1">
                <span className="text-[#1A1A1A]">Cek Fisik (Kendaraan harus ada ditempat pengambilan dokumen)</span>
              </li>
            </ul>
          </div>

          <button 
            type="submit" 
            className="w-full bg-jumpapay-blue text-white py-4 rounded-xl font-extrabold text-base hover:bg-sky-500 transition-all shadow-sm"
          >
            Order Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};