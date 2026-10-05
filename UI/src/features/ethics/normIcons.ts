import { Archive, Bot, Gauge, KeyRound, Lock, Minimize2, PencilRuler, Scale, Stethoscope, type LucideIcon } from 'lucide-react';

/** Icono de cada norma o estándar, por su id. Es solo presentación. */
export const normIcons: Record<string, LucideIcon> = {
  'ley-1581': Lock,
  'ley-1090': Stethoscope,
  'ley-1010': Scale,
  'iso-42001': Bot,
  'iso-27001': KeyRound,
  'nist-rmf': Gauge,
  'ieee-7000': PencilRuler,
  'nist-800-88': Archive,
  'gdpr-5': Minimize2,
};
