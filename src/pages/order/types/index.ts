import * as z from 'zod';

export const orderSchema = z.object({
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

export type OrderFormData = z.infer<typeof orderSchema>;