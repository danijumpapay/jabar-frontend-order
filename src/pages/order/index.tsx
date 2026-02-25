import { useForm, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { OrderServiceInfo } from './components/OrderServiceInfo';
import servicesConfig from './data/services-config.json';
import { orderSchema, OrderFormData } from './types';
import { checkVehicleTax } from '@/api/vehicle';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

interface FormField {
  id: keyof OrderFormData;
  label: string;
  info?: string;
  type: string;
  required: boolean;
  options?: string[];
}

export const OrderForm = () => {
  const { selectedService, orderData, setOrderData, nextStep } = useOrderStore();

  const config = servicesConfig.services.find(s => s.id === selectedService?.id);
  const allFields: FormField[] = [
    ...(servicesConfig.defaultFields as unknown as FormField[]),
    ...(config?.extraFields as unknown as FormField[] || [])
  ];

  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: orderData
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    try {
      const cleanPlate = data.plateNumber.replace(/\s/g, '');
      const response = await checkVehicleTax(cleanPlate);

      if (response.success && response.data) {
        const apiNik = response.data.NO_KTP;
        if (apiNik !== data.nik) {
          Swal.fire({
            icon: 'error',
            title: 'Data Tidak Sesuai',
            text: 'NIK tidak cocok dengan data kendaraan.',
            confirmButtonColor: '#27AAE1',
            confirmButtonText: 'Cek Lagi'
          });
          setIsLoading(false);
          return;
        }

        if (response.data.NO_RANGKA !== data.no_rangka.toUpperCase()) {
          Swal.fire({
            icon: 'error',
            title: 'Data Tidak Sesuai',
            text: 'Nomor rangka tidak cocok dengan data kendaraan.',
            confirmButtonColor: '#27AAE1',
            confirmButtonText: 'Cek Lagi'
          });
          setIsLoading(false);
          return;
        }

        setOrderData({
          ...data,
          apiVehicleData: response.data
        });
        nextStep();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Data kendaraan tidak ditemukan atau terjadi kesalahan.',
          confirmButtonColor: '#27AAE1'
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengecek data kendaraan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = "w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm focus-visible:ring-0 focus:border-[#27AAE1] outline-none transition-all h-auto";

  return (
    <TooltipProvider delayDuration={200}>
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

              {allFields.map((field) => {
                const fieldId = field.id as keyof OrderFormData;
                const error = errors[fieldId] as FieldError | undefined;

                return (
                  <div key={String(fieldId)} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-bold text-gray-800">{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                      {field.info && (
                        <Tooltip>
                          <TooltipTrigger asChild type="button">
                            <Info size={14} className="text-gray-400 cursor-help hover:text-[#27AAE1] transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-gray-800 text-white border-none rounded-lg text-xs p-2 shadow-lg z-50">
                            <p>{field.info}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    {fieldId === 'whatsapp' ? (
                      <div className="flex gap-2">
                        <div className="bg-gray-100 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-500 text-sm flex items-center font-bold">+62</div>
                        <Input
                          {...register('whatsapp')}
                          className={`${inputStyles} flex-1 ${error ? 'border-red-500' : ''}`}
                        />
                      </div>
                    ) : field.type === 'select' ? (
                      <Select
                        onValueChange={(val) => {
                          setValue(fieldId, val as OrderFormData[keyof OrderFormData]);
                          trigger(fieldId);
                        }}
                        defaultValue={String(orderData[fieldId as keyof typeof orderData] || '')}
                      >
                        <SelectTrigger className={`${inputStyles} ${error ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Pilih salah satu..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {field.options?.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        {...register(fieldId)}
                        onChange={(e) => {
                          if (fieldId === 'plateNumber' || fieldId === 'no_rangka') {
                            e.target.value = e.target.value.toUpperCase();
                          }
                          register(fieldId).onChange(e);
                        }}
                        className={`${inputStyles} ${(fieldId === 'plateNumber' || fieldId === 'no_rangka') ? 'uppercase' : ''} ${error ? 'border-red-500' : ''}`}
                      />
                    )}

                    {error && (
                      <p className="text-red-500 text-[10px] font-bold mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                );
              })}

              <Button
                type="submit"
                className="btn-akang-primary w-full text-white py-7 rounded-xl font-extrabold text-base transition-all shadow-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Mengecek Data...' : 'Order Sekarang'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};