/** Precio de un modelo en USD por millón de tokens. `audio` es null si no admite audio nativo. */
export interface ModelPrice {
  audio: number | null;
  in: number;
  out: number;
  note: string;
  /**
   * Factor de la tarifa introductoria frente a la plena (0,5 = «cuesta la mitad»). Solo se declara
   * donde la fuente lo indica.
   */
  introFactor?: number;
}

/** Una configuración evaluada: un modelo y, si no es multimodal, un motor de transcripción. */
export interface Architecture {
  id: string;
  name: string;
  modelKey: string;
  /** Motor de transcripción por defecto; `null` si el modelo recibe el audio directamente. */
  asrKey: string | null;
  /** Posición de esta configuración en la ficha técnica, si aparece allí. */
  ficha?: 'mas-costosa' | 'validacion' | 'intermedia' | 'mas-economica';
}

export type Tariff = 'plena' | 'introductoria';
export type Scope = 'malla' | 'acustico';

/** Todo lo que el simulador permite cambiar. */
export interface SimulationInput {
  architectureId: string;
  sessionsPerYear: number;
  /** Pesos colombianos por dólar. */
  trm: number;
  /** Duración del audio de una sesión, en minutos. */
  audioMinutes: number;
  tariff: Tariff;
  /** Reemplaza el motor de transcripción de configuraciones que lo requieren; `null` usa el de la configuración. */
  asrOverride: string | null;
  /** `malla` incluye los ocho agentes de escucha; `acustico` solo el agente acústico. */
  scope: Scope;
  /** Horas de personas por año; opcional porque la ficha las deja «por acordar». */
  peopleHours: number | null;
  /** Costo de una hora de persona, en pesos. */
  hourlyCop: number | null;
}

export interface SimulationResult {
  architecture: Architecture;
  perSessionUsd: number;
  perSessionCop: number;
  /** Costo anual de la inteligencia artificial. */
  annualAiCop: number;
  /** Costo anual de las horas de personas, o null si no se ingresó. */
  peopleCop: number | null;
  /** IA más horas de personas. */
  totalCop: number;
  /** Diferencia del costo anual de IA frente a la base de la ficha. */
  vsBaselineCop: number;
  vsBaselinePct: number;
}

/** Un escenario guardado por la persona. */
export interface Scenario {
  id: string;
  name: string;
  input: SimulationInput;
  savedAt: string;
}

export interface PriceBook {
  models: Record<string, ModelPrice>;
  /** USD por minuto de audio, por motor de transcripción. */
  asr: Record<string, number>;
  tokensAudioPerSecond: number;
  textInputTokens: number;
  outputTokens: number;
  /** Cuántas veces el costo del agente acústico es el de toda la malla de escucha. */
  meshFactor: number;
}
