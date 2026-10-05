import type { GuideRoute, ScopeStatement, StatusLegendItem } from '../types';

/** Textos de la página de bienvenida. Fuente: ficha técnica (Descripción) y `UI/INTERFAZ_RESONANCIA.md` (Estado y límites). */

export const welcomeIntro = {
  eyebrow: '¿QUÉ ES RESONANCIA?',
  title: 'Escuchar para acompañar.',
  summary:
    'ResonancIA es un ecosistema inteligente de escucha, comprensión y realimentación que convierte las conversaciones que ya ocurren en la Universidad en información útil para acompañar mejor a las personas, fortalecer la toma de decisiones y construir memoria institucional.',
  premise: 'No abre canales nuevos: potencia los que ya existen.',
  motto: 'Con Voz Transformamos y con Memoria Cuidamos.',
  audience:
    'Esta web es para cualquier persona que quiera conocer la propuesta: estudiantes, profesores, administrativos, graduados, aliados, directivos y equipos técnicos.',
};

export const cycleMoments = [
  { id: 'escuchar', title: 'Escuchar', text: 'Estructura lo conversado, y cada hallazgo se respalda con una cita textual.' },
  { id: 'comprender', title: 'Comprender', text: 'La interpretación la hacen las personas y los equipos de analítica, no la IA.' },
  { id: 'realimentar', title: 'Realimentar', text: 'El sistema propone; la persona responsable revisa, ajusta y decide.' },
];

export const cycleReturn = 'Y entonces se vuelve a escuchar: ese ciclo es la memoria institucional activa.';

/**
 * Recorridos sugeridos. Los pasos son ids de sección (`seccion` o `seccion/sub`): los que todavía no
 * existen en el registro se omiten solos, y un recorrido sin pasos no se muestra.
 */
export const guideRoutes: GuideRoute[] = [
  {
    id: 'cinco-minutos',
    title: 'Tengo cinco minutos',
    intro: 'Conoce nuestra propuesta resumida en 5 minutos.',
    steps: ['pitch'],
    video: { label: 'Ver el video de 5 minutos', available: false, note: 'Disponible próximamente aquí mismo.' },
  },
  {
    id: 'historia',
    title: 'Explicación con una historia',
    intro: 'Una historia que no empieza de cero, cada encuentro conserva el contexto para el siguiente.',
    steps: ['asesoria/memoria', 'asesoria/resumen'],
  },
  {
    id: 'entender',
    title: 'Quiero entender la propuesta',
    intro: 'Explicación y desglose general de la idea.',
    steps: ['solucion', 'beneficios', 'distintos', 'preguntas'],
  },
  {
    id: 'funciona',
    title: 'Quiero ver aplicada la idea',
    intro: 'Aplicación de la metodología de punta a punta: el caso de Asesoría Psicopedagógica.',
    steps: ['asesoria/resumen', 'asesoria/proceso', 'asesoria/memoria', 'asesoria/operacion', 'asesoria/malla', 'asesoria/agentes', 'asesoria/validacion', 'soporte'],
  },
  {
    id: 'viabilidad',
    title: 'Evalúo la viabilidad',
    intro: 'Cómo se pondría en marcha, cuánto costaría y qué marco ético y legal la sostiene.',
    steps: ['implementacion', 'costos', 'etica'],
  },
  {
    id: 'proceso',
    title: 'Soy dueño de un proceso',
    intro: 'Cómo se aplicaría en otros públicos y qué se necesita de quien conoce el proceso.',
    steps: ['solucion', 'publicos', 'etica'],
  },
];

export const whatItIs: ScopeStatement[] = [
  { text: 'Una vitrina interactiva de la propuesta completa: la idea, sus beneficios, el caso de Asesoría de punta a punta, los otros cuatro públicos, la implementación, los costos y el marco ético y legal.' },
  { text: 'La aplicación de la metodología y de la malla de agentes en Asesoría Psicopedagógica, corrida de punta a punta sobre sesiones simuladas cercanas a la realidad.' },
  { text: 'Un espacio para explorar y verificar: un simulador de costos con escenarios propios, ejemplos de memoria y de panel del profesional que se pueden recorrer, y la evidencia verificable con sus límites declarados.' },
  { text: 'Un prototipo con datos simulados: Alex, Sam y las demás personas de los ejemplos no existen.' },
];

export const whatItIsNot: ScopeStatement[] = [
  { text: 'No es un sistema en operación: no graba audio, no ejecuta agentes en vivo y no se conecta a Microsoft Teams; esa conexión está diseñada, no desplegada.' },
  { text: 'No es una validación con personas reales: Asesoría espera su piloto con consentimiento informado y los otros cuatro públicos falta validarlos con sus dueños de proceso.' },
  { text: 'No autentica personas ni controla accesos: elegir un rol solo cambia la vista.' },
  { text: 'No envía comunicaciones ni emite certificados.' },
  { text: 'No es un presupuesto: los costos son estimaciones del estudio de 2026 y dependen de decisiones institucionales.' },
];

export const scopeDeclaration = 'El rigor es parte de la propuesta: los audios procesados en la validación fueron simulados, cercanos a la realidad, y no se expuso a ninguna persona real, porque el cuidado también es parte del corazón de la propuesta.';

export const statusLegend: StatusLegendItem[] = [
  { kind: 'ejecutado', text: 'Se construyó, se corrió la metodología de punta a punta y se confirmó que funciona en el escenario de validación.' },
  { kind: 'disenado', text: 'Se aplicaron las tres metodologías y se diseñaron y construyeron las mallas agénticas; falta validarlas con el dueño del proceso.' },
  { kind: 'ficticio', text: 'Ejemplo simulado real para explicar cómo funcionaría: no son personas reales, y los resultados obtenidos sirven de evidencia de cómo funciona el sistema en el escenario de validación.' },
];

/** Fragmento del texto de presentación: `brand` y `accent` van en verde, `strong` en negrita. */
export interface SummarySegment {
  text: string;
  tone?: 'brand' | 'strong' | 'accent';
}

export const welcomeSummary: SummarySegment[] = [
  { text: 'ResonancIA', tone: 'brand' },
  { text: ' es un ' },
  { text: 'ecosistema inteligente de escucha, comprensión y realimentación', tone: 'strong' },
  { text: ' que convierte las ' },
  { text: 'conversaciones que ya ocurren', tone: 'strong' },
  { text: ' en la Universidad en ' },
  { text: 'información útil para acompañar mejor', tone: 'strong' },
  { text: ' a las personas, fortalecer la toma de decisiones y construir ' },
  { text: 'memoria institucional', tone: 'accent' },
  { text: '.' },
];

/** Texto de cada tarjeta del ciclo de tres capacidades, por id de fase. */
export const capabilityTexts: Record<string, string> = {
  escucha: 'Captura y estructura asistida de lo conversado, con autorización y agentes especializados para el proceso, respaldado con un auditor que valida citas textuales.',
  analitica: 'El equipo humano de Analítica construye indicadores y análisis junto al área, según su necesidad. La interpretación la hacen las personas, no la IA.',
  respuesta: 'El responsable del proceso define las acciones, los agentes apoyan y proponen la realimentación acordada, el humano revisa, ajusta y decide.',
};
