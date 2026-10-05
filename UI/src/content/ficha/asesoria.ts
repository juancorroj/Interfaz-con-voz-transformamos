import type { CaseFigure, ProcessStage, TitledText } from '../types';

/**
 * Contenido del caso de Asesoría Psicopedagógica.
 * Fuentes: ficha técnica (Descripción · Dónde funciona; Beneficios · Escalabilidad) y
 * `Casos-de-uso/Asesoria-Psicopedagogica/Asesoría Psicopedagógica.md` (modelo del proceso).
 */

export const caseHeader = {
  eyebrow: 'EL CASO MÁS DESARROLLADO',
  title: 'Asesoría Psicopedagógica',
  /** El título partido en renglones; el último tramo va resaltado. */
  titleLines: ['Asesoría'],
  titleAccent: 'Psicopedagógica.',
  tagline: 'El escenario más exigente y el único que se ejecutó de punta a punta.',
};

/** Avisos de ubicación que se muestran sobre las páginas que ya existían. */
export const caseTabNotes: Record<string, string> = {
  malla: 'Esta es la malla que se ejecutó en Asesoría: ocho agentes de escucha y ocho de realimentación. La capa de comprensión es humana y no aparece como agente.',
  agentes: 'Las 16 especificaciones corresponden a este caso. No son una cantidad universal: cada proceso requiere su propio diseño.',
  memoria: 'Alex y Sam son personas de una simulación cercana a la realidad, creadas para explicar cómo cada encuentro conserva el contexto del siguiente.',
  operacion: 'Demostración del espacio de trabajo del profesional. El sistema propone; la persona responsable revisa, ajusta y decide.',
};

// ---------- Resumen ----------

export const summary = {
  eyebrow: 'RESUMEN DEL CASO',
  title: 'Si el marco resiste aquí, resiste en cualquier parte.',
  why: 'Escogimos validar en el escenario más exigente: la Asesoría Psicopedagógica, un proceso de alta sensibilidad humana, con secreto profesional y conversación abierta sin formato.',
  how: 'No empezamos por construir la tecnología. Nos sentamos con quienes llevan el proceso para comprender cómo funciona su día a día y encontrar cómo ResonancIA se podría activar acompañándolo.',
};

export const summaryMoments: TitledText[] = [
  { id: 'escuchar', title: 'Escuchar', text: 'Ocho agentes procesan la sesión y estructuran la información que la dueña del proceso definió que necesita conocer. Un verificador independiente exige una cita textual para cada hallazgo.' },
  { id: 'comprender', title: 'Comprender', text: 'Cinco roles metodológicos acompañan al equipo humano de Analítica. La interpretación la hacen las personas, no un modelo.' },
  { id: 'realimentar', title: 'Realimentar', text: 'Ocho agentes preparan tarjetas de realimentación listas para el asesor, que las revisa, las ajusta o las descarta.' },
];

export const summaryFigures: CaseFigure[] = [
  { value: '16', label: 'agentes', detail: 'ocho de escucha, ocho de realimentación' },
  { value: '5', label: 'roles metodológicos', detail: 'humanos, en la capa analítica' },
  { value: '42', label: 'sesiones simuladas', detail: '2 de punta a punta desde el audio, 40 replicadas en texto' },
];

// ---------- Proceso y principios ----------

export const process = {
  eyebrow: 'EL PROCESO Y SUS PRINCIPIOS',
  title: 'Primero entender el proceso; después, la tecnología.',
  intro: 'La asesoría ayuda al estudiante a comprender su situación, identificar acciones concretas y conectarse con los recursos adecuados, sin intervenir en ámbitos que excedan el alcance profesional del servicio.',
  purposeTitle: 'Para qué existe la asesoría',
  purpose: [
    'Escuchar al estudiante de manera integral.',
    'Comprender las dificultades que afectan su experiencia universitaria.',
    'Identificar barreras académicas, administrativas, personales o asociadas a beneficios y becas.',
    'Definir acciones concretas y orientarlo hacia las dependencias pertinentes.',
    'Hacer seguimiento cuando sea necesario y favorecer su autonomía.',
  ],
  purposeNote: 'No busca reemplazar la atención psicológica, médica, social o jurídica especializada cuando se necesite.',
  stagesTitle: 'Las diez etapas de una atención regular',
  principlesTitle: 'Principios que orientan cada atención',
  limitsTitle: 'Dónde termina el alcance de la asesoría',
  limits: 'Cuando aparece depresión, ansiedad significativa, crisis emocional, riesgo para la integridad o violencia y vulneración de derechos, se activa la remisión al servicio correspondiente.',
  idea: 'Comprender al estudiante de manera integral, orientarlo desde aquello que puede transformar, articular los recursos institucionales y construir rutas claras, respetando siempre los límites éticos y profesionales del servicio.',
  source: 'Fuente: modelo del proceso de atención regular de Asesoría Psicopedagógica.',
};

export const processStages: ProcessStage[] = [
  { n: 1, title: 'Ingreso de la solicitud', text: 'El estudiante pide apoyo o llega remitido; se registra lo básico para programar.' },
  { n: 2, title: 'Preparación', text: 'Se revisan antecedentes y compromisos pendientes para que no tenga que repetir su historia.' },
  { n: 3, title: 'Acogida y alistamiento', text: 'Se explica el propósito, la duración, la confidencialidad y el registro de la atención.' },
  { n: 4, title: 'Escucha y valoración', text: 'Se distingue entre hechos, interpretaciones, emociones y necesidades concretas.' },
  { n: 5, title: 'Delimitación del problema', text: 'Se define qué es inmediato, qué se trabaja en la asesoría y qué requiere remisión.' },
  { n: 6, title: 'Definición de objetivos', text: 'Objetivos claros, concretos y alcanzables.' },
  { n: 7, title: 'Plan de trabajo', text: 'Acciones con responsable, fecha o condición de cumplimiento y resultado esperado.' },
  { n: 8, title: 'Remisión y articulación', text: 'Si la necesidad excede el servicio, se remite explicando por qué, a dónde y cómo.' },
  { n: 9, title: 'Registro', text: 'Se documentan motivo, necesidad, intervenciones, acuerdos, remisiones y seguimientos.' },
  { n: 10, title: 'Seguimiento y cierre', text: 'Se revisan avances y el caso se cierra cuando el estudiante puede continuar de forma autónoma.' },
];

export const orientingPrinciples: TitledText[] = [
  { id: 'centralidad', title: 'Centralidad en el estudiante', text: 'La conversación gira alrededor de sus necesidades reales y no solo de los procedimientos.' },
  { id: 'escucha', title: 'Escucha activa', text: 'Se comprende el problema y también el impacto que tiene en su vida académica y personal.' },
  { id: 'responsabilidad', title: 'Responsabilidad profesional', text: 'No se abren temas que el profesional no pueda acompañar o cerrar adecuadamente.' },
  { id: 'claridad', title: 'Claridad institucional', text: 'El estudiante sale sabiendo qué ocurre, qué opciones tiene, qué hacer después y con quién hablar.' },
  { id: 'accion', title: 'Orientación a la acción', text: 'Cada atención termina con acuerdos concretos y verificables.' },
];

export const designDecisionsTitle = 'Lo que el proceso nos enseñó y se volvió arquitectura';
export const designDecisionsIntro = 'Al sentarnos con quienes llevan el proceso, encontramos cuatro aspectos que se convirtieron en decisiones de diseño y en parte del corazón de ResonancIA.';
export const designDecisions: TitledText[] = [
  { id: 'encuentro', title: 'El encuentro humano no se instrumentaliza', text: '**La cercanía, la personalización y la mirada integral son el valor del proceso**. ResonancIA no interviene la conversación, no aplica guiones, no la interrumpe y no la puntúa: **opera alrededor de ella, nunca dentro**.' },
  { id: 'dignidad', title: 'La dignidad de la persona manda sobre el dato', text: 'En coherencia con el PEI, **la información existe para acompañar**, *nunca para vigilar, juzgar ni sancionar*. Esa restricción define qué se almacena, quién accede y qué queda fuera del alcance analítico. El consentimiento informado es condición de existencia del proceso.' },
  { id: 'ruta', title: 'Escuchar sin ruta es escuchar a medias', text: '**Lo conversado debe poder conectarse con los recursos y rutas que la persona necesita**, dentro y fuera de la Universidad. Por eso **la realimentación es parte constitutiva del ciclo**.' },
  { id: 'herramienta', title: 'La herramienta no decide', text: '**El criterio profesional media siempre sobre lo que el sistema propone**. Y ninguna implementación es viable sin formar antes al equipo que la va a usar.' },
];

// ---------- Validación y madurez ----------

export const validation = {
  eyebrow: 'VALIDACIÓN Y MADUREZ',
  title: 'No es una idea en papel.',
  intro: 'Hay metodologías construidas, una malla agéntica ejecutada de punta a punta, una interfaz funcional, un modelo de costos y evidencia verificable.',
  built: [
    'Metodologías de escucha, comprensión y realimentación construidas.',
    'Malla agéntica ejecutada de punta a punta en Asesoría Psicopedagógica.',
    'Interfaz funcional.',
    'Modelo de costos estimado.',
    'Evidencia verificable con sus límites declarados.',
  ],
  nextTitle: 'Lo que sigue',
  next: 'No es inventar la solución: es validarla con cada dueño de proceso y habilitar las condiciones institucionales para que opere.',
  figuresTitle: 'Qué se corrió',
  scopeTitle: 'Alcance declarado de la validación',
  scope: [
    'Los audios procesados fueron sintéticos, generados por el equipo para no exponer a ninguna persona real.',
    'Dos sesiones corrieron de punta a punta desde el audio; cuarenta se replicaron en texto para probar la malla en un día de trabajo normal.',
    'La conexión en vivo con Microsoft Teams está diseñada, pero no desplegada.',
  ],
  scopeNote: 'Declaramos con precisión el alcance, porque el rigor es parte de la propuesta.',
  reuseTitle: 'Escalabilidad contada, no prometida',
  reuseText: 'Al diseñar las cinco mallas comprobamos cuánto de cada malla nueva se apoya en piezas ya construidas: orquestación, auditoría, persistencia, guardarraíles o protecciones.',
  reuseBands: [
    { label: 'Cada malla nueva', min: 42, max: 61, note: 'reutiliza piezas ya construidas' },
    { label: 'Casos cercanos al validado', min: 65, max: 85, note: 'reutilización proyectada' },
  ],
  reuseClose: 'Lo que se construye son las fichas temáticas propias del dominio, que es donde debe vivir el trabajo con el dueño del proceso.',
  flexTitle: 'La prueba de flexibilidad',
  flexText: 'La malla de Asesoría demuestra que el marco se puede llevar a operación. Las otras cuatro demuestran que se adapta a contextos distintos manteniendo los mismos principios.',
  flexWhy: 'No se ejecutaron por coherencia, no por falta de tiempo: prometer cómo escuchar a un público antes de que su dueño de proceso diga qué quiere escuchar, por qué canal y para qué, rompería uno de los principios de la propuesta.',
};

export const validationFigures: CaseFigure[] = [
  { value: '16', label: 'agentes', detail: '8 de escucha y 8 de realimentación' },
  { value: '5', label: 'roles metodológicos', detail: 'humanos, en la capa analítica' },
  { value: '42', label: 'sesiones simuladas', detail: '2 de punta a punta y 40 en texto' },
];

export const validationMeshes: { id: string; label: string; status: 'ejecutado' | 'disenado' }[] = [
  { id: 'asesoria', label: 'Estudiantes · Asesoría Psicopedagógica', status: 'ejecutado' },
  { id: 'graduados', label: 'Graduados', status: 'disenado' },
  { id: 'profesores', label: 'Profesores', status: 'disenado' },
  { id: 'administrativos', label: 'Administrativos', status: 'disenado' },
  { id: 'aliados', label: 'Aliados', status: 'disenado' },
];

/** Comparativo del proceso sin y con ResonancIA (diagramas de Archify). Cifras: `Archify/README.md`. */
export const processCompare = {
  title: 'El mismo encuentro, sin y con ResonancIA',
  lead: 'Dos recorridos de la misma sesión de asesoría. A la izquierda, la conversación no sobrevive a la sesión; a la derecha, ResonancIA ocupa el carril del sistema mientras la persona escucha. Pulsa Simular, o toca un bloque para saltar a ese paso.',
  before: { label: 'Hoy', title: 'Proceso actual' },
  after: { label: 'Con ResonancIA', title: 'Proceso con ResonancIA' },
  labels: { clock: 'Reloj del profesional', listening: 'Escucha real', retained: 'Conocimiento que sobrevive', idle: 'Pulsa Simular para recorrer el proceso paso a paso.' },
  summaryTitle: 'Al terminar el recorrido',
  summary: [
    { metric: 'Minutos del profesional', before: '33 (+15 inciertos)', after: '35' },
    { metric: 'De esos, escucha real', before: '20 min', after: '25 min' },
    { metric: 'Conocimiento que sobrevive', before: '5 %', after: '96 %' },
  ],
  note: 'Es una proyección del rediseño sobre un caso, no una medición de sesiones reales cronometradas: todavía no existe una línea base medida.',
};

export const processIndex = [
  { id: 'proc-proposito', label: 'Para qué existe' },
  { id: 'proc-etapas', label: 'Diez etapas' },
  { id: 'proc-principios', label: 'Principios' },
  { id: 'proc-comparar', label: 'Con y sin ResonancIA' },
  { id: 'proc-decisiones', label: 'Decisiones de diseño' },
];

/** Las diez etapas agrupadas en tres actos. */
export const processActs = [
  { id: 'antes', label: 'Antes', hint: 'Llegar y prepararse', stages: [1, 2, 3] },
  { id: 'durante', label: 'Durante', hint: 'La conversación y sus acuerdos', stages: [4, 5, 6, 7] },
  { id: 'despues', label: 'Después', hint: 'Cerrar y dar continuidad', stages: [8, 9, 10] },
];

/**
 * Etapas donde el comparativo muestra el cambio. La de Registro se lee del diagrama de Archify, donde diez de los
 * treinta minutos de la sesión son digitación.
 */
export const processStageMarks: Record<number, string> = {
  4: 'Aquí ResonancIA escucha alrededor, sin intervenir',
  9: 'Aquí se ahorra la digitación contra reloj',
};

/**
 * Escalera de madurez del caso. Cada etapa resume lo que la ficha y la Declaración de alcance dicen;
 * "falta" recoge los pasos que la propia Declaración deja como siguientes.
 */
export const maturity = {
  title: 'Dónde está el caso hoy',
  lead: 'Cinco etapas, de la idea a la operación. El caso de Asesoría llegó a la tercera; las dos últimas dependen de decisiones institucionales.',
  hereLabel: 'Aquí está el caso',
  nextLabel: 'Falta',
  stages: [
    { id: 'disenado', title: 'Diseñado', text: 'Metodologías de escucha, comprensión y realimentación construidas con el dueño del proceso.', state: 'done' as const },
    { id: 'construido', title: 'Construido', text: 'Una malla de 16 agentes, una interfaz funcional y un modelo de costos estimado.', state: 'done' as const },
    { id: 'ejecutado', title: 'Ejecutado de punta a punta', text: 'Dos sesiones corrieron completas desde audio sintético; cuarenta se replicaron en texto.', state: 'here' as const },
    { id: 'validado', title: 'Validado con personas reales', text: 'Un piloto con audio auténtico y consentimiento informado, junto a la revisión jurídica y de seguridad.', state: 'next' as const },
    { id: 'operacion', title: 'En operación', text: 'Gobernanza, financiación y sostenimiento definidos por la Universidad.', state: 'next' as const },
  ],
};

export const validationIndex = [
  { id: 'val-madurez', label: 'Dónde está hoy' },
  { id: 'val-corrido', label: 'Qué se corrió' },
  { id: 'val-alcance', label: 'Alcance declarado' },
  { id: 'val-escala', label: 'Escalabilidad' },
  { id: 'val-flex', label: 'Flexibilidad' },
];

export const summaryIndex = [
  { id: 'aplic-ciclo', label: 'El ciclo aplicado' },
  { id: 'aplic-cifras', label: 'En cifras' },
  { id: 'aplic-recorre', label: 'Recorre el caso' },
];

/** A qué pestaña lleva el panel de cada momento del ciclo aplicado. */
export const summaryMomentLinks: Record<string, { sub: string; label: string }> = {
  escuchar: { sub: 'malla', label: 'Ver la malla de agentes' },
  comprender: { sub: 'agentes', label: 'Ver los roles metodológicos' },
  realimentar: { sub: 'operacion', label: 'Ver el panel del profesional' },
};

/** Guía breve del panel del profesional: cómo recorrerlo y qué es real y qué es simulado. Fuente: `UI/INTERFAZ_RESONANCIA.md` (Estado y límites). */
export const operationsGuide = {
  stepsTitle: 'Cómo recorrerlo',
  steps: [
    { id: 'mira', title: 'Mira', text: 'Elige una persona de la lista y lee su contexto: lo expresado, lo observado y lo pendiente.' },
    { id: 'prueba', title: 'Prueba', text: 'Revisa un acuerdo o el borrador de mensaje y ajústalo. El sistema propone; tú decides.' },
    { id: 'observa', title: 'Observa', text: 'Marca el cierre simulado y mira cómo cambia el estado. Puedes restablecer todo cuando quieras.' },
  ],
  realTitle: 'Lo que es real en esta demostración',
  real: ['El diseño del espacio de trabajo y su regla central: el sistema propone, la persona responsable decide.', 'Los cambios se guardan en este navegador mientras la exploras.'],
  simulatedTitle: 'Lo que es simulado',
  simulated: ['Las personas y sus diálogos son de una simulación cercana a la realidad.', 'Los roles solo cambian la vista; no controlan accesos.', 'No se envía nada a Microsoft Teams ni se emite ningún certificado.'],
};

/** Verbos con que empieza cada propósito de `process.purpose`, en el mismo orden. */
export const purposeVerbs = ['Escuchar', 'Comprender', 'Identificar', 'Definir', 'Hacer seguimiento'];
export const purposeLead = 'La asesoría existe para…';
export const principlesRoofLabel = 'La idea que los sostiene';
