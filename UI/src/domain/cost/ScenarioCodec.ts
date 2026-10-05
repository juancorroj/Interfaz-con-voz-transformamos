import type { Scope, SimulationInput, Tariff } from './types';

/**
 * Convierte un escenario en parámetros de URL y viceversa. Solo escribe lo que difiere de la base,
 * de modo que el enlace de la base queda vacío y los demás quedan cortos. Al leer, ignora lo que no
 * sea válido: un enlace dañado nunca produce un escenario imposible.
 */
export class ScenarioCodec {
  constructor(
    private readonly baseline: SimulationInput,
    private readonly validArchitecture: (id: string) => boolean,
    private readonly validAsr: (id: string) => boolean,
  ) {}

  encode(input: SimulationInput): Record<string, string> {
    const b = this.baseline;
    const out: Record<string, string> = {};
    if (input.architectureId !== b.architectureId) out.arq = input.architectureId;
    if (input.sessionsPerYear !== b.sessionsPerYear) out.ses = String(input.sessionsPerYear);
    if (input.trm !== b.trm) out.trm = String(input.trm);
    if (input.audioMinutes !== b.audioMinutes) out.min = String(input.audioMinutes);
    if (input.tariff !== b.tariff) out.tar = input.tariff === 'introductoria' ? 'i' : 'p';
    if (input.asrOverride !== b.asrOverride && input.asrOverride) out.asr = input.asrOverride;
    if (input.scope !== b.scope) out.alc = input.scope === 'acustico' ? 'a' : 'm';
    if (input.peopleHours !== null) out.hrs = String(input.peopleHours);
    if (input.hourlyCop !== null) out.val = String(input.hourlyCop);
    return out;
  }

  decode(params: Record<string, string>): SimulationInput {
    const b = this.baseline;
    const number = (raw: string | undefined, min: number, max: number, fallback: number): number => {
      if (raw === undefined || raw.trim() === '') return fallback;
      const n = Number(raw);
      return Number.isFinite(n) && n >= min && n <= max ? n : fallback;
    };
    const optional = (raw: string | undefined): number | null => {
      if (raw === undefined || raw.trim() === '') return null;
      const n = Number(raw);
      return Number.isFinite(n) && n >= 0 ? n : null;
    };
    return {
      architectureId: params.arq && this.validArchitecture(params.arq) ? params.arq : b.architectureId,
      sessionsPerYear: Math.round(number(params.ses, 0, 10_000_000, b.sessionsPerYear)),
      trm: number(params.trm, 1, 100_000, b.trm),
      audioMinutes: number(params.min, 1, 600, b.audioMinutes),
      tariff: (params.tar === 'i' ? 'introductoria' : params.tar === 'p' ? 'plena' : b.tariff) as Tariff,
      asrOverride: params.asr && this.validAsr(params.asr) ? params.asr : b.asrOverride,
      scope: (params.alc === 'a' ? 'acustico' : params.alc === 'm' ? 'malla' : b.scope) as Scope,
      peopleHours: optional(params.hrs),
      hourlyCop: optional(params.val),
    };
  }
}
