import type { ChainStep, MomentDetail } from '../types';

/** Contenido de «La solución». Fuente: ficha técnica · Descripción (¿Cómo funciona?, La frontera: co-inteligencia). */

export const solutionIntro = {
  eyebrow: 'LA SOLUCIÓN',
  title: 'Una capa que escucha, estructura, comprende y devuelve.',
  /** El título partido en renglones; la última palabra va resaltada. */
  titleLines: ['Una capa que escucha,', 'estructura, comprende'],
  titleTail: 'y ',
  titleAccent: 'devuelve.',
  lead: 'ResonancIA convierte las conversaciones que ya ocurren en la Universidad en información útil para acompañar mejor a las personas, fortalecer la toma de decisiones y construir memoria institucional.',
};

export const solutionIndex = [
  { id: 'premisa', label: 'La premisa' },
  { id: 'ciclo', label: 'Tres momentos y ciclo' },
  { id: 'decisiones', label: 'Decisiones de diseño' },
  { id: 'cointeligencia', label: 'Co-inteligencia' },
  { id: 'evolucion', label: 'Un marco que evoluciona' },
];

export const premise = {
  title: 'No abrir canales nuevos: potenciar los existentes.',
  paragraphs: [
    'Estudiantes, graduados, profesores, administrativos y aliados ya conversan con la Universidad: en asesorías, entrevistas, reuniones, comités y espacios de acompañamiento. En esas conversaciones se genera conocimiento muy valioso que hoy puede quedar disperso, depender del registro manual o perder trazabilidad. Y cuando la persona que atendió cambia de rol, ese conocimiento se va con ella.',
    'ResonancIA no agrega un canal más ni una encuesta más. Toma los puntos de contacto que ya existen y les añade una capa que escucha, estructura, comprende y devuelve.',
    'Esa capa se apoya en un marco metodológico flexible, en una malla de agentes de inteligencia artificial y en capacidades analíticas institucionales.',
  ],
};

/** Piezas del diagrama de la premisa; el icono de cada una lo pone la página. */
export const premiseDiagram = {
  notNew: ['Un canal más', 'Una encuesta más'],
  layerName: 'ResonancIA · una capa, no un canal',
  verbs: [{ id: 'escucha', label: 'Escucha' }, { id: 'estructura', label: 'Estructura' }, { id: 'comprende', label: 'Comprende' }, { id: 'devuelve', label: 'Devuelve' }],
  contactTitle: 'Los puntos de contacto que ya existen',
  contacts: [{ id: 'asesorias', label: 'Asesorías' }, { id: 'entrevistas', label: 'Entrevistas' }, { id: 'reuniones', label: 'Reuniones' }, { id: 'comites', label: 'Comités' }, { id: 'acompanamiento', label: 'Espacios de acompañamiento' }],
  peopleTitle: 'Las personas que ya conversan con la Universidad',
  people: [{ id: 'estudiantes', label: 'Estudiantes' }, { id: 'graduados', label: 'Graduados' }, { id: 'profesores', label: 'Profesores' }, { id: 'administrativos', label: 'Administrativos' }, { id: 'aliados', label: 'Aliados' }],
  /** Otros públicos que también conversan con la Universidad; se muestran aparte para dar idea del alcance. */
  morePeople: [{ id: 'padres', label: 'Padres de familia' }, { id: 'externos', label: 'Externos' }, { id: 'familiares', label: 'Familiares de administrativos y profesores' }],
  cardLabels: ['Lo que ya ocurre', 'Lo que agrega ResonancIA', 'En qué se apoya'],
};

export const momentsTitle = 'Tres momentos';

/** Los tres momentos y el ciclo, juntos en una sola pieza interactiva. */
export const momentsCycle = {
  title: 'Tres momentos, un ciclo que se cierra',
  hint: 'Elige un momento del ciclo para ver cómo funciona.',
  next: 'Siguiente momento',
  restart: 'Y vuelve a escuchar',
};
export const moments: MomentDetail[] = [
  {
    id: 'escuchar',
    title: 'Escuchar',
    framework: {
      intro: 'Existe un marco metodológico construido para la escucha.',
      steps: [
        { label: 'Se define', text: 'Se itera con el dueño del proceso para definir cómo será el proceso de escucha. Desde ahí ResonancIA revisa cómo lo hará.' },
        { label: 'Se diseña', text: 'La malla de agentes que se activará, a la medida del proceso.' },
        { label: 'Sale', text: 'La estructura de datos lista, articulada con el siguiente momento.' },
      ],
    },
    summary: 'Según el contexto se activan agentes que procesan voz, texto o transcripciones y estructuran la información según lo que el dueño del proceso definió que necesita conocer.',
    listTitle: 'Escenarios que reconoce el marco',
    points: ['Expresiones individuales.', 'Conversaciones uno a uno.', 'Conversaciones con múltiples participantes.'],
    note: 'La conversación no cambia: sigue siendo humana, cálida y sin guiones rígidos. Lo que cambia es que deja de depender de que alguien alcance a escribirla y recuerde todos los detalles.',
    actor: 'Agentes de IA, a la medida de cada proceso.',
    guarantee: 'Un verificador interno independiente exige que todo hallazgo esté respaldado por una cita textual de la conversación: lo que no se puede sustentar, no pasa.',
  },
  {
    id: 'comprender',
    title: 'Comprender',
    framework: {
      intro: 'También es un marco metodológico, y toma como entrada la salida de Escuchar.',
      steps: [
        { label: 'Entra', text: 'La estructura de datos que dejó Escuchar.' },
        { label: 'Se diseña', text: '**Analytics as a Service**, en función del proceso.' },
        { label: 'Sale', text: 'Claridad sobre qué analíticas construir, qué automatizaciones, cómo se consumen los datos y cuáles son sus salidas.' },
      ],
    },
    summary: 'La información estructurada alimenta capacidades analíticas que convierten la escucha en conocimiento para decidir. Esta etapa es deliberadamente humana.',
    listTitle: 'Cómo opera',
    points: [
      'La interpretación la hacen los equipos de analítica institucional y el dueño del proceso, no la IA.',
      'Un mecanismo de priorización ordena los hallazgos por relevancia y esfuerzo.',
      'Analítica como Servicio (Analytics as a Service): diseñada en función de la necesidad concreta del proceso.',
    ],
    actor: 'Personas: los equipos de analítica y el dueño del proceso.',
    guarantee: 'Es una decisión de diseño, no una limitación técnica: evita que un sesgo algorítmico se convierta en un juicio sobre una persona.',
  },
  {
    id: 'realimentar',
    title: 'Realimentar',
    framework: {
      intro: 'También es un marco metodológico, y usa como entrada lo que se comprendió.',
      steps: [
        { label: 'Entra', text: 'Lo que se ha comprendido.' },
        { label: 'Se define', text: 'El dueño del proceso determina las formas de realimentación: no es solo una.' },
        { label: 'Se construye', text: 'La malla agéntica respectiva y los procesos listos para cada forma de realimentación.' },
        { label: 'Cierra el ciclo', text: 'Se asegura que el ciclo se cierre y vuelva a escuchar.' },
      ],
    },
    summary: 'Los hallazgos vuelven al proceso convertidos en acción. Según el caso se activan algunos de estos mecanismos.',
    listTitle: 'Mecanismos de realimentación',
    points: ['Un seguimiento profesional.', 'Un mensaje preparado para revisión.', 'Una recomendación de recurso institucional.', 'Acceso a información analítica.'],
    actor: 'El sistema propone; la persona responsable revisa, ajusta y decide.',
    guarantee: 'No todas las realimentaciones son iguales y ninguna se ejecuta sin decisión profesional.',
  },
];

export const cycle = {
  title: 'El ciclo que se cierra',
  text: 'Escucho, estructuro y comprendo, decido y realimento, y vuelvo a escuchar. Ese ciclo, que se alimenta de sí mismo, es lo que llamamos memoria institucional activa.',
  center: 'Memoria institucional activa',
};

export const decisions = {
  title: 'Cuatro decisiones de diseño',
  intro: '**No empezamos por construir la tecnología**. Nos sentamos con quienes llevan el proceso de Asesoría Psicopedagógica, y **lo que aprendimos se convirtió en arquitectura**.',
};

export const coIntelligence = {
  title: 'La frontera: co-inteligencia',
  lead: '**El propósito no es reemplazar al profesional**, ni alterar la esencia de los procesos. **Es aumentar su capacidad**.',
  chain: [
    { id: 'ia', actor: 'La IA', action: 'extrae y organiza', human: false },
    { id: 'marco', actor: 'El marco metodológico', action: 'estructura', human: false },
    { id: 'persona', actor: 'La persona', action: 'interpreta y decide', human: true },
    { id: 'institucion', actor: 'La institución', action: 'actúa y aprende', human: true },
  ] satisfies ChainStep[],
  groups: { machine: 'La tecnología prepara', human: 'Las personas interpretan, deciden y actúan' },
  frontier: 'Aquí entra el criterio humano',
  benefit: 'El profesional puede dedicar a la escucha un tiempo que hoy dedica al registro, y recibe mejor contexto para decidir.',
  limit: '**La información nunca se usa para vigilar, juzgar, perfilar ni sancionar.** Por eso el acceso por roles, la anonimización para tratamientos analíticos y el resguardo del secreto profesional son premisas desde el principio.',
  safeguards: ['Acceso por roles', 'Anonimización para el análisis', 'Secreto profesional'],
};

export const evolution = {
  title: 'Un marco que no se vuelve rígido',
  text: 'Opera bajo el ciclo de las 3E y se apoya en el marco de Algorithmic Business Thinking (ABT), que adoptamos como método de construcción. Así el modelo incorpora nuevas dimensiones de escucha cuando la Universidad las necesite, sin rehacerlo.',
  steps: [
    { id: 'explorar', title: 'Explorar', text: 'Se revisa cómo se puede activar ResonancIA en las diferentes dimensiones de escucha, alrededor del proceso existente. El proceso no queda rígido: puede recibir nuevas formas de escucha o complementar lo existente en los agentes diseñados.' },
    { id: 'experimentar', title: 'Experimentar', text: 'Una vez implementado ResonancIA se puede evaluar si el proceso de escucha es el adecuado, si las analíticas son las adecuadas y si el proceso de realimentación es el adecuado.' },
    { id: 'evolucionar', title: 'Evolucionar', text: 'Los procesos de escucha, comprensión y realimentación pueden ir evolucionando conforme surgen nuevas necesidades y dinámicas institucionales, y se adquiere conocimiento en cada uno.' },
  ],
  center: 'Un marco que evoluciona',
  close: 'Modular, escalable y sostenible en el tiempo.',
  traits: ['Modular', 'Escalable', 'Sostenible en el tiempo'],
  loopLabel: 'Y se repite: cada vuelta puede sumar una nueva dimensión de escucha, con analítica y realimentación',
  modular: {
    title: 'Un marco modular: cada vuelta se conecta con la anterior',
    triad: ['Escucho', 'Comprendo', 'Realimento'],
    turns: [
      { label: 'Vuelta 1', note: 'El marco inicial' },
      { label: 'Vuelta 2', note: 'Suma una nueva dimensión de escucha' },
      { label: 'Vuelta 3', note: 'Suma otra, con su analítica y su realimentación' },
    ],
    note: 'Se incorpora cuando la Universidad lo necesite, sin rehacer lo que ya existe.',
  },
  next: 'Siguiente',
  restart: 'Y vuelve a explorar',
};
