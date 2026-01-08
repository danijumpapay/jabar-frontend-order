import { useOrderStore } from '@/store/useOrderStore';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbsProps {
  currentPage: string;
  parentPage?: string;
  onParentClick?: () => void;
}

export const Breadcrumbs = ({ currentPage, parentPage, onParentClick }: BreadcrumbsProps) => {
  const setStep = useOrderStore((s) => s.setStep);
  const setView = useOrderStore((s) => s.setView);

  const handleHomeClick = () => {
    setView('order');
    setStep(1);
  };

  return (
    <Breadcrumb className="font-inter">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={handleHomeClick} className="cursor-pointer">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {parentPage && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={onParentClick} className="cursor-pointer">
                {parentPage}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-gray-900">{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};