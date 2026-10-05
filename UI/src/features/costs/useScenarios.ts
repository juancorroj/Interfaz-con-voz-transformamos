import { useCallback, useMemo, useState } from 'react';
import type { Scenario, SimulationInput } from '../../domain/cost/types';
import { createScenarioStore } from './costModel';

const makeId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/** Escenarios guardados por la persona, con la misma conducta que el resto de la web ante fallos de almacenamiento. */
export function useScenarios() {
  const store = useMemo(createScenarioStore, []);
  const [items, setItems] = useState<Scenario[]>(() => store.list());
  const [persistent, setPersistent] = useState(store.persistent);

  const sync = useCallback(() => { setItems(store.list()); setPersistent(store.persistent); }, [store]);

  const save = useCallback((name: string, input: SimulationInput, id?: string): Scenario => {
    const scenario: Scenario = { id: id ?? makeId(), name: name.trim() || 'Escenario sin nombre', input: { ...input }, savedAt: new Date().toISOString() };
    store.save(scenario);
    sync();
    return scenario;
  }, [store, sync]);

  const remove = useCallback((id: string) => { store.remove(id); sync(); }, [store, sync]);

  return { items, save, remove, persistent };
}
