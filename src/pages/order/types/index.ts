import * as z from 'zod';

export const orderSchema = z.object({
  name: z.string().min(1, 'Nama lengkap wajib diisi'),
  phoneNumber: z.string()
    .min(9, 'Nomor WhatsApp minimal 9 digit')
    .max(13, 'Nomor WhatsApp maksimal 13 digit')
    .regex(/^[8][0-9]*$/, 'Input nomor HP mulai dari angka 8 (Contoh: 812xxxx) dan tidak boleh diawali 0, 62 atau +62'),
  email: z.string().email('Format email tidak valid').min(1, 'Email wajib diisi'),
  identityNumber: z.string().min(16, 'NIK wajib 16 digit').max(16, 'NIK wajib 16 digit'),
  plateNumber: z.string()
    .min(4, 'Nomor plat minimal 4 karakter')
    .regex(/^[A-Z]+\s*[0-9]+\s*[A-Z]+$/, 'Format plat nomor (Contoh: D 1234 ABC atau D1234ABC)'),
  chassisNumber: z.string().min(1, 'Nomor rangka lengkap wajib diisi'),
  mutationType: z.string().optional(),
  vehicleType: z.string().optional(),
  isDataMatch: z.string().optional(),
  kotaCabut: z.string().optional(),
  kotaTujuan: z.string().optional(),
  domisili_sama: z.string().optional(),
  kota_tujuan: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;