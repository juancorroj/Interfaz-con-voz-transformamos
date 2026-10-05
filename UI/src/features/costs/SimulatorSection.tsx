import { useMemo, useState } from 'react';
import { simulator as copy } from '../../content/ficha/costos';
import type { Scenario, SimulationInput } from '../../domain/cost/types';
import { Callout } from '../../ui/Callout';
import { costSimulator } from './costModel';
import { ScenarioManager } from './ScenarioManager';
import { SimulatorControls } from './SimulatorControls';
import { SimulatorResults } from './SimulatorResults';
import { useScenarios } from './useScenarios';

interface SimulatorSectionProps {
  /** Escenario con el que se abre (por ejemplo, desde un enlace compartido). */
  initial: SimulationInput;
  linkFor: (input: SimulationInput) => string;
}

/** Simulador: supuestos, resultado inmediato, gráfica de las 12 configuraciones y escenarios guardados. */
export function SimulatorSection({ initial, linkFor }: SimulatorSectionProps) {
  const [input, setInput] = useState<SimulationInput>(initial);
  const { items, save, remove, persistent } = useScenarios();
  const result = useMemo(() => costSimulator.run(input), [input]);

  return <div className="sim">
    <div className="sim-intro"><span className="eyebrow">{copy.eyebrow}</span><h2 id="costs-simulator">{copy.title}</h2><p>{copy.lead}</p></div>
    <div className="sim-grid">
      <SimulatorControls input={input} onChange={patch => setInput(prev => ({ ...prev, ...patch }))} onReset={() => setInput(costSimulator.reset())} />
      <SimulatorResults input={input} result={result} />
    </div>
    <Callout tone="scope" title="Qué calcula y qué no">{copy.scopeNote}</Callout>
    <ScenarioManager input={input} scenarios={items} persistent={persistent} onSave={save} onRemove={remove} onLoad={(s: Scenario) => setInput({ ...s.input })} linkFor={linkFor} />
  </div>;
}
