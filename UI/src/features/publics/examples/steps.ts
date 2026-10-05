import { AudioLines, Brain, CalendarCheck, HeartHandshake, Sparkles, Target, type LucideIcon } from 'lucide-react';
import type { Audience } from '../../../data/audiences';

export interface ExampleStep {
  id: 'need' | 'contact' | 'listening' | 'understanding' | 'feedback' | 'benefit';
  title: string;
  text: string;
  icon: LucideIcon;
}

/** Los seis pasos de un ejemplo, en orden. Todas las formas de presentarlo parten de esta misma lista. */
export function stepsOf(a: Audience): ExampleStep[] {
  return [
    { id: 'need', title: 'Necesidad', text: a.need, icon: Target },
    { id: 'contact', title: 'Punto de contacto', text: a.contact, icon: CalendarCheck },
    { id: 'listening', title: 'Escucha', text: a.listening, icon: AudioLines },
    { id: 'understanding', title: 'Comprensión', text: a.understanding, icon: Brain },
    { id: 'feedback', title: 'Realimentación', text: a.feedback, icon: HeartHandshake },
    { id: 'benefit', title: 'Beneficio esperado', text: a.benefit, icon: Sparkles },
  ];
}

export const byId = (steps: readonly ExampleStep[], id: ExampleStep['id']): ExampleStep => steps.find(s => s.id === id)!;
