import { describe, expect, it } from 'vitest';
import studyJson from '../../../../Implementacion/modelo_costos_2026_resultados.json';
import { CostSimulator } from './CostSimulator';
import { architectures, baselineInput, priceBook, SESSIONS_BUDGET, SESSIONS_INSTITUTIONAL, TRM_PLANNING } from './pricing2026';

const simulator = new CostSimulator(architectures, priceBook, baselineInput);
const byFicha = (tag: string) => architectures.find(a => a.ficha === tag)!;
const run = (architectureId: string, patch = {}) => simulator.run({ ...baselineInput, architectureId, ...patch });

describe('cifras de la ficha técnica (14.000 sesiones al año, TRM de planeación)', () => {
  // [escenario de la ficha, pesos por sesión, millones al año]
  it.each([
    ['mas-costosa', 4584, 64.2],
    ['validacion', 2153, 30.1],
    ['intermedia', 516, 7.2],
  ])('%s: $%i por sesión y ~$%f millones al año', (tag, perSession, millions) => {
    const r = run(byFicha(tag).id);
    expect(Math.round(r.perSessionCop)).toBe(perSession);
    expect(r.annualAiCop / 1e6).toBeCloseTo(millions, 1);
  });

  it('mas-economica: $58 por sesión y alrededor de $800.000 al año', () => {
    const r = run(byFicha('mas-economica').id);
    expect(Math.round(r.perSessionCop)).toBe(58);
    expect(Math.round(r.annualAiCop / 1e5) * 1e5).toBe(800_000);
  });

  it('operar un año cuesta entre ~$0,8 y ~$64,2 millones según la configuración', () => {
    const all = simulator.compareArchitectures(baselineInput);
    expect(all[0].annualAiCop / 1e6).toBeCloseTo(0.8, 1);
    expect(all[all.length - 1].annualAiCop / 1e6).toBeCloseTo(64.2, 1);
  });

  it('a escala institucional (50.000 sesiones) cuesta entre $2,9 y $107,6 millones', () => {
    const cheapest = run(byFicha('mas-economica').id, { sessionsPerYear: SESSIONS_INSTITUTIONAL });
    const mvp = run(byFicha('validacion').id, { sessionsPerYear: SESSIONS_INSTITUTIONAL });
    expect(cheapest.annualAiCop / 1e6).toBeCloseTo(2.9, 1);
    expect(mvp.annualAiCop / 1e6).toBeCloseTo(107.6, 1);
  });

  it('migrar de la configuración de la validación a la más económica reduce el costo casi cuarenta veces', () => {
    const ratio = run(byFicha('validacion').id).perSessionCop / run(byFicha('mas-economica').id).perSessionCop;
    expect(ratio).toBeGreaterThan(36);
    expect(ratio).toBeLessThan(40);
  });
});

describe('fidelidad con el estudio de costos (modelo_costos_2026_resultados.json)', () => {
  const study = studyJson as unknown as {
    trm_cop: number;
    supuestos: { tokens_audio: number; tokens_texto_entrada: number; tokens_salida: number; factor_malla_completa: number };
    precios_usd_por_millon: Record<string, { audio: number | null; in: number; out: number }>;
    asr_usd_por_minuto: Record<string, number>;
    resultados: { modelo: string; asr: string; usd_agente_acustico: number; usd_malla_completa: number; cop_malla_completa: number }[];
    proyeccion_anual_cop_malla_completa: Record<string, { mvp_cop: number; mas_economico_cop: number }>;
  };

  it('usa los mismos supuestos', () => {
    expect(TRM_PLANNING).toBe(study.trm_cop);
    expect(priceBook.meshFactor).toBe(study.supuestos.factor_malla_completa);
    expect(priceBook.textInputTokens).toBe(study.supuestos.tokens_texto_entrada);
    expect(priceBook.outputTokens).toBe(study.supuestos.tokens_salida);
    expect(40 * 60 * priceBook.tokensAudioPerSecond).toBe(study.supuestos.tokens_audio);
  });

  it('usa los mismos precios de modelos y de transcripción', () => {
    for (const [key, price] of Object.entries(priceBook.models)) {
      const source = study.precios_usd_por_millon[key];
      expect(source, key).toBeDefined();
      expect([price.audio, price.in, price.out], key).toEqual([source.audio, source.in, source.out]);
    }
    expect(priceBook.asr).toEqual(study.asr_usd_por_minuto);
  });

  it('reproduce el costo de cada una de las 12 configuraciones', () => {
    expect(study.resultados).toHaveLength(12);
    expect(architectures).toHaveLength(12);
    for (const row of study.resultados) {
      const arch = architectures.find(a => a.modelKey === row.modelo && (a.asrKey ?? 'nativo multimodal') === row.asr);
      expect(arch, `${row.modelo} + ${row.asr}`).toBeDefined();
      const r = run(arch!.id);
      expect(r.perSessionUsd, arch!.name).toBeCloseTo(row.usd_malla_completa, 4);
      expect(Math.round(r.perSessionCop * 10) / 10, arch!.name).toBeCloseTo(row.cop_malla_completa, 1);
    }
  });

  it('reproduce la proyección anual del estudio', () => {
    for (const [sessions, values] of Object.entries(study.proyeccion_anual_cop_malla_completa)) {
      const n = Number(sessions);
      // El estudio redondea el costo por sesión a un decimal antes de multiplicar; se admite esa diferencia (< 0,1 %).
      const within = (actual: number, expected: number) => Math.abs(actual - expected) / expected < 0.001;
      expect(within(run(byFicha('validacion').id, { sessionsPerYear: n }).annualAiCop, values.mvp_cop), `MVP ${n}`).toBe(true);
      expect(within(run(byFicha('mas-economica').id, { sessionsPerYear: n }).annualAiCop, values.mas_economico_cop), `económica ${n}`).toBe(true);
    }
  });
});

describe('qué sucede al cambiar los supuestos', () => {
  const mvp = byFicha('validacion').id;

  it('la base reproduce la base de la ficha y su diferencia es cero', () => {
    const r = simulator.run(simulator.reset());
    expect(r.vsBaselineCop).toBe(0);
    expect(r.vsBaselinePct).toBe(0);
    expect(r.annualAiCop / 1e6).toBeCloseTo(30.1, 1);
  });

  it('con la tarifa introductoria del modelo de la validación el costo anual se reduce a la mitad', () => {
    const r = run(mvp, { tariff: 'introductoria' });
    expect(r.annualAiCop / run(mvp).annualAiCop).toBeCloseTo(0.5, 6);
    expect(r.vsBaselinePct).toBeCloseTo(-50, 6);
  });

  it('la tarifa introductoria no afecta a modelos que no la declaran', () => {
    const id = byFicha('intermedia').id;
    expect(run(id, { tariff: 'introductoria' }).annualAiCop).toBe(run(id).annualAiCop);
  });

  it('una TRM menor baja el costo en la misma proporción', () => {
    const r = run(mvp, { trm: 3306.86 });
    expect(r.annualAiCop / run(mvp).annualAiCop).toBeCloseTo(3306.86 / 4200, 6);
  });

  it('el volumen escala linealmente', () => {
    expect(run(mvp, { sessionsPerYear: 28_000 }).annualAiCop).toBeCloseTo(run(mvp).annualAiCop * 2, 4);
    expect(run(mvp, { sessionsPerYear: 0 }).annualAiCop).toBe(0);
  });

  it('solo el agente acústico cuesta la malla dividida entre 3,4', () => {
    const acoustic = run(mvp, { scope: 'acustico' });
    expect(acoustic.perSessionUsd * priceBook.meshFactor).toBeCloseTo(run(mvp).perSessionUsd, 8);
  });

  it('cambiar la transcripción solo afecta a configuraciones con motor externo', () => {
    const luna = architectures.find(a => a.id === 'gpt6-luna-whisper')!.id;
    const api = run(luna, { asrOverride: 'gpt-4o-mini-transcribe' });
    expect(api.perSessionUsd).toBeCloseTo(run('gpt6-luna-mini').perSessionUsd, 8);
    expect(api.annualAiCop).toBeGreaterThan(run(luna).annualAiCop);
    expect(run(mvp, { asrOverride: 'whisper-api' }).annualAiCop).toBe(run(mvp).annualAiCop);
  });

  it('una sesión más corta cuesta menos', () => {
    expect(run(mvp, { audioMinutes: 20 }).annualAiCop).toBeLessThan(run(mvp).annualAiCop);
  });

  it('las horas de personas son opcionales y no se inventan', () => {
    expect(run(mvp).peopleCop).toBeNull();
    expect(run(mvp).totalCop).toBe(run(mvp).annualAiCop);
    expect(run(mvp, { peopleHours: 100, hourlyCop: 50_000 }).peopleCop).toBe(5_000_000);
    expect(run(mvp, { peopleHours: 100, hourlyCop: null }).peopleCop).toBeNull();
    expect(run(mvp, { peopleHours: 0, hourlyCop: 50_000 }).peopleCop).toBeNull();
  });

  it('compara las 12 configuraciones ordenadas de menor a mayor costo', () => {
    const all = simulator.compareArchitectures(baselineInput);
    expect(all).toHaveLength(12);
    const costs = all.map(r => r.annualAiCop);
    expect(costs).toEqual([...costs].sort((a, b) => a - b));
  });

  it('restablecer devuelve una copia que no altera la base', () => {
    const copy = simulator.reset();
    copy.sessionsPerYear = 1;
    expect(simulator.reset().sessionsPerYear).toBe(SESSIONS_BUDGET);
  });

  it('rechaza configuraciones desconocidas', () => {
    expect(() => simulator.run({ ...baselineInput, architectureId: 'no-existe' })).toThrow();
    expect(() => new CostSimulator(architectures, priceBook, { ...baselineInput, architectureId: 'x' })).toThrow();
  });
});
