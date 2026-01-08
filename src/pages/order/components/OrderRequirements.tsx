import { Card, CardContent } from "@/components/ui/card";

export const OrderRequirements = () => {
  const docs = [
    "FC KTP Pemilik Kendaraan Baru",
    "STNK Asli Kendaraan",
    "BPKB Asli Kendaraan",
    "Cek Fisik (Kendaraan harus ada ditempat pengambilan dokumen)"
  ];

  return (
    <Card className="bg-[#F8F9FA] border border-gray-50/50 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-none">
      <CardContent className="p-8 space-y-4 text-left">
        <h4 className="text-[16px] font-bold text-[#1A1A1A]">Dokumen yang Harus Disiapkan</h4>
        <p className="text-[14px] text-[#4A4A4A] font-normal">Mohon persiapkan dokumen berikut ini :</p>
        <ul className="text-[14px] text-[#4A4A4A] space-y-1 list-disc ml-5 leading-snug">
          {docs.map((doc, index) => (
            <li key={index} className="pl-1">
              <span className="text-[#1A1A1A]">{doc}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};