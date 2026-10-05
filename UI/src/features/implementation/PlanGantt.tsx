import { ArrowRight } from 'lucide-react';

export interface GanttRow {
  id: number;
  label: string;
  /** Semana en que empieza, contando desde la decisión de habilitación. */
  start: number;
  /** Duración mínima y máxima en semanas; sin `max`, la barra no tiene rango. */
  min: number;
  max?: number;
  /** Texto de la duración tal como lo expresa la ficha. */
  text: string;
  /** Si es true, la fase no tiene fin calendarizado. */
  open?: boolean;
}

export interface GanttMilestone {
  label: string;
  from: number;
  to: number;
  detail: string;
}

interface PlanGanttProps {
  weeks: number;
  axis: readonly { week: number; label: string }[];
  rows: readonly GanttRow[];
  milestones: readonly GanttMilestone[];
  rangeLabel: string;
  note: string;
}

const pct = (week: number, total: number) => `${(week / total) * 100}%`;

/**
 * Los tiempos del plan como diagrama de Gantt: cada barra es proporcional a la duración de su fase y, si la ficha da
 * un rango, el tramo incierto se dibuja punteado. La escala es aproximada; el dato exacto es el texto de cada barra.
 */
export function PlanGantt({ weeks, axis, rows, milestones, rangeLabel, note }: PlanGanttProps) {
  return <figure className="gantt">
    <div className="gantt-axis" aria-hidden="true">{axis.map(a => <span key={a.week} style={{ left: pct(a.week, weeks) }}>{a.label}</span>)}</div>
    <ol className="gantt-rows" aria-label="Duración de cada fase">
      {rows.map((r, i) => <li key={r.id}>
        <span className="gantt-label"><b>{r.id}</b>{r.label}</span>
        <div className="gantt-lane">
          {axis.map(a => <i key={a.week} className="gantt-grid" style={{ left: pct(a.week, weeks) }} />)}
          <span className="gantt-bar-wrap" style={{ left: pct(r.start, weeks), width: pct(r.open ? weeks - r.start : (r.max ?? r.min), weeks), animationDelay: `${i * 80}ms` }}>
            <span className="gantt-bar solid" style={{ width: r.open ? '100%' : `${(r.min / (r.max ?? r.min)) * 100}%` }} />
            {r.max && r.max > r.min && <span className="gantt-bar range" aria-label={rangeLabel} />}
            {r.open && <ArrowRight className="gantt-open" size={16} aria-hidden="true" />}
            <em className={r.open ? 'inside' : undefined}>{r.text}</em>
          </span>
        </div>
      </li>)}
    </ol>
    <ul className="gantt-milestones">{milestones.map(m => <li key={m.label}>
      <span className="gantt-flag" style={{ left: pct(m.from, weeks), width: pct(m.to - m.from, weeks) }} />
      <small><b>{m.label}</b> · {m.detail}</small>
    </li>)}</ul>
    <figcaption>{note}</figcaption>
  </figure>;
}
