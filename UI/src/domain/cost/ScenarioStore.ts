import type { Scenario, SimulationInput } from './types';

/** Dónde se guardan los escenarios. La página depende de esto, no de `localStorage`. */
export interface ScenarioStore {
  /** Si es false, guardar no persiste (por ejemplo, almacenamiento bloqueado); el resto sigue funcionando. */
  readonly persistent: boolean;
  list(): Scenario[];
  save(scenario: Scenario): void;
  remove(id: string): void;
}

/** Agrega el escenario, o lo reemplaza en su lugar si ya existe, para que actualizar no cambie el orden de la lista. */
const withScenario = (items: Scenario[], scenario: Scenario): Scenario[] =>
  items.some(s => s.id === scenario.id) ? items.map(s => (s.id === scenario.id ? scenario : s)) : [...items, scenario];

/** Almacén en memoria: sirve para pruebas y como respaldo cuando el navegador no deja guardar. */
export class MemoryScenarioStore implements ScenarioStore {
  readonly persistent: boolean = false;
  private items: Scenario[] = [];

  list(): Scenario[] { return [...this.items]; }
  save(scenario: Scenario): void { this.items = withScenario(this.items, scenario); }
  remove(id: string): void { this.items = this.items.filter(s => s.id !== id); }
  replaceAll(items: Scenario[]): void { this.items = [...items]; }
}

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

const isInput = (value: unknown): value is SimulationInput => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.architectureId === 'string' && typeof v.sessionsPerYear === 'number' && typeof v.trm === 'number'
    && typeof v.audioMinutes === 'number' && (v.tariff === 'plena' || v.tariff === 'introductoria')
    && (v.scope === 'malla' || v.scope === 'acustico');
};

const isScenario = (value: unknown): value is Scenario => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === 'string' && typeof v.name === 'string' && typeof v.savedAt === 'string' && isInput(v.input);
};

/**
 * Guarda los escenarios en el navegador. Tolera fallos (modo privado, almacenamiento lleno o
 * bloqueado): una copia en memoria refleja siempre lo último guardado, así que si el navegador deja
 * de guardar, la página sigue funcionando mientras permanezca abierta y `persistent` pasa a false.
 */
export class LocalScenarioStore implements ScenarioStore {
  private readonly memory = new MemoryScenarioStore();
  private working: boolean;

  constructor(private readonly storage: StorageLike | undefined, private readonly key: string) {
    this.working = storage !== undefined;
  }

  get persistent(): boolean { return this.working; }

  list(): Scenario[] {
    if (!this.working) return this.memory.list();
    try {
      const raw = this.storage!.getItem(this.key);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const items = Array.isArray(parsed) ? parsed.filter(isScenario) : [];
      this.memory.replaceAll(items);
      return items;
    } catch {
      this.working = false;
      return this.memory.list();
    }
  }

  private commit(items: Scenario[]): void {
    this.memory.replaceAll(items);
    if (!this.working) return;
    try { this.storage!.setItem(this.key, JSON.stringify(items)); } catch { this.working = false; }
  }

  save(scenario: Scenario): void {
    this.commit(withScenario(this.list(), scenario));
  }

  remove(id: string): void {
    this.commit(this.list().filter(s => s.id !== id));
  }
}
