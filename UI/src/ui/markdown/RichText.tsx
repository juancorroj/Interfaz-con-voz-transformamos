import { Fragment } from 'react';
import { parseInline, type Inline } from './parseMarkdown';

function render(nodes: Inline[]) {
  return nodes.map((n, i) => {
    switch (n.type) {
      case 'text': return <Fragment key={i}>{n.text}</Fragment>;
      case 'strong': return <strong key={i}>{render(n.children)}</strong>;
      case 'em': return <em key={i}>{render(n.children)}</em>;
      case 'code': return <code key={i}>{n.text}</code>;
      case 'link': return <Fragment key={i}>{render(n.children)}</Fragment>;
    }
  });
}

/**
 * Texto corto con **negrita** y *cursiva* escritas en el contenido, para resaltar sin partir el texto en piezas.
 * No inserta HTML: lo que no es marca se muestra tal cual.
 */
export function RichText({ text }: { text: string }) {
  return <>{render(parseInline(text))}</>;
}
