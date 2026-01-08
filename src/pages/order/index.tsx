import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { orderSchema, OrderFormData } from './types';
import { OrderServiceInfo } from './components/OrderServiceInfo';
import { OrderRequirements } from './components/OrderRequirements';

export const OrderForm = () => {
  const { selectedService, orderData, setOrderData, nextStep } = useOrderStore();
  
  const { register, handleSubmit, setValue, control, trigger, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...orderData,
      jenisMutasi: orderData.jenisMutasi || 'Lengkap',
    }
  });

  const jenisMutasiValue = useWatch({ control, name: 'jenisMutasi' });

  const onSubmit = (data: OrderFormData) => {
    setOrderData(data);
    nextStep();
  };

  const inputStyles = "w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm focus-visible:ring-0 focus:border-[#27AAE1] outline-none transition-all placeholder:text-gray-400 h-auto";

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8 font-inter text-left animate-in fade-in duration-500">
      <Breadcrumbs currentPage="Detail Order" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-7 items-start">
        <OrderServiceInfo 
          title={selectedService?.title}
          image={selectedService?.image}
          description={selectedService?.description}
        />

        <div className="lg:col-span-5 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-800">Email (Untuk Invoice)</Label>
              <Input {...register('email')} placeholder="Masukan email" className={`${inputStyles} ${errors.email ? 'border-red-500' : ''}`} />
              {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-800">Nomor Whatsapp</Label>
              <div className="flex gap-2">
                <div className="bg-gray-100 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-500 text-sm flex items-center font-bold">+62</div>
                <Input {...register('whatsapp')} placeholder="88212345678" className={`${inputStyles} flex-1 ${errors.whatsapp ? 'border-red-500' : ''}`} />
              </div>
              {errors.whatsapp && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.whatsapp.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-800">Jenis Mutasi</Label>
              <RadioGroup 
                value={jenisMutasiValue} 
                onValueChange={(val: string) => { setValue('jenisMutasi', val); trigger('jenisMutasi'); }} 
                className="flex gap-2"
              >
                {['Lengkap', 'Submit', 'Cabut'].map((val) => (
                  <div key={val} className="flex-1">
                    <RadioGroupItem value={val} id={val} className="sr-only" />
                    <Label
                      htmlFor={val}
                      className={`block py-2.5 text-center rounded-xl border cursor-pointer text-xs font-bold transition-all
                        ${jenisMutasiValue === val ? 'bg-[#E0F4FF] border-[#27AAE1] text-[#27AAE1]' : 'bg-gray-100 border-gray-100 text-gray-400'}
                        ${errors.jenisMutasi ? 'border-red-500' : ''}`}
                    >
                      {val}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.jenisMutasi && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.jenisMutasi.message}</p>}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-800">Kota Cabut Berkas</Label>
                <Select onValueChange={(val: string) => { setValue('kotaCabut', val); trigger('kotaCabut'); }} defaultValue={orderData.kotaCabut}>
                  <SelectTrigger className={`w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 h-auto text-sm focus:ring-0 focus:border-[#27AAE1] outline-none ${errors.kotaCabut ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Pilih kota (Plat B)" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                    <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                  </SelectContent>
                </Select>
                {errors.kotaCabut && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.kotaCabut.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-800">Kota Tujuan Pindah Berkas</Label>
                <Select onValueChange={(val: string) => { setValue('kotaTujuan', val); trigger('kotaTujuan'); }} defaultValue={orderData.kotaTujuan}>
                  <SelectTrigger className={`w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 h-auto text-sm focus:ring-0 focus:border-[#27AAE1] outline-none ${errors.kotaTujuan ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Pilih kota tujuan" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                  </SelectContent>
                </Select>
                {errors.kotaTujuan && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.kotaTujuan.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-800">Nomor Plat Kendaraan</Label>
              <Input {...register('plateNumber')} placeholder="Contoh: B 1111 JMP" className={`${inputStyles} uppercase ${errors.plateNumber ? 'border-red-500' : ''}`} />
              {errors.plateNumber && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.plateNumber.message}</p>}
            </div>

            <OrderRequirements />

            <Button 
              type="submit" 
              className="w-full bg-[#27AAE1] hover:bg-sky-500 text-white py-7 rounded-xl font-extrabold text-base transition-all shadow-sm"
            >
              Order Sekarang
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};