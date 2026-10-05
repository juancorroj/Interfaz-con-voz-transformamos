import { CountUp } from '../../ui/CountUp';

export interface RingFigure {
  value: number;
  /** Total contra el que se mide; con `segments`, es la suma de los tramos. */
  of: number;
  /** Si se da, el anillo se parte en tramos (p. ej. quién señaló cada límite). */
  segments?: readonly { value: number; label: string }[];
  label: string;
  detail: string;
}

const R = 44;
const C = 2 * Math.PI * R;

/** Las cifras comprobables como anillos: «12 de 12» es un anillo cerrado, y los límites se parten por quién los señaló. */
export function FigureRings({ figures }: { figures: readonly RingFigure[] }) {
  return <ul className="sx-rings">{figures.map(f => {
    let offset = 0;
    const parts = f.segments ?? [{ value: f.value, label: '' }];
    return <li key={f.label}>
      <figure>
        <div className="sx-ring">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle className="sx-ring-bg" cx="50" cy="50" r={R} />
            {parts.map((p, i) => { const len = (p.value / f.of) * C; const el = <circle key={i} className={`sx-ring-arc a${i}`} cx="50" cy="50" r={R} strokeDasharray={`${Math.max(len - 2, 0)} ${C}`} strokeDashoffset={-offset} />; offset += len; return el; })}
          </svg>
          <strong><CountUp value={f.value} /></strong>
        </div>
        <figcaption>
          <b>{f.label}</b>
          <span>{f.detail}</span>
          {f.segments && <small>{f.segments.map((s, i) => <em key={s.label} className={`a${i}`}>{s.value} {s.label}</em>)}</small>}
        </figcaption>
      </figure>
    </li>;
  })}</ul>;
}
