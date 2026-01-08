import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  variant: 'sky' | 'green' | 'blue';
}

export const ContactCard = ({ href, icon: Icon, label, variant }: ContactCardProps) => {
  const variants = {
    sky: "bg-sky-100 md:bg-sky-50 text-sky-500 group-hover:bg-[#27AAE1]",
    green: "bg-green-100 md:bg-green-50 text-green-500 group-hover:bg-green-500",
    blue: "bg-blue-100 md:bg-blue-50 text-blue-500 group-hover:bg-blue-600"
  };

  return (
    <a 
      href={href} 
      target={href.startsWith('http') ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="bg-gray-50 rounded-2xl md:rounded-[32px] p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 text-center border border-gray-100 hover:shadow-lg hover:shadow-gray-200 transition-all group active:scale-95"
    >
      <div className={`${variants[variant]} p-2 md:p-4 rounded-full group-hover:text-white transition-colors`}>
        <Icon className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <span className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight">{label}</span>
    </a>
  );
};