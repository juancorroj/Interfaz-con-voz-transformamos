import { Calculator, CalendarRange, Compass, HeartHandshake, LayoutGrid, Lightbulb, ShieldCheck, UsersRound, Workflow, type LucideIcon } from 'lucide-react';
import { ALL_TOPICS } from './faq';

/** Icono de cada tema de las preguntas. Es solo presentación. */
export const topicIcons: Record<string, LucideIcon> = {
  [ALL_TOPICS]: LayoutGrid,
  'Qué es': Lightbulb,
  'Cómo funciona': Workflow,
  'Personas y ética': HeartHandshake,
  Evidencia: ShieldCheck,
  Implementación: CalendarRange,
  Costos: Calculator,
  Alcance: Compass,
  Equipo: UsersRound,
};
