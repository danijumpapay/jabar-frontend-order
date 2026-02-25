import { MessageCircle, Mail } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ContactCard } from './components/ContactCard';
import { faqs } from './data/content';

export const HelpPage = () => {
  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in">
      <Breadcrumbs currentPage="Bantuan" />

      <div className="space-y-2 text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bantuan</h1>
        <p className="text-sm text-gray-500">Ada kendala atau pertanyaan? Tim Kang Pajak siap membantu kamu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-5 order-1">
          <div className="rounded-[32px] md:rounded-[40px] overflow-hidden bg-sky-100 aspect-4/5 lg:h-120 shadow-sm">
            <img
              src="/support/customer-service.png"
              alt="Kang Pajak Support"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 md:space-y-6 order-2">
          <div className="grid grid-cols-2 md:gap-4">
            <ContactCard href="https://wa.me/6281110139532" icon={MessageCircle} label="Whatsapp Kang Pajak" variant="green" />
            <ContactCard href="mailto:admin@kangpajak.com" icon={Mail} label="Email Kang Pajak" variant="blue" />
          </div>

          <Card className="rounded-[32px] border-gray-100 bg-gray-50/50 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-6">
              <h3 className="text-base md:text-lg font-bold text-gray-800">Jam Operasional Kang Pajak</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <p className="text-xs md:text-[13px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#27AAE1]"></span>
                    Layanan Customer Service
                  </p>
                  <ul className="text-xs md:text-sm text-gray-500 space-y-2 ml-4">
                    <li className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Senin – Jum'at</span>
                      <span className="font-semibold text-gray-700">08:00 – 20:00 WIB</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs md:text-[13px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Pengantaran Dokumen
                  </p>
                  <ul className="text-xs md:text-sm text-gray-500 space-y-2 ml-4">
                    <li className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Senin – Jum'at</span>
                      <span className="font-semibold text-gray-700">08:00 – 20:00 WIB</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6 pt-6 md:pt-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Pertanyaan Seputar Layanan Kang Pajak</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-gray-100 bg-gray-50/50 rounded-2xl px-2 overflow-hidden transition-all hover:border-[#27AAE1]/30"
            >
              <AccordionTrigger className="px-4 md:px-6 py-4 md:py-5 hover:no-underline group">
                <span className="text-[13px] md:text-sm font-bold text-gray-800 pr-4 leading-snug group-data-[state=open]:text-[#27AAE1]">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 md:px-6 pb-5 text-[12px] md:text-[13px] text-gray-500 leading-relaxed font-normal">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};