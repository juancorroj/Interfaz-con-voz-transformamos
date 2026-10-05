import type { Architecture, ModelPrice, PriceBook, SimulationInput, SimulationResult } from './types';

/** Calcula el costo en dólares de procesar una sesión con el agente acústico. */
export interface CostModel {
  readonly architecture: Architecture;
  agentCostUsd(input: SimulationInput): number;
}

/**
 * Una configuración evaluada. Replica el cálculo del estudio de costos: el audio entra como
 * tokens a un modelo multimodal, o pasa antes por un motor de transcripción; a eso se suman los
 * tokens de texto de entrada y de salida.
 */
export class ArchitectureCostModel implements CostModel {
  constructor(readonly architecture: Architecture, private readonly book: PriceBook) {}

  private model(): ModelPrice {
    const model = this.book.models[this.architecture.modelKey];
    if (!model) throw new Error(`Modelo sin precio: ${this.architecture.modelKey}`);
    return model;
  }

  /** Motor de transcripción efectivo, o `null` si el modelo recibe el audio directamente. */
  asrFor(input: SimulationInput): string | null {
    if (this.architecture.asrKey === null) return null;
    return input.asrOverride && input.asrOverride in this.book.asr ? input.asrOverride : this.architecture.asrKey;
  }

  agentCostUsd(input: SimulationInput): number {
    const model = this.model();
    const factor = input.tariff === 'introductoria' ? model.introFactor ?? 1 : 1;
    const asr = this.asrFor(input);

    let audioCost: number;
    if (asr === null) {
      if (model.audio === null) throw new Error(`${this.architecture.modelKey} no admite audio nativo`);
      const audioTokens = input.audioMinutes * 60 * this.book.tokensAudioPerSecond;
      audioCost = (audioTokens * model.audio * factor) / 1e6;
    } else {
      audioCost = input.audioMinutes * this.book.asr[asr];
    }
    const textIn = (this.book.textInputTokens * model.in * factor) / 1e6;
    const textOut = (this.book.outputTokens * model.out * factor) / 1e6;
    return audioCost + textIn + textOut;
  }
}

/**
 * Simulador de costos. Parte de una base (la de la ficha) y calcula qué ocurre al cambiar los
 * supuestos. Es puro: no conoce la interfaz ni el almacenamiento.
 */
export class CostSimulator {
  private readonly models = new Map<string, ArchitectureCostModel>();

  constructor(architectures: Architecture[], private readonly book: PriceBook, private readonly baseline: SimulationInput) {
    for (const a of architectures) this.models.set(a.id, new ArchitectureCostModel(a, book));
    if (!this.models.has(baseline.architectureId)) throw new Error(`La base usa una configuración desconocida: ${baseline.architectureId}`);
  }

  get architectures(): Architecture[] {
    return [...this.models.values()].map(m => m.architecture);
  }

  /** La entrada de la base, copiada para que quien la use no pueda alterarla. */
  reset(): SimulationInput {
    return { ...this.baseline };
  }

  hasArchitecture(id: string): boolean {
    return this.models.has(id);
  }

  modelFor(id: string): ArchitectureCostModel {
    const model = this.models.get(id);
    if (!model) throw new Error(`Configuración desconocida: ${id}`);
    return model;
  }

  private annualAiCop(input: SimulationInput): { perSessionUsd: number; annualAiCop: number } {
    const agent = this.modelFor(input.architectureId).agentCostUsd(input);
    const perSessionUsd = input.scope === 'malla' ? agent * this.book.meshFactor : agent;
    return { perSessionUsd, annualAiCop: perSessionUsd * input.trm * input.sessionsPerYear };
  }

  run(input: SimulationInput): SimulationResult {
    const { perSessionUsd, annualAiCop } = this.annualAiCop(input);
    const baselineAnnual = this.annualAiCop(this.baseline).annualAiCop;
    const hasPeople = input.peopleHours !== null && input.hourlyCop !== null && input.peopleHours > 0 && input.hourlyCop > 0;
    const peopleCop = hasPeople ? input.peopleHours! * input.hourlyCop! : null;
    const vsBaselineCop = annualAiCop - baselineAnnual;
    return {
      architecture: this.modelFor(input.architectureId).architecture,
      perSessionUsd,
      perSessionCop: perSessionUsd * input.trm,
      annualAiCop,
      peopleCop,
      totalCop: annualAiCop + (peopleCop ?? 0),
      vsBaselineCop,
      vsBaselinePct: baselineAnnual === 0 ? 0 : (vsBaselineCop / baselineAnnual) * 100,
    };
  }

  /** El mismo escenario con cada configuración, ordenado de menor a mayor costo anual. */
  compareArchitectures(input: SimulationInput): SimulationResult[] {
    return this.architectures
      .map(a => this.run({ ...input, architectureId: a.id }))
      .sort((a, b) => a.annualAiCop - b.annualAiCop);
  }
}
