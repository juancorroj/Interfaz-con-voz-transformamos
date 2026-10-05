import type { PublicProfile } from '../types';

/**
 * Contenido de «Casos de uso por público». Fuentes: ficha técnica (Cómo se extiende a los demás
 * públicos), `Casos-de-uso/README.md`, `Casos-de-uso/MATRIZ_REUTILIZACION_AGENTES.md` (27 de
 * septiembre de 2026) y el contenido de cada carpeta `Casos-de-uso/<Público>/Agents`.
 */

export const publicsIntro = {
  eyebrow: 'CASOS DE USO POR PÚBLICO',
  title: 'Un mismo marco, cinco contextos.',
  /** El título partido en renglones; el último tramo va resaltado. */
  titleLines: ['Un mismo marco,'],
  titleAccent: 'cinco contextos.',
  lead: 'Estudiantes es el caso que se construyó y se ejecutó de punta a punta. Para graduados, aliados, profesores y administrativos se diseñaron las metodologías de escucha, comprensión y realimentación y las mallas de agentes correspondientes, pero no se ejecutaron.',
  principleTitle: 'No se ejecutaron por coherencia, no por falta de tiempo',
  principle: 'Prometer cómo vamos a escuchar a un público antes de que el dueño de ese proceso nos diga qué quiere escuchar, por qué canal y para qué, sería romper con al menos uno de los principios de la propuesta.',
  proof: 'Lo que sí demuestran estos cuatro diseños es que el marco produce resultados construibles en contextos distintos: esa es la prueba de flexibilidad. La malla de Asesoría muestra que el marco puede llevarse a operación; las otras cuatro, que se adapta manteniendo los mismos principios.',
};

export const inventoryNote = 'Inventario al 27 de septiembre de 2026: 87 especificaciones de agente en 5 públicos (47 de escucha y 40 de realimentación). La realimentación es la misma estructura de 8 agentes instanciada cinco veces.';

export const reuseTitle = 'Cuánto de cada malla nueva ya estaba construido';
export const reuseLead = 'Tomando la malla de Estudiantes como origen, entre el 42 % y el 61 % de cada malla nueva se apoya en piezas existentes (orquestación, auditoría, persistencia, guardarraíles). El resto son las fichas temáticas propias del dominio, que deben construirse con el dueño del proceso: no es deuda, es el diseño.';

export const codesignTitle = 'Qué se necesita del dueño del proceso';
export const codesignLead = 'Antes de ejecutar una malla hay un trabajo de co-diseño que no se puede acelerar ni delegar en la tecnología. Estas son las cinco preguntas que lo guían:';
export const codesignQuestions = [
  '¿Qué quiere escuchar?',
  '¿Por qué canal?',
  '¿Para qué decisión?',
  '¿Qué realimentación espera devolver?',
  '¿Cómo funciona el proceso actualmente?',
];

export const layerTitles = {
  exists: 'Qué existe',
  missing: 'Qué no existe todavía',
  needs: 'Qué se necesita del dueño del proceso',
};

export const exampleNote = 'Un ejemplo de simulación cercana a la realidad para explicar cómo funcionaría: las personas y las frases son simuladas, no se enviaron comunicaciones y los resultados no son mediciones reales.';

const notYetExecuted = [
  'Ejecución con personas reales ni conexión a los canales del proceso.',
  'Validación de qué se quiere escuchar, por qué canal y para qué decisión con el dueño del proceso.',
];

export const publics: PublicProfile[] = [
  {
    id: 'estudiantes', title: 'Estudiantes', status: 'ejecutado',
    unit: 'Dirección Central de Estudiantes · Asesoría Psicopedagógica',
    focus: 'Comprensión integral de barreras académicas y personales, orientación psicopedagógica y permanencia con autonomía.',
    agents: { listening: 8, feedback: 8 },
    thematic: ['Cognitivo-académica', 'Plan de trabajo y ética', 'Socio-vocacional y becas'],
    reusePct: null,
    exists: [
      'Metodologías de escucha, comprensión y realimentación aplicadas al proceso.',
      'Una malla de 16 agentes ejecutada de punta a punta: 2 sesiones desde audio sintético y 40 replicadas en texto.',
      'Una interfaz funcional con un caso demostrativo y un borrador de consentimiento informado.',
    ],
    missing: [
      'Conversaciones con personas reales: todo se probó con datos sintéticos.',
      'La conexión en vivo con Microsoft Teams: está diseñada, no desplegada.',
      'La aprobación del mecanismo de consentimiento y de la política de retención por las instancias de la Universidad.',
    ],
    sourcePath: 'Casos-de-uso/Asesoria-Psicopedagogica/',
  },
  {
    id: 'graduados', title: 'Graduados', status: 'disenado',
    unit: 'Dirección de Alumni Sabana', impact: { value: 39399, unit: 'graduados' },
    focus: 'Relacionamiento vitalicio, identificación de necesidades de formación continua, transferencia de señales laborales a los comités de currículo y articulación con Sabana Hub.',
    agents: { listening: 11, feedback: 8 },
    thematic: ['Orgullo y valores', 'Compromisos de doble vía', 'Ecosistema y emprendimiento', 'Aprendizaje a lo largo de la vida', 'Networking y comunidad', 'Pertinencia curricular', 'Temas sensibles y mediación'],
    reusePct: 42,
    exists: [
      'El modelo del proceso documentado, con su unidad dueña.',
      'Metodologías de escucha, priorización y realimentación diseñadas para este público.',
      'Una malla de 19 agentes especificados, incluido el verificador de cita textual.',
    ],
    missing: notYetExecuted,
    sourcePath: 'Casos-de-uso/Graduados/',
  },
  {
    id: 'profesores', title: 'Profesores', status: 'disenado',
    unit: 'Dirección de Desarrollo Profesoral', impact: { value: 1956, unit: 'profesores', note: 'Planta y cátedra' },
    focus: 'Cuidado formativo e integral, monitoreo preventivo y no punitivo de la sobrecarga, y enriquecimiento del Plan de Formación Docente según necesidades reales.',
    agents: { listening: 9, feedback: 8 },
    thematic: ['Acuerdos', 'Cargas y agotamiento', 'Clima y vocación', 'Ética y no punitividad', 'Investigación y producción', 'Pedagogía e innovación'],
    reusePct: 59,
    exists: [
      'El modelo del proceso documentado, con su unidad dueña.',
      'Metodologías de escucha, priorización y realimentación diseñadas para este público.',
      'Una malla de 17 agentes especificados, con una ficha dedicada a la ética y la no punitividad.',
      'Un caso de formación docente documentado como ejercicio de simulación de priorización. Esta web lo usa solo como inspiración y no traslada sus cifras.',
    ],
    missing: [
      ...notYetExecuted,
      'El verificador de cita textual: su malla de escucha todavía no lo incluye. Está identificado como pendiente de instanciar a partir del de Asesoría.',
    ],
    sourcePath: 'Casos-de-uso/Profesores/',
  },
  {
    id: 'administrativos', title: 'Administrativos', status: 'disenado',
    unit: 'Dirección de Desarrollo Humano', impact: { value: 1270, unit: 'colaboradores' },
    focus: 'Acompañamiento a colaboradores, optimización de inercias operativas con apoyo de tecnologías inteligentes, amortiguación de picos estacionales y despliegue del catálogo de beneficios.',
    agents: { listening: 10, feedback: 8 },
    thematic: ['Bienestar y movilidad', 'Carrera y formación', 'Clima y liderazgo', 'Compromisos de doble vía', 'Procesos e inercias', 'Seguridad psicológica'],
    reusePct: 61,
    exists: [
      'El modelo del proceso documentado, con su unidad dueña.',
      'Metodologías de escucha, priorización y realimentación diseñadas para este público.',
      'Una malla de 18 agentes especificados, con un conciliador de percepciones.',
    ],
    missing: [
      ...notYetExecuted,
      'El verificador de cita textual: su malla de escucha todavía no lo incluye. Está identificado como pendiente de instanciar a partir del de Asesoría.',
    ],
    sourcePath: 'Casos-de-uso/Administrativos/',
  },
  {
    id: 'aliados', title: 'Aliados', status: 'disenado',
    unit: 'Dirección de Proyección Social y Engagement · UniSabana Hub',
    focus: 'Relacionamiento con organizaciones y empresas aliadas, escucha a tutores técnicos y líderes de talento, detección de brechas de perfiles especializados y co-diseño de retos de innovación.',
    agents: { listening: 9, feedback: 8 },
    thematic: ['Brechas curriculares', 'Demanda de perfiles in-company', 'Fortalezas del talento', 'Retos de innovación'],
    reusePct: 47,
    exists: [
      'El modelo del proceso documentado, con su unidad dueña.',
      'Metodologías de escucha, priorización y realimentación diseñadas para este público.',
      'Una malla de 17 agentes especificados, con un centinela de salvaguarda propio de las relaciones con terceros y el verificador de cita textual.',
    ],
    missing: notYetExecuted,
    sourcePath: 'Casos-de-uso/Aliados/',
  },
];

/** Cómo se presenta el impacto potencial. Fuente de las cifras: modelo del proceso de cada público (`Casos-de-uso/README.md`). */
export const impactCopy = {
  label: 'Impacto potencial',
  caveat: 'Es la población que hoy compone este público según el modelo del proceso: indica a cuántas personas podría llegar la propuesta. No promete cobertura, adopción ni resultados.',
  totalLead: 'Sumando los públicos que cuentan con cifra, la propuesta podría llegar a',
  totalNote: 'Estudiantes y aliados todavía no tienen una cifra en el modelo del proceso.',
};
