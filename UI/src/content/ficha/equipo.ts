import type { TitledText } from '../types';

/**
 * Equipo. Fuente: ficha técnica, sección A (Equipo) y descripción del marco (ciclo 3E y ABT).
 * Los nombres y roles se copian tal como están en la ficha.
 */

export const teamIntro = {
  eyebrow: 'ANEXO · EQUIPO',
  title: 'ResonancIA',
  lead: 'Un equipo de la Universidad de La Sabana que presenta esta propuesta al Reto del Rector 2026, Con Voz Transformamos.',
  motto: 'Con Voz Transformamos y con Memoria Cuidamos.',
};

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  /** Rol tal como figura en la ficha. */
  role: string;
}

export const teamMembers: TeamMember[] = [
  { id: 'amaya', name: 'Gabriel Gerardo Amaya Becerra', initials: 'GA', role: 'Administrativo, Graduado M. Analítica – Economía y Finanzas Internacionales.' },
  { id: 'cortes', name: 'Juan Esteban Cortés Rojas', initials: 'JC', role: 'Administrativo, Graduado Ing. Informática – Ing. Mecánica.' },
  { id: 'roncancio', name: 'Camilo Antonio Roncancio Camacho', initials: 'CR', role: 'Administrativo' },
];

export const methodTitle = 'Cómo trabajamos';
export const methodLead = 'El marco se concibió para no volverse rígido. Opera bajo el ciclo de las 3E y se apoya en Algorithmic Business Thinking (ABT), que adoptamos como método de construcción. Así el modelo incorpora nuevas dimensiones de escucha cuando la Universidad las necesite, sin rehacerlo.';

export const threeE: TitledText[] = [
  { id: 'explorar', title: 'Explorar', text: 'Se exploran los vacíos que se detectan al escuchar.' },
  { id: 'experimentar', title: 'Experimentar', text: 'Se prueban ajustes acotados.' },
  { id: 'evolucionar', title: 'Evolucionar', text: 'Se evolucionan los que demuestran funcionar.' },
];

export const methodNote = 'Ajustar dimensiones, criterios o formas de realimentación con este ciclo no implica rehacer la malla.';

export const thanks = {
  title: 'Agradecimiento',
  text: 'Gracias al equipo de Asesoría Psicopedagógica, con quien se construyó el caso. Entender su proceso, sus dilemas éticos y su operación real, antes que imponer una intuición técnica, es lo que dio forma a la propuesta: los principios que gobiernan el diseño son los que definió quien hoy atiende a los estudiantes.',
};

export const teamLinks = [
  { id: 'solucion', label: 'La solución', text: 'La idea completa en tres momentos.' },
  { id: 'soporte', label: 'Soporte técnico', text: 'Lo que se puede verificar.' },
];
