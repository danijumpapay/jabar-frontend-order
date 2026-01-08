export type TutorialTab = 'website' | 'whatsapp';

export interface TutorialStep {
  id: number;
  title: string;
  desc: string;
  phoneImage: string;
}