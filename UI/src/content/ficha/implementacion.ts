import type { ImplementationPhase, TitledText } from '../types';

/** Contenido de «Implementación». Fuente: ficha técnica · Implementación (plan, tiempos, condiciones y medición). */

export const implIntro = {
  eyebrow: 'IMPLEMENTACIÓN',
  title: 'Un plan por compuertas, con la decisión en manos de la Universidad.',
  /** El título partido en renglones; el último tramo va resaltado. */
  titleLines: ['Un plan por compuertas,', 'con la decisión en manos'],
  titleAccent: 'de la Universidad.',
  lead: 'Lo que sigue no es inventar la solución: es validarla con cada dueño de proceso y habilitar las condiciones institucionales para que opere. Cada fase termina en una decisión, así el riesgo se acota a lo autorizado.',
};

export const implIndex = [
  { id: 'punto-de-partida', label: 'Punto de partida' },
  { id: 'fases', label: 'Las fases' },
  { id: 'tiempos', label: 'Tiempos' },
  { id: 'medicion', label: 'Qué se mide' },
  { id: 'responsabilidad', label: 'Quién responde' },
  { id: 'orden', label: 'Por dónde empezar' },
  { id: 'condiciones', label: 'Qué puede alterar el plan' },
];

export const startingPoint = {
  title: 'Fase 0 · El punto de partida',
  builtTitle: 'Del lado del diseño y la construcción hay camino recorrido',
  built: [
    'El marco metodológico en sus tres momentos, aplicado al diseño en diversos casos.',
    'La malla agéntica de Asesoría Psicopedagógica, ejecutada de punta a punta.',
    'Las metodologías y mallas diseñadas para los otros cuatro públicos.',
    'La interfaz funcional y el modelo de costos estimado.',
    'La evidencia verificable, con sus límites declarados.',
  ],
  pendingTitle: 'Del lado de la puesta en operación queda el trabajo más delicado',
  pending: [
    'Acordar el gobierno de la información.',
    'Definir dónde conviene empezar.',
    'Validar la propuesta con cada dueño de proceso.',
    'Formar a los equipos.',
    'Acompañar el paso de un entorno simulado a conversaciones reales con personas.',
  ],
  close: 'Nada de eso es un trámite y nada de eso puede resolverlo el equipo por su cuenta: requiere trabajo conjunto con las unidades, con Tecnologías de Información, con Desarrollo Estratégico y con las instancias de gobierno de la Universidad.',
};

export const phasesTitle = 'Las cinco fases';
export const phases: ImplementationPhase[] = [
  { id: 1, name: 'Habilitación institucional', duration: '4 a 6 semanas', focus: 'Fase de decisiones.',
    question: '¿Están definidas las prioridades y dadas las condiciones para operar con información real?',
    actions: [
      'Definir qué unidades y qué canales de escucha prioriza la Universidad, y en qué orden.',
      'Priorizar la escucha como objetivo dentro de la unidad seleccionada, con recursos y responsable asignados.',
      'Activar la participación del equipo institucional de Inteligencia Artificial y del equipo de Analítica.',
      'Acordar con la Dirección de Tecnologías y Transformación Digital el tratamiento, la arquitectura, el almacenamiento, la seguridad, el gobierno de la información, el esquema de permisos por roles y los criterios de anonimización.',
      'Obtener los avales éticos y jurídicos correspondientes y aprobar el mecanismo de consentimiento informado.',
    ] },
  { id: 2, name: 'Puesta en marcha del caso validado', duration: '8 a 12 semanas', focus: 'Implementación de Asesoría Psicopedagógica.',
    question: '¿El ciclo completo funciona con personas reales y el equipo profesional lo encuentra útil?',
    actions: [
      'Formar al equipo profesional que va a usar la herramienta: es un paso habilitador y uno de los principios del dueño del proceso, por lo que se aborda desde el inicio.',
      'Incorporar el consentimiento informado a la práctica cotidiana del proceso.',
      'Completar las integraciones pendientes con el entorno institucional, en particular la conexión en vivo con Microsoft Teams.',
      'Conectar la escucha con la estructura de datos institucional y desplegar los componentes analíticos definidos.',
      'Operar de forma acompañada: los primeros ciclos se ejecutan con supervisión conjunta del equipo profesional y del equipo técnico.',
    ] },
  { id: 3, name: 'Medición y ajuste', duration: 'Un semestre académico', focus: 'Inicia en paralelo con la Fase 2.',
    question: '¿Los resultados justifican extender el modelo a un segundo proceso?',
    actions: [
      'Tomar la línea base antes de empezar.',
      'Medir los cinco indicadores comprometidos.',
      'Aprender con el ciclo 3E: explorar los vacíos detectados, experimentar ajustes acotados y evolucionar los que demuestran funcionar.',
    ],
    note: 'Los beneficios que dependen de la operación no se prometieron como cifra, se prometieron medidos. Ajustar dimensiones, criterios o formas de realimentación en esta fase no implica rehacer la malla.' },
  { id: 4, name: 'Extensión a un segundo público', duration: '8 a 10 semanas', focus: 'Menor que la Fase 2, porque entre el 42 % y el 61 % de la malla ya existe.',
    question: '¿El marco se sostuvo en un contexto distinto al que lo originó?',
    actions: [
      'Seleccionar el siguiente público junto con su dueño de proceso.',
      'Co-diseñar con él: ¿qué quiere escuchar?, ¿por qué canal?, ¿para qué decisión?, ¿qué realimentación espera devolver? y ¿cómo funciona el proceso actualmente? Este es el trabajo que no se puede acelerar ni delegar en la tecnología.',
      'Instanciar la malla reutilizando los componentes estructurales y construyendo únicamente las fichas temáticas propias del dominio.',
      'Repetir el ciclo de medición con los indicadores equivalentes.',
    ] },
  { id: 5, name: 'Escalamiento gradual', duration: 'Progresiva, según la disponibilidad de cada unidad', focus: 'Extender o vincular nuevos públicos aplicando la metodología.',
    actions: [
      'Extensión ordenada a estudiantes en otros procesos, graduados, profesores, administrativos, aliados y a nuevos escenarios de escucha que las propias unidades identifiquen.',
    ],
    note: 'El escalamiento no se calendariza de forma centralizada: avanza al ritmo en que cada dueño de proceso esté listo para definir qué quiere escuchar, qué información necesita y cómo realimentará el proceso.' },
];

export const timesTitle = 'Cuánto tomaría';
export const schedule = [
  { phase: '1. Habilitación institucional', duration: '4–6 semanas', milestone: 'Condiciones dadas para operar con información real' },
  { phase: '2. Puesta en marcha', duration: '8–12 semanas', milestone: 'Ciclo completo operando en Asesoría Psicopedagógica' },
  { phase: '3. Medición y ajuste', duration: '1 semestre académico', milestone: 'Evidencia de resultados en operación' },
  { phase: '4. Segundo público', duration: '8–10 semanas', milestone: 'Marco validado en un contexto distinto' },
  { phase: '5. Escalamiento', duration: 'Progresivo', milestone: 'Capacidad institucional instalada' },
];
export const keyMilestones = [
  { label: 'Primera operación real', value: '4 a 5 meses', detail: 'desde la decisión de habilitación' },
  { label: 'Primer ciclo completo con resultados medidos', value: '1 semestre', detail: 'académico' },
];
/**
 * Escala aproximada del Gantt, en semanas desde la decisión de habilitación. Los rangos salen de `schedule`; el inicio de
 * cada fase es una lectura del orden de la ficha (la Fase 3 arranca en paralelo con la 2; "un semestre" se dibuja de 16 semanas).
 */
export const gantt = {
  weeks: 52,
  axis: [0, 13, 26, 39, 52].map((week, i) => ({ week, label: i === 0 ? 'Decisión' : `Mes ${i * 3}` })),
  rows: [
    { id: 1, label: 'Habilitación institucional', start: 0, min: 4, max: 6, text: '4 a 6 semanas' },
    { id: 2, label: 'Puesta en marcha', start: 6, min: 8, max: 12, text: '8 a 12 semanas' },
    { id: 3, label: 'Medición y ajuste', start: 6, min: 16, text: 'Un semestre académico' },
    { id: 4, label: 'Segundo público', start: 22, min: 8, max: 10, text: '8 a 10 semanas' },
    { id: 5, label: 'Escalamiento', start: 32, min: 20, text: 'Progresivo', open: true },
  ],
  milestones: [
    { label: 'Primera operación real', from: 17, to: 22, detail: '4 a 5 meses desde la decisión de habilitación' },
    { label: 'Primer ciclo con resultados medidos', from: 22, to: 22.6, detail: 'un semestre académico' },
  ],
  rangeLabel: 'tramo que puede variar',
  note: 'Escala aproximada, a modo de ilustración: el dato exacto es el texto de cada barra. El tramo punteado es lo que puede variar dentro del rango.',
};

export const precisionsTitle = 'Tres precisiones sobre estos tiempos';
export const precisions: TitledText[] = [
  { id: 'dedicacion', title: 'Suponen dedicación efectiva', text: 'Corresponden a un equipo trabajando con foco en esta iniciativa. Si las personas asignadas atienden en paralelo otras prioridades, una fase de ocho semanas puede tomar dieciséis sin que nada haya salido mal. Es la condición que más influye sobre el cronograma real.' },
  { id: 'fase1', title: 'Dependen del cierre de la Fase 1', text: 'Si una definición de prioridad o un acuerdo de gobierno de la información toma más de lo previsto, todo lo demás se desplaza en la misma medida.' },
  { id: 'calendario', title: 'Deben alinearse con el calendario académico', text: 'Un piloto en acompañamiento estudiantil solo tiene sentido si cubre un periodo completo, con sus momentos de matrícula, parciales y cierre.' },
];

export const measures = {
  title: 'Qué se mide y cómo',
  lead: 'Esta fase salda un compromiso explícito: los beneficios que dependen de la operación se prometieron medidos. Para eso se toma la línea base antes de empezar.',
  rows: [
    { what: 'Tiempo que el profesional dedica a registro frente a escucha', how: 'Medición antes y después, sobre el mismo tipo de sesión' },
    { what: 'Continuidad del acompañamiento', how: 'Proporción de casos que se retoman con contexto previo disponible' },
    { what: 'Pertinencia de la realimentación', how: 'Tasa de propuestas que el profesional aprueba, ajusta o descarta' },
    { what: 'Percepción de quien fue escuchado', how: 'Instrumento breve al cierre del ciclo, no una encuesta adicional' },
    { what: 'Fiabilidad del sistema', how: 'Proporción de hallazgos rechazados por falta de respaldo textual' },
  ],
};

export const responsibility = {
  title: 'Quién responde por qué',
  lead: 'ResonancIA no requiere crear una figura nueva ni una unidad propia: la responsabilidad se distribuye entre roles que ya existen. Definir formalmente el gobierno es ordenar responsabilidades existentes, no inventar una estructura paralela.',
  roles: [
    { id: 'ia', title: 'Equipo de Inteligencia Artificial', text: 'Responde por los agentes: su responsabilidad es técnica.' },
    { id: 'analitica', title: 'Equipo de Analítica institucional', text: 'Responde por las capacidades analíticas.' },
    { id: 'dueno', title: 'El dueño de cada proceso', text: 'Responde por qué se escucha, para qué se usa esa información y qué realimentación se devuelve.' },
  ] satisfies TitledText[],
};

export const order = {
  title: 'Por dónde empezar: una sugerencia, no una decisión',
  text: 'Escogimos Asesoría Psicopedagógica como caso de construcción por su exigencia técnica y ética, y porque es donde un primer piloto real tendría hoy el menor costo de arranque. Pero la priorización estratégica no le corresponde al equipo: puede convenir empezar por aliados, por graduados o por otro frente.',
  recommendation: 'La recomendación es avanzar de dentro hacia afuera.',
  steps: [
    { id: 'estudiantes', title: 'Estudiantes', text: 'En momentos como la entrevista, los servicios de bienestar y las asesorías.' },
    { id: 'internos', title: 'Profesores y administrativos', text: 'El corazón de la vida universitaria.' },
    { id: 'externos', title: 'Graduados y aliados', text: 'Hacia afuera, y de ahí a otros públicos.' },
  ] satisfies TitledText[],
  close: 'El marco no obliga a elegir un único frente: una vez instalada la capacidad, distintos procesos pueden avanzar en paralelo.',
};

export const conditions = {
  title: 'Condiciones que pueden alterar el plan',
  lead: 'Declaramos las que hoy identificamos, porque un plan que no reconoce sus dependencias no es un plan.',
  items: [
    { id: 'presupuesto', affects: [1, 2, 3, 4, 5], control: 'Fuera del equipo', title: 'Aprobación presupuestal y asignación efectiva de recursos', text:'Es la dependencia más determinante del cronograma y la que menos gobierna el equipo: condiciona la fecha de arranque y el ritmo posterior, porque de ella depende que las personas tengan horas realmente asignadas y no solo la tarea encomendada.' },
    { id: 'equipo', affects: [2], control: 'Se gestiona en parte', title: 'Disponibilidad real del equipo profesional', text: 'La formación y el acompañamiento inicial compiten con la operación cotidiana de un área que ya está al límite. Sin holgura, la Fase 2 se extiende.' },
    { id: 'arquitectura', affects: [1], control: 'Fuera del equipo', title: 'Definiciones de arquitectura institucional', text: 'Exceden al equipo: el esquema de identidad, la federación de fuentes de datos externas, la seguridad y el gobierno.' },
    { id: 'duenos', affects: [4], control: 'Se gestiona en parte', title: 'Disponibilidad de los dueños y responsables de proceso', text: 'Para el trabajo de co-diseño de la Fase 4. Es el insumo que no tiene sustituto técnico.' },
    { id: 'calendario', affects: [2, 3], control: 'Fuera del equipo', title: 'Ritmo del calendario académico', text: 'Abre y cierra ventanas de implementación.' },
  ] satisfies (TitledText & { affects: number[]; control: string })[],
  affectsLabel: 'Fases que toca',
};

export const gates = { label: 'Compuerta', question: 'la Universidad decide', last: 'Cada unidad decide cuándo y cómo se suma, según su disponibilidad.' };
