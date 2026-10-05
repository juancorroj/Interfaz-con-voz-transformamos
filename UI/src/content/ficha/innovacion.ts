import type { Alternative, InnovationItem } from '../types';

/** Contenido de «Lo que nos hace distintos». Fuente: ficha técnica · ¿Por qué es innovadora esta solución? y ¿Por qué se diferencia de otras soluciones? */

export const distinctIntro = {
  eyebrow: 'LO QUE NOS HACE DISTINTOS',
  title: 'El diferencial no es la IA: es dónde se detiene.',
  /** El título partido en renglones; el último tramo va resaltado. */
  titleLines: ['El diferencial', 'no es la IA: es'],
  titleAccent: 'dónde se detiene.',
  lead: 'El uso de la inteligencia artificial no es el factor diferencial de la propuesta. **Lo que distingue es dónde se pone y, sobre todo, dónde se decide no ponerla**.',
  thesis: 'La mayoría de las soluciones de escucha apoyadas en IA se diferencian por cuánta inteligencia artificial incorporan. **ResonancIA se diferencia por el lugar exacto donde la detiene**: la IA acompaña la escucha y organiza la información, pero no genera analítica, la IA puede proponer la realimentación, pero no tiene la última palabra. Esa frontera no es una limitación técnica que esperemos superar, es la decisión de diseño que hace confiable al resto del sistema.',
};

/** La tesis en una imagen: dónde trabaja la IA y dónde se detiene. */
export const boundary = {
  title: 'Dónde se detiene la IA',
  groups: ['La IA trabaja', 'Las personas comprenden', 'La IA propone, la persona decide'],
  frontier: 'Aquí la IA se detiene',
  gate: 'Y antes de salir de Escuchar, un verificador independiente exige una cita textual para cada hallazgo: lo que no se puede sustentar, no pasa.',
  stages: [
    { id: 'escuchar', label: 'Escuchar', actor: 'Agentes de IA', note: 'Extraen y estructuran lo conversado.', ai: 'works' as const },
    { id: 'comprender', label: 'Comprender', actor: 'Analítica institucional y dueño del proceso', note: 'Interpretan: es deliberadamente humano.', ai: 'stops' as const },
    { id: 'realimentar', label: 'Realimentar', actor: 'El sistema propone', note: 'La persona responsable revisa, ajusta y decide.', ai: 'proposes' as const },
  ],
};

export const elementsTitle = 'Seis elementos de innovación';
export const usualLabel = 'Lo habitual';
export const resonanciaLabel = 'ResonancIA';

export const innovationItems: InnovationItem[] = [
  {
    id: 1,
    title: 'La IA se detiene antes de interpretar',
    usual: 'Poner el modelo a analizar, clasificar y recomendar, porque es donde la tecnología luce más y cuesta menos.',
    resonancia: 'La comprensión es deliberadamente humana, con los equipos de analítica institucional y el dueño del proceso. Un modelo puede reproducir un sesgo a escala y con apariencia de objetividad; una persona responsable puede ser cuestionada, explicar su criterio y cambiarlo. Renunciamos a la automatización donde más fácil habría sido aplicarla, porque ahí un error deja de ser técnico y se convierte en un juicio sobre alguien.',
  },
  {
    id: 2,
    title: 'Nada pasa sin respaldo textual',
    usual: 'Los sistemas conversacionales producen resúmenes que suenan bien y se leen convincentes, pero que algo suene bien no significa que se pueda comprobar.',
    resonancia: 'Un verificador agéntico independiente exige que todo hallazgo esté sustentado en una cita textual de la conversación. Lo que no se puede sustentar se descarta antes de llegar a la base de datos. No es un filtro añadido al final: es un agente con la única función de negarse a dejar pasar lo que no se puede probar.',
  },
  {
    id: 3,
    title: 'La escucha se instala sobre lo que ya existe',
    usual: 'Crear un canal nuevo, una encuesta nueva, una aplicación más. Cada canal compite por la misma atención y produce fatiga: la respuesta cae y, con ella, la calidad de lo que se escucha.',
    resonancia: 'Se instala sobre las conversaciones que ya ocurren. Lo difícil no es técnico: es lograr que el proceso no cambie. Por eso el diseño se construyó a partir de lo que el dueño del proceso declaró intocable, y no al revés.',
  },
  {
    id: 4,
    title: 'La memoria es reinterpretable, no solo consultable',
    usual: 'Un sistema de registro guarda lo que sus campos previeron. Lo que no se pensó en su momento, se perdió para siempre.',
    resonancia: 'Como la conversación queda estructurada y trazable hasta su origen, se puede leer información pasada a través de dimensiones que no existían cuando ocurrió. Si en dos años la Universidad necesita entender un fenómeno que hoy nadie mide, puede volver sobre lo ya escuchado y anonimizado. Eso diferencia una memoria activa de un archivo.',
  },
  {
    id: 5,
    title: 'La escalabilidad está contada, no prometida',
    usual: 'Afirmar que una solución «es escalable a otros casos».',
    resonancia: 'Lo medimos pieza por pieza: entre el 42 % y el 61 % de cada malla nueva se apoya en componentes ya construidos y, en los casos más cercanos al validado, la reutilización proyectada llega al 65 %–85 %. Instrumentar un público nuevo cuesta entre tres y siete fichas temáticas, diseñadas con quien conoce y es responsable del proceso; no una malla completa nueva.',
    figures: [
      { value: '42–61 %', label: 'de cada malla nueva ya está construido' },
      { value: '65–85 %', label: 'de reutilización proyectada en los casos más cercanos al validado' },
      { value: '3–7', label: 'fichas temáticas por público nuevo, no una malla completa' },
    ],
  },
  {
    id: 6,
    title: 'Evolucionar no obliga a rehacer',
    usual: 'Una metodología se define, se publica y se endurece. Cuando la realidad cambia, ajustarla es difícil o costoso, o para nuevos contextos termina siendo otra distinta.',
    resonancia: 'El marco está construido por piezas separables. Permanecen estables la orquestación, la verificación, la persistencia y la protección ética; se mueven con el aprendizaje las dimensiones que se escuchan, los criterios de priorización y las formas de realimentar. Incorporar una dimensión nueva no exige volver a crear la malla, ni ajustar un criterio obliga a revalidar todo lo demás.',
  },
];

/** Titular corto de cada elemento para la franja inicial. */
export const innovationHighlights: Record<number, string> = {
  1: 'La IA se detiene',
  2: 'Respaldo textual',
  3: 'Sobre lo existente',
  4: 'Memoria que se relee',
  5: 'Escala medida',
  6: 'Evoluciona sin rehacer',
};

export const alternativesTitle = '¿Por qué se diferencia de lo que ya existe?';
export const alternativesLead = 'ResonancIA puede parecerse a varias cosas. Elige una y mira la diferencia concreta.';
export const alternatives: Alternative[] = [
  { id: 'asistente', label: 'Un asistente conversacional', flow: {
    usual: [{ icon: 'person', label: 'Persona', tone: 'human', link: 'both' }, { icon: 'assistant', label: 'Asistente de IA', tone: 'ai', note: 'Conversa con ella' }],
    ours: [{ icon: 'person', label: 'Persona', tone: 'human', link: 'both' }, { icon: 'person', label: 'Profesional', tone: 'human', link: 'dashed', note: 'La conversación sigue siendo humana' }, { icon: 'ear', label: 'ResonancIA', tone: 'ai', note: 'Escucha alrededor, no conversa' }, { icon: 'structured', label: 'Información organizada' }],
  }, difference: 'ResonancIA no conversa con nadie. Opera alrededor del canal de escucha, que puede ser una conversación entre dos personas, un canal unidireccional o un grupo. No lo interviene, no usa guiones ni lo interrumpe: solo activa sus capacidades de escucha para estandarizar y organizar la información.' },
  { id: 'transcripcion', label: 'Un sistema de transcripción', flow: {
    usual: [{ icon: 'audio', label: 'Audio' }, { icon: 'text', label: 'Transcripción', note: 'Aquí termina' }],
    ours: [{ icon: 'audio', label: 'Audio' }, { icon: 'text', label: 'Transcripción', note: 'Solo es el insumo' }, { icon: 'structured', label: 'Información estructurada y verificada', tone: 'ai' }, { icon: 'analytics', label: 'Analítica y realimentación', tone: 'human' }],
  }, difference: 'La transcripción es el insumo, no el producto. Lo que ResonancIA entrega es información estructurada y verificada, que alimenta procesos analíticos y luego vuelve conectada con una realimentación que es una decisión articulada con el humano.' },
  { id: 'tablero', label: 'Un tablero de analítica', flow: {
    usual: [{ icon: 'data', label: 'Datos' }, { icon: 'board', label: 'Tablero', note: 'Reporta lo que ocurrió' }],
    ours: [{ icon: 'need', label: 'Necesidad del proceso', tone: 'human' }, { icon: 'analytics', label: 'Analítica diseñada para ella' }, { icon: 'action', label: 'Acción que vuelve a las personas', tone: 'human' }],
  }, difference: 'Un tablero reporta lo que ocurrió. Aquí la analítica se diseña en función de una necesidad concreta del proceso y regresa a las personas convertida en acción intencionada.' },
  { id: 'automatizacion', label: 'Una automatización de procesos', flow: {
    usual: [{ icon: 'trigger', label: 'Disparador' }, { icon: 'automation', label: 'Automatización', note: 'Ejecuta' }, { icon: 'done', label: 'Acción ejecutada' }],
    ours: [{ icon: 'proposal', label: 'El sistema propone', tone: 'ai' }, { icon: 'decision', label: 'La persona decide', tone: 'human', note: 'Nada se ejecuta sin ella' }, { icon: 'done', label: 'Acción acordada' }],
  }, difference: 'Una automatización ejecuta. Aquí nada se ejecuta sin decisión profesional: el sistema propone y la persona responsable dispone.' },
  { id: 'otra-ia', label: 'Otra propuesta basada en IA', flow: {
    usual: [{ icon: 'assistant', label: 'Uso de IA', tone: 'ai', note: 'Hoy está al alcance de todos' }, { icon: 'done', label: 'Resultado' }],
    ours: [{ icon: 'ear', label: 'Escuchar', tone: 'ai' }, { icon: 'analytics', label: 'Comprender', tone: 'human' }, { icon: 'report', label: 'Realimentar' }, { icon: 'cycle', label: 'Ciclo ejecutado de punta a punta', note: 'Y se puede escalar' }],
  }, difference: 'La diferencia no es el uso de IA, que hoy está al alcance de todos. Es la malla agéntica construida y ejecutada de punta a punta en el escenario más exigente, y un marco metodológico que ya demostró producir resultados construibles en cinco contextos distintos, con capacidad de escalar a más públicos.' },
];

export const distinctClose = 'La innovación no está en ninguna de las capacidades por separado (escuchar, transcribir, analizar, recomendar), sino en orquestarlas como un ciclo que se cierra y vuelve a empezar, conservando en el centro la responsabilidad de quien conoce el proceso.';
