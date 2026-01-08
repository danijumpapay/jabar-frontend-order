import { PromoSlider } from "./components/PromoSlider";
import { ServiceGrid } from "./components/ServiceGrid";


export const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-12 mt-4 md:mt-8 animate-in fade-in duration-500">
      <PromoSlider />
      <ServiceGrid />
    </div>
  );
};