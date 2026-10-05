import { ArrowRight, ArrowLeftRight, AudioLines, BarChart3, Bot, Cog, Ear, FileText, LayoutDashboard, LayoutList, LineChart, Lightbulb, MessagesSquare, Network, Repeat2, Send, Target, UserCheck, UserRound, Zap, Database, CheckCircle2, type LucideIcon } from 'lucide-react';
import type { AlternativeFlow, FlowNode } from '../../content/types';

const icons: Record<string, LucideIcon> = {
  person: UserRound, assistant: Bot, audio: AudioLines, text: FileText, structured: LayoutList, analytics: LineChart, board: LayoutDashboard,
  action: Send, decision: UserCheck, proposal: Lightbulb, ear: Ear, chat: MessagesSquare, automation: Cog, mesh: Network, cycle: Repeat2,
  report: BarChart3, need: Target, trigger: Zap, data: Database, done: CheckCircle2,
};

function Nodes({ nodes }: { nodes: readonly FlowNode[] }) {
  return <ol className="flow-nodes">{nodes.map((n, i) => {
    const Icon = icons[n.icon] ?? Bot;
    return <li key={`${n.icon}-${i}`} className={`flow-node ${n.tone ?? 'neutral'}`} style={{ animationDelay: `${i * 0.18}s` }}>
      <span className="flow-icon"><Icon size={22} aria-hidden="true" /></span>
      <strong>{n.label}</strong>
      {n.note && <small>{n.note}</small>}
      {i < nodes.length - 1 && <span className={`flow-link ${n.link ?? 'arrow'}`} aria-hidden="true">{n.link === 'both' ? <ArrowLeftRight size={18} /> : <ArrowRight size={18} />}</span>}
    </li>;
  })}</ol>;
}

interface AltFlowProps {
  flow: AlternativeFlow;
  /** Nombre de lo que podría confundirse con ResonancIA. */
  usualTitle: string;
  /** Lo que ResonancIA hace de distinto, en una frase. */
  difference: string;
  usualLabel: string;
  doesLabel: string;
  differenceLabel: string;
}

/** Dos tarjetas: lo que podría confundirse con ResonancIA y, a la derecha, lo que hace ResonancIA y en qué se diferencia. */
export function AltFlow({ flow, usualTitle, difference, usualLabel, doesLabel, differenceLabel }: AltFlowProps) {
  return <div className="flow">
    <article className="flow-card usual">
      <header><span>{usualLabel}</span><h3>{usualTitle}</h3></header>
      <Nodes nodes={flow.usual} />
    </article>
    <article className="flow-card ours">
      <header><span>ResonancIA</span></header>
      <section aria-label={doesLabel}>
        <h4>{doesLabel}</h4>
        <Nodes nodes={flow.ours} />
      </section>
      <section className="flow-diff" aria-label={differenceLabel}>
        <h4>{differenceLabel}</h4>
        <p>{difference}</p>
      </section>
    </article>
  </div>;
}
