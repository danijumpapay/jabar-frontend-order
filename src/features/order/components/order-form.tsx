import { useOrderStore } from '../../../store/use-order-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Email tidak valid'),
  whatsapp: z.string().min(10, 'Nomor WhatsApp minimal 10 digit'),
  plateNumber: z.string().min(4, 'Nomor plat tidak valid').max(10),
});

type FormData = z.infer<typeof schema>;

export const OrderForm = () => {
  const { orderData, setOrderData, nextStep, prevStep } = useOrderStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: orderData
  });

  const onSubmit = (data: FormData) => {
    setOrderData(data);
    nextStep();
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Detail Pemesan</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Input Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jumpapay-blue focus:ring-1 focus:ring-jumpapay-blue outline-none transition-all"
            placeholder="contoh@mail.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Input WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
          <input
            {...register('whatsapp')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jumpapay-blue focus:ring-1 focus:ring-jumpapay-blue outline-none transition-all"
            placeholder="0812xxxx"
          />
          {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
        </div>

        {/* Input Plat Nomor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Plat Kendaraan</label>
          <input
            {...register('plateNumber')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jumpapay-blue focus:ring-1 focus:ring-jumpapay-blue outline-none transition-all uppercase"
            placeholder="B 1234 ABC"
          />
          {errors.plateNumber && <p className="text-red-500 text-xs mt-1">{errors.plateNumber.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-jumpapay-blue text-white py-4 rounded-full font-bold text-lg hover:bg-sky-500 transition-colors mt-6 shadow-lg shadow-sky-200"
        >
          Lanjut ke Pembayaran
        </button>

        <button
            type="button"
            onClick={() => prevStep()}
            className="w-full bg-transparent text-gray-400 py-2 rounded-full font-medium hover:text-gray-600 transition-colors"
          >
            Kembali Pilih Layanan
          </button>
      </form>
    </div>
  );
};