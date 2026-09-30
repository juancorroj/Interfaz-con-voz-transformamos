import { useEffect, useState } from 'react';
import { demoCases, DemoCase } from '../data/demoCases';
const key = 'RESONANCIA_PRESENTACION_FICTICIA_V2';
export function useDemoCases() {
  const [cases, setCases] = useState<DemoCase[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? 'null');
      // Solo restaurar los campos editables de las personas ficticias conocidas.
      return demoCases.map(original => {
        const update = Array.isArray(saved) ? saved.find(c => c?.id === original.id) : undefined;
        if (!update) return structuredClone(original);
        return { ...structuredClone(original), draft: typeof update.draft === 'string' ? update.draft : original.draft, reviewed: update.reviewed === true, closed: update.closed === true,
          actions: original.actions.map(a => ({ ...a, done: Array.isArray(update.actions) && update.actions.some((x: { id?: string; done?: boolean }) => x?.id === a.id) ? update.actions.find((x: { id?: string }) => x?.id === a.id).done === true : a.done })) };
      });
    } catch { return structuredClone(demoCases); }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(cases)); setStorageError(false); } catch { setStorageError(true); } }, [cases]);
  const update = (id: string, patch: Partial<Pick<DemoCase, 'actions' | 'draft' | 'reviewed' | 'closed'>>) => setCases(prev => prev.map(c => c.id === id ? { ...c, ...patch, ...(patch.actions?.some(a => !a.done) ? { closed: false } : {}) } : c));
  const reset = () => setCases(structuredClone(demoCases));
  return { cases, update, reset, storageError };
}
