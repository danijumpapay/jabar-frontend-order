interface StepPreviewProps {
  image: string;
  title: string;
  stepId: number;
}

export const StepPreview = ({ image, title, stepId }: StepPreviewProps) => (
  <div className="relative overflow-hidden bg-white shadow-sm border border-sky-50 flex items-end justify-center w-full max-w-119.75 h-144 rounded-[48px]">
    <img 
      src="/tutorial/bg-tutorial.png" 
      alt="Background" 
      className="absolute inset-0 w-full h-full object-cover"
    />
    <img 
      key={stepId}
      src={image} 
      alt={title} 
      className="relative z-10 w-4/5 h-auto transition-all duration-500 animate-in fade-in zoom-in-95 translate-y-10 md:translate-y-40"
    />
  </div>
);