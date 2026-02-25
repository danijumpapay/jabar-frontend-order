import { TutorialStep } from '../types';

export const whatsappSteps: TutorialStep[] = [
  { id: 1, title: "Chat ke Nomor WA", desc: "Chat ke nomor WhatsApp Kang Pajak dan memberitahu nama, lalu klik menu \"Pilih Layanan\".", phoneImage: "/tutorial/mutasi/phone-step-1.png" },
  { id: 2, title: "Pilih Layanan", desc: "Pilih \"Mutasi Cabut Berkas\".", phoneImage: "/tutorial/mutasi/phone-step-2.png" },
  { id: 3, title: "Pilih Isi Data", desc: "Klik menu \"Isi Data\".", phoneImage: "/tutorial/mutasi/phone-step-3.png" },
  { id: 4, title: "Lengkapi Formulir", desc: "Isi formulir yang diminta pada form Mutasi Cabut Berkas. Pilih Selesai jika sudah.", phoneImage: "/tutorial/mutasi/phone-step-4.png" },
  { id: 5, title: "Quotation Diberikan", desc: "BOT Whatsapp akan memberikan Quotation total biaya yang perlu dibayarkan oleh user.", phoneImage: "/tutorial/mutasi/phone-step-5.png" },
  { id: 7, title: "Pilih Metode Pembayaran", desc: "Pilih metode pembayaran, misalnya: QRIS. Lalu akan muncul gambar QRIS.", phoneImage: "/tutorial/mutasi/phone-step-7.png" },
  { id: 8, title: "Invoice Dikirim", desc: "Invoice akan dikirimkan setelah pembayaran berhasil.", phoneImage: "/tutorial/mutasi/phone-step-8.png" },
  { id: 9, title: "Unggah Dokumen", desc: "Selanjutnya akan diminta untuk Unggah KTP Pemilik Baru, BPKB, dan STNK. Pilih Selesai jika sudah.", phoneImage: "/tutorial/mutasi/phone-step-9.png" },
  { id: 10, title: "Isi Alamat Lengkap", desc: "Lalu, akan diminta memasukkan alamat lengkap lokasi pengambilan.", phoneImage: "/tutorial/mutasi/phone-step-10.png" },
  { id: 11, title: "Share Lokasi", desc: "Nanti akan diminta untuk share lokasi tempat penjemputan dokumen dan diconfirm via WA oleh CS.", phoneImage: "/tutorial/mutasi/phone-step-11.png" },
  { id: 12, title: "Jemput Dokumen", desc: "Kemudian, dokumen akan dijemput dan diproses oleh Kang Pajak pada H+1 hari kerja setelah order.", phoneImage: "/tutorial/mutasi/phone-step-12.png" },
  { id: 13, title: "Cek Status Order", desc: "Kode order akan dikirimkan lalu status order dapat dilihat dengan mengetik kode order.", phoneImage: "/tutorial/mutasi/phone-step-13.png" }
];

export const categories: string[] = ["STNK Tahunan", "STNK 5 Tahunan"];