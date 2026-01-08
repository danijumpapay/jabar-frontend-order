import { useState } from 'react';
import { Breadcrumbs } from '../../components/shared/Breadcrumbs';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StepCard } from './components/StepCard';
import { StepPreview } from './components/StepPreview';
import { whatsappSteps, categories } from './data/steps';
import { TutorialTab, TutorialStep } from './types';

export const TutorialPage = () => {
  const [activeTab, setActiveTab] = useState<TutorialTab>('whatsapp');
  const [activeCategory, setActiveCategory] = useState<string>("Mutasi (Cabut Berkas)");
  const [activeStepId, setActiveStepId] = useState<number>(1);

  const currentStep: TutorialStep = whatsappSteps.find(s => s.id === activeStepId) || whatsappSteps[0];

  return (
    <div className="max-w-7xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in">
      <Breadcrumbs currentPage="Tutorial Order" />
      
      <div className="space-y-2 text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tutorial Order</h1>
        <p className="text-sm text-gray-500">Ikuti panduan langkah demi langkah untuk melakukan order layanan di JumpaPay dengan benar.</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v: string) => setActiveTab(v as TutorialTab)} className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b border-gray-100 rounded-none h-auto p-0 gap-8">
          <TabsTrigger 
            value="website" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#27AAE1] data-[state=active]:bg-transparent data-[state=active]:text-[#27AAE1] px-2 py-4 text-sm font-bold text-gray-400 transition-all"
          >
            Tutorial Order Website
          </TabsTrigger>
          <TabsTrigger 
            value="whatsapp" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#27AAE1] data-[state=active]:bg-transparent data-[state=active]:text-[#27AAE1] px-2 py-4 text-sm font-bold text-gray-400 transition-all"
          >
            Tutorial Order Whatsapp
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat 
              ? 'bg-[#E0F4FF] border-[#27AAE1] text-[#27AAE1]' 
              : 'bg-[#F8F9FA] border-gray-100 text-gray-400 hover:border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex justify-center lg:justify-start">
          <StepPreview 
            image={currentStep.phoneImage} 
            title={currentStep.title} 
            stepId={currentStep.id} 
          />
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {whatsappSteps.map((step) => (
            <StepCard 
              key={step.id}
              id={step.id}
              title={step.title}
              desc={step.desc}
              isActive={activeStepId === step.id}
              onClick={() => setActiveStepId(step.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};