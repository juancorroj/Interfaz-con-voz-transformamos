import { Network, GitBranch, BookOpen, Users, HeartHandshake, Video, Compass, Stethoscope, PlayCircle, Route, LayoutList, ListChecks, Brain, ShieldCheck, Lightbulb, Workflow, Gift, UserRound, Cog, Landmark, UsersRound, Sparkles, CircleHelp, Scale, CalendarRange, Landmark as Institution, Calculator, GraduationCap, BriefcaseBusiness, Presentation, Building2, Handshake, FileSearch, FileCheck2 } from 'lucide-react';
import { SectionRegistry } from './SectionRegistry';
import type { RouteAliases } from './HashRouter';

/** Página de entrada de la web: lo primero que ve quien llega y a donde regresa el logo. */
export const HOME_SECTION_ID = 'bienvenida';

/** Sección del caso de Asesoría Psicopedagógica y sus pestañas. */
export const CASE_SECTION_ID = 'asesoria';

/**
 * Rutas de las versiones anteriores, cuando Malla, Catálogo, Memoria y Panel
 * eran páginas sueltas. Se conservan para no romper enlaces ya compartidos.
 */
export const legacyRouteAliases: RouteAliases = {
  inicio: { sectionId: HOME_SECTION_ID },
  malla: { sectionId: CASE_SECTION_ID, sub: 'malla' },
  agentes: { sectionId: CASE_SECTION_ID, sub: 'agentes' },
  memoria: { sectionId: CASE_SECTION_ID, sub: 'memoria' },
  operacion: { sectionId: CASE_SECTION_ID, sub: 'operacion' },
};

/**
 * Secciones de la web en el orden del menú. Los grupos nuevos (Conocer,
 * Gobierno, Anexos…) se registran aquí cuando llegan sus páginas.
 */
export function createSectionRegistry(): SectionRegistry {
  return new SectionRegistry()
    .registerGroup({ id: 'presentar', label: 'Presentar', breadcrumb: false, icon: PlayCircle, description: 'El pitch para conocer la propuesta en cinco minutos.' })
    .registerGroup({ id: 'empezar', label: 'Empezar', icon: Compass, description: 'La puerta de entrada y la idea general de la propuesta.' })
    .registerGroup({ id: 'conocer', label: 'Conocer', icon: Lightbulb, description: 'Qué es la propuesta, cómo funciona y qué gana cada quien.' })
    .registerGroup({ id: 'caso', label: 'Caso Asesoría', breadcrumb: false, icon: Stethoscope, description: 'El escenario más exigente y el más desarrollado: la Asesoría Psicopedagógica.' })
    .registerGroup({ id: 'publicos', label: 'Otros públicos', icon: Route, description: 'Cómo se extiende el marco a otros públicos de la Universidad.' })
    .registerGroup({ id: 'gobierno', label: 'Gobierno', icon: Institution, description: 'La base ética y legal y cómo se pondría en marcha.' })
    .registerGroup({ id: 'anexos', label: 'Anexos', icon: FileSearch, description: 'La evidencia verificable, las preguntas frecuentes y quiénes están detrás de la propuesta.' })
    .register({ id: 'pitch', label: 'Pitch', icon: Video, group: 'presentar', showPager: false, description: 'Pitch de cinco minutos, con notas para comprender mejor la idea.' })
    .register({ id: HOME_SECTION_ID, label: 'Bienvenida y guía', icon: Compass, group: 'empezar', legacyClass: 'inicio', description: 'La idea en una pantalla, por dónde empezar según lo que quieras saber, el mapa de la web y su alcance.' })
    .register({ id: 'solucion', label: 'La solución', icon: Workflow, group: 'conocer', description: 'Cómo funciona: la premisa, los tres momentos, el ciclo y la frontera de la co-inteligencia.' })
    .register({
      id: 'beneficios', label: 'Beneficios', icon: Gift, group: 'conocer',
      description: 'Qué ganan las personas, los procesos y la Universidad, y qué se espera para cada público.',
      subsections: [
        { id: 'personas', label: 'Para las personas', icon: UserRound, description: 'Para quien es escuchado y para quien escucha.' },
        { id: 'procesos', label: 'Para los procesos', icon: Cog, description: 'Trazabilidad, patrones visibles y realimentación pertinente.' },
        { id: 'universidad', label: 'Para la Universidad', icon: Landmark, description: 'Memoria institucional, analítica como servicio y escalabilidad.' },
        { id: 'publicos', label: 'Visión por público', icon: UsersRound, description: 'Lo que se espera para estudiantes, graduados, profesores, administrativos y aliados.' },
      ],
    })
    .register({ id: 'distintos', label: 'Lo que nos hace distintos', icon: Sparkles, group: 'conocer', description: 'Nuestros seis elementos de innovación que nos hacen diferentes.' })
    .register({
      id: CASE_SECTION_ID, label: 'Asesoría Psicopedagógica', icon: Stethoscope, group: 'caso',
      description: 'El caso más desarrollado, contado de principio a fin.',
      subsections: [
        { id: 'resumen', label: 'Aplicación', icon: LayoutList, description: 'Caso probado que aplica la propuesta de principio a fin.', group: 'Entender' },
        { id: 'proceso', shortLabel: 'Proceso y principios', label: 'El proceso y sus principios', icon: ListChecks, description: 'Cómo es la atención hoy y qué decisiones de diseño nacieron de entenderla.', group: 'Entender' },
        { id: 'memoria', label: 'Memoria viva', icon: Brain, description: 'Un ejemplo simulado cercano a la realidad, para observar cómo el siguiente encuentro inicia con contexto.', group: 'Verlo en uso' },
        { id: 'operacion', label: 'Panel del profesional', icon: HeartHandshake, description: 'La demostración del espacio de trabajo: acuerdos, borradores y cierre simulado.', group: 'Verlo en uso' },
        { id: 'malla', label: 'Malla de agentes', icon: Network, description: 'Cómo se reparte el trabajo entre el orquestador y los especialistas.', group: 'Por dentro' },
        { id: 'agentes', shortLabel: 'Catálogo', label: 'Catálogo de agentes', icon: BookOpen, description: 'Las especificaciones de los agentes y los roles de apoyo metodológico.', group: 'Por dentro' },
        { id: 'validacion', shortLabel: 'Validación', label: 'Validación y madurez', icon: ShieldCheck, description: 'Qué se corrió, con qué alcance y qué tan lejos está de operar.', group: 'Qué tan lejos llegó' },
      ],
    })
    .register({
      id: 'publicos', label: 'Casos de uso por público', icon: Users, group: 'publicos',
      description: 'Los cinco públicos del reto: qué existe, qué falta y qué se necesita de cada dueño de proceso.',
      subsections: [
        { id: 'panorama', label: 'Panorama', icon: Users, description: 'Los cinco públicos de un vistazo: estado, tamaño de cada malla y cuánto se reutiliza.' },
        { id: 'estudiantes', label: 'Estudiantes', icon: GraduationCap, description: 'El caso construido y ejecutado de punta a punta: Asesoría Psicopedagógica.', status: 'ejecutado' },
        { id: 'graduados', label: 'Graduados', icon: BriefcaseBusiness, description: 'Alumni Sabana: formación continua y señales laborales.', status: 'disenado' },
        { id: 'profesores', label: 'Profesores', icon: Presentation, description: 'Desarrollo Profesoral: acompañamiento sin carácter punitivo.', status: 'disenado' },
        { id: 'administrativos', label: 'Administrativos', icon: Building2, description: 'Desarrollo Humano: inercias operativas y picos estacionales.', status: 'disenado' },
        { id: 'aliados', label: 'Aliados', icon: Handshake, description: 'Proyección Social y Engagement: brechas de perfiles y retos.', status: 'disenado' },
      ],
    })
    .register({ id: 'etica', label: 'Ética y marco legal', icon: Scale, group: 'gobierno', footer: true, description: 'Las normas colombianas y los estándares internacionales, la señal de riesgo y el consentimiento.' })
    .register({ id: 'implementacion', label: 'Implementación', icon: CalendarRange, group: 'gobierno', description: 'Un plan por fases, cuánto tomaría, qué se mide y qué puede alterarlo.' })
    .register({ id: 'costos', label: 'Costos', icon: Calculator, group: 'gobierno', footer: true, description: 'Las cifras de la ficha y un simulador para ver qué mueve el costo y comparar escenarios.' })
    .register({ id: 'soporte', label: 'Soporte técnico', icon: FileCheck2, group: 'anexos', footer: true, description: 'Lo clave de la evidencia verificable, los documentos para leer completos y cómo comprobarlo por cuenta propia.' })
    .register({ id: 'preguntas', label: 'Preguntas frecuentes', icon: CircleHelp, group: 'anexos', footer: true, description: 'Las dudas más comunes con respuestas cortas, su fuente y enlace directo.' })
    .register({ id: 'equipo', label: 'Equipo', icon: UsersRound, group: 'anexos', footer: true, sidebar: false, description: 'Quiénes somos, cómo trabajamos y a quién agradecemos.' })
    .register({ id: 'recorrido', label: 'Recorrido del caso', icon: GitBranch, group: 'caso', hidden: true });
}

export const sectionRegistry = createSectionRegistry();
