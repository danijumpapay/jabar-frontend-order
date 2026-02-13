import * as z from 'zod';

export const orderSchema = z.object({
  name: z.string().min(1, 'Nama lengkap wajib diisi'),
  email: z.string().email('Email tidak valid'),
  whatsapp: z.string()
    .min(10, 'Nomor WhatsApp minimal 10 digit')
    .regex(/^[1-9][0-9]*$/, 'Hanya boleh angka dan tidak boleh diawali angka 0'),
  plateNumber: z.string()
    .min(4, 'Nomor plat minimal 4 karakter')
    .regex(/^[A-Z]+\s[0-9]+\s[A-Z]+$/, 'Format wajib menggunakan spasi (Contoh: D 1234 ABC)'),
  no_rangka: z.string().min(5, 'Masukan minimal 5 digit terakhir'),
  jenisMutasi: z.string().optional(),
  jenisKendaraan: z.string().optional(),
  isDataMatch: z.string().optional(),
  kotaCabut: z.string().optional(),
  kotaTujuan: z.string().optional(),
  domisili_sama: z.string().optional(),
  kota_tujuan: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;