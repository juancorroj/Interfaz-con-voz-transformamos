import { describe, expect, it } from 'vitest';
import { ScenarioCodec } from './ScenarioCodec';
import { LocalScenarioStore, MemoryScenarioStore } from './ScenarioStore';
import { formatCop, formatCopCompact, formatDelta } from './format';
import { architectures, baselineInput, priceBook } from './pricing2026';
import type { Scenario, SimulationInput } from './types';

const codec = new ScenarioCodec(baselineInput, id => architectures.some(a => a.id === id), id => id in priceBook.asr);

describe('ScenarioCodec', () => {
  it('la base se codifica sin parámetros', () => {
    expect(codec.encode(baselineInput)).toEqual({});
    expect(codec.decode({})).toEqual(baselineInput);
  });

  it('solo escribe lo que cambia', () => {
    expect(codec.encode({ ...baselineInput, sessionsPerYear: 20_000, tariff: 'introductoria' })).toEqual({ ses: '20000', tar: 'i' });
  });

  it('es inverso de decode para escenarios completos', () => {
    const input: SimulationInput = {
      architectureId: 'gpt6-luna-whisper', sessionsPerYear: 50_000, trm: 3306.86, audioMinutes: 25, tariff: 'introductoria',
      asrOverride: 'whisper-api', scope: 'acustico', peopleHours: 120, hourlyCop: 45_000,
    };
    expect(codec.decode(codec.encode(input))).toEqual(input);
  });

  it('ignora valores inválidos y vuelve a la base', () => {
    const decoded = codec.decode({ arq: 'no-existe', ses: 'abc', trm: '-5', min: '0', tar: 'x', asr: 'inventado', alc: 'z', hrs: 'NaN', val: '-1' });
    expect(decoded).toEqual(baselineInput);
  });

  it('acota el volumen y la duración', () => {
    expect(codec.decode({ ses: '99999999999' }).sessionsPerYear).toBe(baselineInput.sessionsPerYear);
    expect(codec.decode({ min: '9999' }).audioMinutes).toBe(baselineInput.audioMinutes);
  });
});

const scenario = (id: string, name = id): Scenario => ({ id, name, input: baselineInput, savedAt: '2026-10-03T00:00:00.000Z' });

describe('MemoryScenarioStore', () => {
  it('guarda, reemplaza por id sin cambiar el orden y borra', () => {
    const store = new MemoryScenarioStore();
    store.save(scenario('a'));
    store.save(scenario('b'));
    store.save(scenario('a', 'A nuevo'));
    expect(store.list().map(s => s.name)).toEqual(['A nuevo', 'b']);
    store.remove('b');
    expect(store.list().map(s => s.id)).toEqual(['a']);
  });
});

class FakeStorage {
  data = new Map<string, string>();
  failWrites = false;
  failReads = false;
  getItem(key: string) { if (this.failReads) throw new Error('bloqueado'); return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { if (this.failWrites) throw new Error('lleno'); this.data.set(key, value); }
}

describe('LocalScenarioStore', () => {
  it('persiste y sobrevive a un almacén nuevo con la misma clave', () => {
    const storage = new FakeStorage();
    new LocalScenarioStore(storage, 'k').save(scenario('a'));
    const reopened = new LocalScenarioStore(storage, 'k');
    expect(reopened.list().map(s => s.id)).toEqual(['a']);
    expect(reopened.persistent).toBe(true);
  });

  it('actualizar un escenario guardado conserva su posición', () => {
    const storage = new FakeStorage();
    const store = new LocalScenarioStore(storage, 'k');
    ['a', 'b', 'c'].forEach(id => store.save(scenario(id)));
    store.save(scenario('a', 'A actualizado'));
    expect(store.list().map(s => s.name)).toEqual(['A actualizado', 'b', 'c']);
  });

  it('descarta datos dañados o con otra forma sin romperse', () => {
    const storage = new FakeStorage();
    storage.data.set('k', JSON.stringify([scenario('ok'), { id: 'malo' }, 'texto', null]));
    expect(new LocalScenarioStore(storage, 'k').list().map(s => s.id)).toEqual(['ok']);
    storage.data.set('k', '{no es json');
    expect(new LocalScenarioStore(storage, 'k').list()).toEqual([]);
  });

  it('si no se puede escribir, sigue funcionando en memoria y lo avisa', () => {
    const storage = new FakeStorage();
    storage.failWrites = true;
    const store = new LocalScenarioStore(storage, 'k');
    store.save(scenario('a'));
    store.save(scenario('b'));
    expect(store.persistent).toBe(false);
    expect(store.list().map(s => s.id)).toEqual(['a', 'b']);
    store.remove('a');
    expect(store.list().map(s => s.id)).toEqual(['b']);
  });

  it('si no se puede leer, no lanza errores', () => {
    const storage = new FakeStorage();
    storage.failReads = true;
    const store = new LocalScenarioStore(storage, 'k');
    expect(store.list()).toEqual([]);
    expect(store.persistent).toBe(false);
  });

  it('sin almacenamiento disponible funciona solo en memoria', () => {
    const store = new LocalScenarioStore(undefined, 'k');
    store.save(scenario('a'));
    expect(store.list().map(s => s.id)).toEqual(['a']);
    expect(store.persistent).toBe(false);
  });
});

describe('formato de pesos', () => {
  it('escribe los pesos como la ficha', () => {
    expect(formatCop(4583.9)).toBe('$4.584');
    expect(formatCopCompact(30_100_000)).toBe('$30,1 millones');
    expect(formatCopCompact(64_170_000)).toBe('$64,2 millones');
    expect(formatCopCompact(809_000)).toBe('$810.000');
    expect(formatCopCompact(58)).toBe('$58');
    expect(formatCopCompact(1_000_000)).toBe('$1 millón');
    expect(formatCopCompact(2_100_000)).toBe('$2,1 millones');
  });

  it('muestra la variación con signo', () => {
    expect(formatDelta(-50)).toBe('−50 %');
    expect(formatDelta(12.4)).toBe('+12 %');
    expect(formatDelta(0.2)).toBe('0 %');
  });
});
