import { ArrowDown } from 'lucide-react';

interface SafetyMarginProps {
  title: string;
  sessions: { label: string; plan: number; real: number; planLabel: string; realLabel: string };
  others: readonly { id: string; title: string; plan: string; real: string }[];
  close: string;
}

/** Los tres supuestos conservadores de la ficha: lo que se presupuesta frente a lo que se espera que ocurra. */
export function SafetyMargin({ title, sessions, others, close }: SafetyMarginProps) {
  const pct = (sessions.real / sessions.plan) * 100;
  return <div className="smargin">
    <h3>{title}</h3>
    <div className="smargin-grid">
      <div className="smargin-card">
        <small>{sessions.label}</small>
        <div className="smargin-bars">
          <div><span>{sessions.planLabel}</span><i className="plan" /><b>{sessions.plan.toLocaleString('es-CO')}</b></div>
          <div><span>{sessions.realLabel}</span><i className="real" style={{ width: `${pct}%` }} /><b>{sessions.real.toLocaleString('es-CO')}</b></div>
        </div>
      </div>
      {others.map(o => <div key={o.id} className="smargin-card">
        <small>{o.title}</small>
        <div className="smargin-pair"><span className="plan">{o.plan}</span><ArrowDown size={16} aria-hidden="true" /><span className="real">{o.real}</span></div>
      </div>)}
    </div>
    <p className="smargin-close">{close}</p>
  </div>;
}
