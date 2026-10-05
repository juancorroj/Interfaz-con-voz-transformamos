import { Fragment, useMemo, type ReactNode } from 'react';
import { MarkdownParser, inlineText, type Block, type Inline, type ListBlock } from './parseMarkdown';
import './markdown.css';

/** Destino de un enlace del documento: otra página de la web, una dirección externa o solo texto. */
export type LinkTarget =
  | { kind: 'internal'; onOpen: () => void }
  | { kind: 'external'; href: string }
  | { kind: 'text' };

interface MarkdownProps {
  source: string;
  /** Decide qué hacer con cada enlace. Sin esta función, los enlaces se muestran como texto. */
  resolveLink?: (href: string) => LinkTarget;
}

const parser = new MarkdownParser();

/** Muestra un documento Markdown como elementos de React; nunca inserta HTML. */
export function Markdown({ source, resolveLink }: MarkdownProps) {
  const blocks = useMemo(() => parser.parse(source), [source]);
  return <div className="md">{blocks.map((b, i) => <BlockView key={i} block={b} resolveLink={resolveLink} />)}</div>;
}

/** Títulos de segundo nivel del documento, para un índice de lectura. */
export function markdownOutline(source: string): { slug: string; text: string }[] {
  return parser.parse(source).flatMap(b => b.type === 'heading' && b.level === 2 ? [{ slug: b.slug, text: inlineText(b.content) }] : []);
}

function InlineView({ nodes, resolveLink }: { nodes: Inline[]; resolveLink?: MarkdownProps['resolveLink'] }): ReactNode {
  return <>{nodes.map((n, i) => {
    switch (n.type) {
      case 'text': return <Fragment key={i}>{n.text}</Fragment>;
      case 'code': return <code key={i}>{n.text}</code>;
      case 'strong': return <strong key={i}><InlineView nodes={n.children} resolveLink={resolveLink} /></strong>;
      case 'em': return <em key={i}><InlineView nodes={n.children} resolveLink={resolveLink} /></em>;
      case 'link': {
        const target = resolveLink?.(n.href) ?? { kind: 'text' as const };
        const label = <InlineView nodes={n.children} resolveLink={resolveLink} />;
        if (target.kind === 'internal') return <button key={i} type="button" className="md-link" onClick={target.onOpen}>{label}</button>;
        if (target.kind === 'external') return <a key={i} className="md-link" href={target.href} target="_blank" rel="noreferrer noopener">{label}</a>;
        return <span key={i} className="md-ref">{label}</span>;
      }
    }
  })}</>;
}

function ListView({ list, resolveLink }: { list: ListBlock; resolveLink?: MarkdownProps['resolveLink'] }) {
  const Tag = list.ordered ? 'ol' : 'ul';
  return <Tag>{list.items.map((item, i) => <li key={i}>
    <InlineView nodes={item.content} resolveLink={resolveLink} />
    {item.children.map((c, j) => <ListView key={j} list={c} resolveLink={resolveLink} />)}
  </li>)}</Tag>;
}

function BlockView({ block, resolveLink }: { block: Block; resolveLink?: MarkdownProps['resolveLink'] }): ReactNode {
  switch (block.type) {
    case 'heading': {
      const level = Math.min(Math.max(block.level, 2), 5);
      const Tag = `h${level}` as 'h2';
      return <Tag id={`md-${block.slug}`}><InlineView nodes={block.content} resolveLink={resolveLink} /></Tag>;
    }
    case 'paragraph': return <p><InlineView nodes={block.content} resolveLink={resolveLink} /></p>;
    case 'list': return <ListView list={block} resolveLink={resolveLink} />;
    case 'rule': return <hr />;
    case 'code': return <pre tabIndex={0}><code>{block.text}</code></pre>;
    case 'quote': return <blockquote>{block.blocks.map((b, i) => <BlockView key={i} block={b} resolveLink={resolveLink} />)}</blockquote>;
    case 'table': return <div className="md-table" role="region" tabIndex={0} aria-label="Tabla desplazable">
      <table>
        <thead><tr>{block.header.map((c, i) => <th key={i} scope="col"><InlineView nodes={c} resolveLink={resolveLink} /></th>)}</tr></thead>
        <tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((c, j) => <td key={j}><InlineView nodes={c} resolveLink={resolveLink} /></td>)}</tr>)}</tbody>
      </table>
    </div>;
  }
}
