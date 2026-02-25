import { useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Card, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react';
import Swal from 'sweetalert2';
import { RefundForm } from './components/RefundForm';
import { RefundFormData, RefundErrors } from './types';

export const RefundPage = () => {
  const { setView } = useOrderStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<RefundFormData>({
    orderNumber: '12345',
    nominalAktual: '',
    catatan: '',
    bank: '',
    rekening: ''
  });

  const [errors, setErrors] = useState<RefundErrors>({
    nominalAktual: '',
    bank: '',
    rekening: ''
  });

  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRupiah(e.target.value);
    setFormData({ ...formData, nominalAktual: formatted });
    if (formatted) setErrors({ ...errors, nominalAktual: '' });
  };

  const handleInputChange = (field: keyof RefundFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (value && field in errors) {
      setErrors({ ...errors, [field as keyof RefundErrors]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: RefundErrors = {
      nominalAktual: !formData.nominalAktual ? 'Nominal aktual wajib diisi' : '',
      bank: !formData.bank ? 'Pilih bank yang dituju' : '',
      rekening: !formData.rekening ? 'Nomor rekening wajib diisi' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await Swal.fire({
      title: 'Konfirmasi Pengajuan',
      text: "Apakah data refund yang Anda masukkan sudah benar?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#27AAE1',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, Ajukan',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pengajuan refund Anda akan diproses dalam 5 hari kerja.',
          icon: 'success',
          confirmButtonColor: '#27AAE1'
        }).then(() => {
          setView('tracking');
        });
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in">
      <div className="flex items-center gap-4">
        <Breadcrumbs
          parentPage="Cek Order"
          onParentClick={() => setView('tracking')}
          currentPage="Pengajuan Refund"
        />
      </div>

      <div className="space-y-2 text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ajukan Refund</h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          Mohon isi formulir di bawah ini dengan data yang benar untuk mempercepat proses pengembalian dana Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-[32px] border-gray-100 shadow-sm overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <RefundForm
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                onNominalChange={handleNominalChange}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6 text-left">
          <Card className="rounded-3xl border-none bg-blue-50/50 p-6">
            <h4 className="font-bold text-kang-pajak-blue mb-3 flex items-center gap-2">
              <Info size={18} /> Informasi Refund
            </h4>
            <ul className="text-xs text-gray-600 space-y-3 list-disc ml-4 font-medium leading-relaxed">
              <li>Proses verifikasi refund membutuhkan waktu maksimal 24 jam hari kerja.</li>
              <li>Dana akan ditransfer dalam 5 hari kerja setelah pengajuan disetujui.</li>
              <li>Pastikan data rekening bank sudah sesuai untuk menghindari keterlambatan.</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
};