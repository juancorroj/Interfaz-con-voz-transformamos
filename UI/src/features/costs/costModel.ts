import { CostSimulator } from '../../domain/cost/CostSimulator';
import { ScenarioCodec } from '../../domain/cost/ScenarioCodec';
import { LocalScenarioStore, type ScenarioStore } from '../../domain/cost/ScenarioStore';
import { architectures, asrLabels, baselineInput, priceBook } from '../../domain/cost/pricing2026';
import { formatInt } from '../../domain/cost/format';
import type { Architecture, SimulationInput } from '../../domain/cost/types';

/** Instancias compartidas de la página: el simulador, el codificador de enlaces y el origen de datos. */
export const costSimulator = new CostSimulator(architectures, priceBook, baselineInput);

export const scenarioCodec = new ScenarioCodec(
  baselineInput,
  id => costSimulator.hasArchitecture(id),
  id => id in priceBook.asr,
);

export const SCENARIOS_KEY = 'RESONANCIA_COSTOS_ESCENARIOS_V1';

export function createScenarioStore(): ScenarioStore {
  let storage: Storage | undefined;
  try { storage = window.localStorage; } catch { storage = undefined; }
  return new LocalScenarioStore(storage, SCENARIOS_KEY);
}

/** Cómo se llama en la ficha cada configuración que aparece allí. */
export const fichaNames: Record<NonNullable<Architecture['ficha']>, string> = {
  'mas-costosa': 'Más costosa evaluada',
  validacion: 'Arquitectura de la validación',
  intermedia: 'Intermedia',
  'mas-economica': 'Más económica evaluada',
};

export const baseResult = costSimulator.run(costSimulator.reset());

/** ¿Esta configuración tiene una tarifa introductoria documentada? */
export const hasIntroTariff = (architectureId: string): boolean => {
  const arch = architectures.find(a => a.id === architectureId);
  return arch ? priceBook.models[arch.modelKey].introFactor !== undefined : false;
};

/** Resume en una línea los supuestos de un escenario. */
export function describeInput(input: SimulationInput): string {
  const parts = [
    `${formatInt(input.sessionsPerYear)} sesiones al año`,
    `${input.audioMinutes} min`,
    `TRM $${formatInt(input.trm)}`,
    `tarifa ${input.tariff}`,
  ];
  if (input.asrOverride) parts.push(asrLabels[input.asrOverride] ?? input.asrOverride);
  if (input.scope === 'acustico') parts.push('solo agente acústico');
  return parts.join(' · ');
}
