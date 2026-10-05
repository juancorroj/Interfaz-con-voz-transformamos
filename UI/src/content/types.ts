/**
 * Modelos del contenido que proviene de la ficha técnica. Cada tipo indica la
 * sección de la ficha de la que se alimenta; el texto vive en `content/ficha/`
 * y los componentes solo lo pintan.
 */

/** Sello de estado de un caso o capacidad, común a toda la web. */
export type StatusKind = 'ejecutado' | 'disenado' | 'ficticio';

/** Bloque de texto con título; sirve para principios, momentos y decisiones. */
export interface TitledText {
  id: string;
  title: string;
  text: string;
}

/** Cifra destacada con su explicación. */
export interface CaseFigure {
  value: string;
  label: string;
  detail?: string;
}

/** Etapa numerada de un proceso. */
export interface ProcessStage {
  n: number;
  title: string;
  text: string;
}

/** Uno de los tres momentos del ciclo, con lo que hace, quién lo hace y qué garantiza. */
export interface MomentDetail {
  id: string;
  title: string;
  summary: string;
  listTitle: string;
  points: string[];
  note?: string;
  actor: string;
  guarantee: string;
  /** El marco metodológico del momento: de qué parte, qué se define y qué entrega. */
  framework?: FrameworkInfo;
}

export interface FrameworkInfo {
  intro: string;
  steps: { label: string; text: string }[];
}

/** Sello de una norma o estándar: código corto, año y una palabra que dice de qué trata. */
export interface NormBadge {
  id: string;
  code: string;
  year?: string;
  caption: string;
}

/** Fila del resumen que compara el proceso sin y con ResonancIA. */
export interface CompareSummaryRow {
  metric: string;
  before: string;
  after: string;
}

/** Eslabón de la cadena de co-inteligencia. */
export interface ChainStep {
  id: string;
  actor: string;
  action: string;
  human: boolean;
}

/** Beneficio con título y explicación. */
export interface Benefit {
  id: string;
  title: string;
  text: string;
}

/** Visión de beneficio para un público. */
export interface AudienceVision {
  id: string;
  title: string;
  status: StatusKind;
  points: string[];
}

/** Lo que existe, lo que falta y lo que se necesita para un público. */
/** Impacto potencial de un público: cuántas personas lo componen. */
export interface PublicImpact {
  value: number;
  unit: string;
  /** Aclaración corta, por ejemplo qué incluye la cifra. */
  note?: string;
}

export interface PublicProfile {
  id: string;
  title: string;
  status: StatusKind;
  /** Unidad dueña del proceso. */
  unit: string;
  /** Personas a las que el caso podría llegar, si el modelo del proceso lo indica. */
  impact?: PublicImpact;
  focus: string;
  /** Agentes de escucha y de realimentación especificados. */
  agents: { listening: number; feedback: number };
  /** Nombres de las fichas temáticas de la malla de escucha. */
  thematic: string[];
  /** Porcentaje de la malla que no se construyó desde cero; `null` para el público de origen. */
  reusePct: number | null;
  exists: string[];
  missing: string[];
  /** Carpeta del repositorio donde está la documentación. */
  sourcePath: string;
}

/** Recorrido sugerido en la bienvenida: una intención y los ids de sección que lo componen. */
export interface GuideRoute {
  id: string;
  title: string;
  intro: string;
  steps: string[];
  /** Video que acompaña al recorrido. Mientras `available` sea false se muestra el botón, desactivado y con su aviso. */
  video?: { label: string; available: boolean; note: string };
}

/** Afirmación corta sobre el alcance del prototipo (qué es / qué no es). */
export interface ScopeStatement {
  text: string;
}

/** Significado de un sello de estado. */
export interface StatusLegendItem {
  kind: StatusKind;
  text: string;
}

/** Fase del plan de implementación (ficha · Implementación). */
export interface ImplementationPhase {
  id: number;
  name: string;
  /** Texto tal como lo expresa la ficha, p. ej. «4–6 semanas». */
  duration: string;
  focus: string;
  /** «Pregunta a resolver» de la fase, si la ficha la plantea. */
  question?: string;
  actions: string[];
  /** Aclaración que la ficha agrega a la fase. */
  note?: string;
}

/** Elemento de innovación (ficha · ¿Por qué es innovadora?). */
export interface InnovationItem {
  id: number;
  title: string;
  /** Cómo se hace lo habitual. */
  usual: string;
  /** Qué hace ResonancIA en su lugar. */
  resonancia: string;
  /** Cifras que respaldan el elemento, con su rango en porcentaje si lo tiene. */
  figures?: { value: string; label: string }[];
}

/** Norma o estándar (ficha · Marco legal y buenas prácticas). */
export interface LegalNorm {
  id: string;
  name: string;
  demands: string;
  reflected: string;
  scope: 'colombia' | 'internacional';
}

/** Alternativa con la que podría confundirse ResonancIA y la diferencia concreta. */
export interface Alternative {
  id: string;
  label: string;
  difference: string;
  /** Los dos recorridos que se muestran frente a frente. */
  flow: AlternativeFlow;
}

/** Un paso de un recorrido. `icon` es la clave de un icono de presentación. */
export interface FlowNode {
  icon: string;
  label: string;
  note?: string;
  /** `human` marca a una persona; `ai` a un sistema de IA. */
  tone?: 'human' | 'ai' | 'neutral';
  /** Cómo se une con el paso siguiente. */
  link?: 'arrow' | 'both' | 'dashed';
}

export interface AlternativeFlow {
  usual: FlowNode[];
  ours: FlowNode[];
}

/** Pregunta frecuente con su origen. */
export interface FaqItem {
  id: string;
  topic: string;
  question: string;
  answer: string;
  /** Sección de la ficha o documento del repositorio de donde sale la respuesta. */
  source: string;
  /** Sección de la web donde se desarrolla la respuesta. */
  linksTo?: string;
}

/** Integrante del equipo (ficha · Equipo). */
export interface TeamMember {
  name: string;
  role: string;
}
