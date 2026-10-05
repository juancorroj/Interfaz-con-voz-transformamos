import { Check, Copy } from 'lucide-react';

export interface Command {
  id: string;
  label: string;
  command: string;
}

interface CommandTerminalProps {
  commands: readonly Command[];
  copied?: string;
  onCopy: (id: string, command: string) => void;
}

/** Los comandos de verificación en un bloque de consola, cada uno con su paso y su botón de copiar. */
export function CommandTerminal({ commands, copied, onCopy }: CommandTerminalProps) {
  return <div className="sx-term">
    <div className="sx-term-bar" aria-hidden="true"><i /><i /><i /><span>raíz del repositorio</span></div>
    <ol>{commands.map((c, i) => <li key={c.id}>
      <p className="sx-term-label"><span>{i + 1}</span>{c.label}</p>
      <div className="sx-term-line">
        <code><b aria-hidden="true">$</b> {c.command}</code>
        <button onClick={() => onCopy(c.id, c.command)} aria-label={`Copiar el comando: ${c.label}`}>
          {copied === c.id ? <><Check size={14} aria-hidden="true" />Copiado</> : <><Copy size={14} aria-hidden="true" />{copied === `fail-${c.id}` ? 'No se pudo copiar' : 'Copiar'}</>}
        </button>
      </div>
    </li>)}</ol>
  </div>;
}
