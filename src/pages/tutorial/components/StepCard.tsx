import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StepCardProps {
  id: number;
  title: string;
  desc: string;
  isActive: boolean;
  onClick: () => void;
}

export const StepCard = ({ id, title, desc, isActive, onClick }: StepCardProps) => (
  <Card 
    onClick={onClick}
    className={`cursor-pointer border rounded-[32px] md:rounded-[40px] transition-all duration-300 min-h-45 md:min-h-55 shadow-none ${
      isActive ? 'bg-[#E0F4FF] border-[#27AAE1]' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
    }`}
  >
    <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
      <Badge className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-none border-none transition-colors ${
        isActive ? 'bg-[#27AAE1] text-white hover:bg-[#27AAE1]' : 'bg-[#E0F4FF] text-[#27AAE1] hover:bg-[#E0F4FF]'
      }`}>
        {id}
      </Badge>
      <div className="space-y-1 md:space-y-2">
        <h3 className="font-bold text-gray-900 text-sm md:text-[16px] leading-tight">{title}</h3>
        <p className="text-[11px] md:text-[13px] text-gray-600 leading-relaxed font-medium">{desc}</p>
      </div>
    </CardContent>
  </Card>
);