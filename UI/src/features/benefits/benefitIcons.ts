import {
  Archive, AudioLines, BookOpen, Brain, ClipboardCheck, Clock, Coins, Equal, GitBranch, HeartHandshake, Layers, LineChart, Library,
  Network, Reply, Route, Scale, ScanSearch, ShieldCheck, Target, TrendingUp, Unlock, UserCog, Workflow, type LucideIcon,
} from 'lucide-react';

/** Icono de cada beneficio, por su id. Es solo presentación: el texto vive en `content/ficha/beneficios.ts`. */
export const benefitIcons: Record<string, LucideIcon> = {
  // Quien es escuchado
  voz: AudioLines, respuesta: Reply, pertinente: Route, consistente: Equal, libertad: Unlock,
  // Quien escucha
  tiempo: Clock, contexto: BookOpen, carga: Brain, respaldo: ShieldCheck, conocimiento: Archive,
  // Procesos
  registros: Layers, trazabilidad: GitBranch, dueno: UserCog, articulacion: Network, patrones: ScanSearch, mejora: TrendingUp, pertinencia: Target,
  // Universidad
  memoria: Library, analitica: LineChart, costo: Coins, confianza: HeartHandshake, rendicion: ClipboardCheck, transversal: Workflow, etica: Scale,
};
