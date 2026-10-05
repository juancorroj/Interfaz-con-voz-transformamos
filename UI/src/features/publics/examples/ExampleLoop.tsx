import { useState } from 'react';
import type { Audience } from '../../../data/audiences';
import { CycleExplorer } from '../../../ui/diagrams/CycleExplorer';
import { stepsOf } from './steps';

const accents = ['--accent-escucha', '--accent-comprension', '--accent-realimentacion', '--accent-escucha', '--accent-comprension'];

/** Profesores: los pasos en un ciclo cuyo resultado vuelve a alimentar el tablero de necesidades. */
export function ExampleLoop({ audience }: { audience: Audience }) {
  const steps = stepsOf(audience);
  // El punto de contacto acompaña a la necesidad: el ciclo tiene cinco paradas.
  const stops = [
    { id: 'need', title: 'Necesidad', text: `${steps[0].text} ${steps[1].text}`, icon: steps[0].icon },
    { id: 'listening', title: steps[2].title, text: steps[2].text, icon: steps[2].icon },
    { id: 'understanding', title: steps[3].title, text: steps[3].text, icon: steps[3].icon },
    { id: 'feedback', title: steps[4].title, text: steps[4].text, icon: steps[4].icon },
    { id: 'benefit', title: steps[5].title, text: steps[5].text, icon: steps[5].icon },
  ];
  const [selected, setSelected] = useState(stops[0].id);
  return <CycleExplorer
    ariaLabel="El ejemplo de profesores como un ciclo que vuelve a alimentar el tablero de necesidades"
    center="Tablero de necesidades"
    selectedId={selected}
    onSelect={setSelected}
    nextLabel={t => `Siguiente: ${t}`}
    restartLabel="Y el tablero vuelve a alimentarse"
    nodes={stops.map((s, i) => ({ id: s.id, label: s.title === 'Beneficio esperado' ? 'Beneficio' : s.title, accent: accents[i] }))}
    renderPanel={(id, i) => {
      const s = stops[i];
      return <article className="ex-loop-panel">
        <span className="ex-loop-icon"><s.icon size={26} aria-hidden="true" /></span>
        <small>Paso {i + 1} de {stops.length}</small>
        <h4>{s.title}</h4>
        <p>{s.text}</p>
      </article>;
    }} />;
}
