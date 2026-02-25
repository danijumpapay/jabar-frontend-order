import { CheckCircle2, Circle } from 'lucide-react';
import { OrderStep } from '../types';

interface StatusTimelineProps {
  steps: OrderStep[];
}

export const StatusTimeline = ({ steps }: StatusTimelineProps) => (
  <div className="space-y-8 mb-10 text-left">
    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Status Pengurusan Surat:</h4>
    <div className="relative space-y-10 before:absolute before:inset-0 before:ml-3 before:h-full before:w-0.5 before:bg-gray-100">
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex items-center gap-4">
          <div className="z-10 bg-white">
            {step.completed ? (
              <CheckCircle2 className="text-kang-pajak-blue bg-white rounded-full" size={24} />
            ) : (
              <Circle className="text-gray-200 fill-white" size={24} />
            )}
          </div>
          <p className={`text-sm ${step.completed ? 'font-bold text-gray-800' : 'font-medium text-gray-400'}`}>
            {step.title}
          </p>
        </div>
      ))}
    </div>
  </div>
);