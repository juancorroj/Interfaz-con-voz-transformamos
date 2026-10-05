import { useMemo } from 'react';
import { formatCop, formatCopCompact, formatDelta, formatUsd } from '../../domain/cost/format';
import type { SimulationInput, SimulationResult } from '../../domain/cost/types';
import { BarChart, type BarItem } from '../../ui/charts/BarChart';
import { baseResult, costSimulator, fichaNames } from './costModel';

interface SimulatorResultsProps {
  input: SimulationInput;
  result: SimulationResult;
}

/** Lo que cuesta el escenario actual y cómo se compara con la base y con las demás configuraciones. */
export function SimulatorResults({ input, result }: SimulatorResultsProps) {
  const isBase = result.vsBaselineCop === 0;
  const rows = useMemo(() => costSimulator.compareArchitectures(input), [input]);
  const items: BarItem[] = rows.map(r => ({
    id: r.architecture.id,
    label: r.architecture.name,
    value: r.annualAiCop,
    valueLabel: formatCopCompact(r.annualAiCop),
    mark: r.architecture.id === input.architectureId ? 'selected' : r.architecture.ficha ? 'reference' : undefined,
    note: r.architecture.ficha ? fichaNames[r.architecture.ficha] : undefined,
  }));

  return <div className="sim-results">
    <div className="sim-big" aria-live="polite">
      <span>Costo anual de la inteligencia artificial</span>
      <strong>{formatCopCompact(result.annualAiCop)} COP</strong>
      <p>
        {formatCop(result.perSessionCop)} COP por sesión <small>({formatUsd(result.perSessionUsd)})</small>
      </p>
      <span className={isBase ? 'sim-delta same' : result.vsBaselineCop < 0 ? 'sim-delta down' : 'sim-delta up'}>
        {isBase ? 'Igual a la base de la ficha' : `${formatDelta(result.vsBaselinePct)} frente a la base (${formatCopCompact(baseResult.annualAiCop)})`}
      </span>
      {result.peopleCop !== null && <div className="sim-total">
        <span>Horas de personas</span><b>{formatCopCompact(result.peopleCop)} COP</b>
        <span>IA + horas de personas</span><b>{formatCopCompact(result.totalCop)} COP</b>
      </div>}
    </div>

    <h3>Las 12 configuraciones con estos supuestos</h3>
    <BarChart items={items} ariaLabel="Costo anual de cada configuración, de menor a mayor" />
  </div>;
}
