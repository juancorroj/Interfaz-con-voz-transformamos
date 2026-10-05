/**
 * Analizador de Markdown mínimo y sin dependencias, suficiente para los
 * documentos del Dossier: títulos, párrafos, listas (con anidación), tablas,
 * bloques de código, citas y reglas. Devuelve un árbol de datos; no produce
 * HTML, de modo que nada del texto se interpreta como marcado.
 */

export type Inline =
  | { type: 'text'; text: string }
  | { type: 'strong'; children: Inline[] }
  | { type: 'em'; children: Inline[] }
  | { type: 'code'; text: string }
  | { type: 'link'; href: string; children: Inline[] };

export interface ListItem { content: Inline[]; children: ListBlock[] }
export interface ListBlock { type: 'list'; ordered: boolean; items: ListItem[] }

export type Block =
  | { type: 'heading'; level: number; content: Inline[]; slug: string }
  | { type: 'paragraph'; content: Inline[] }
  | ListBlock
  | { type: 'table'; header: Inline[][]; rows: Inline[][][] }
  | { type: 'code'; lang: string; text: string }
  | { type: 'quote'; blocks: Block[] }
  | { type: 'rule' };

const INLINE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)\s]+\))|(\*[^*\s][^*]*\*)/;

/** Texto en línea: código, negrita, cursiva y enlaces. */
export function parseInline(source: string): Inline[] {
  const out: Inline[] = [];
  let rest = source;
  while (rest) {
    const match = INLINE.exec(rest);
    if (!match) { out.push({ type: 'text', text: rest }); break; }
    if (match.index > 0) out.push({ type: 'text', text: rest.slice(0, match.index) });
    const token = match[0];
    if (token.startsWith('`')) out.push({ type: 'code', text: token.slice(1, -1) });
    else if (token.startsWith('**')) out.push({ type: 'strong', children: parseInline(token.slice(2, -2)) });
    else if (token.startsWith('[')) {
      const split = token.lastIndexOf('](');
      out.push({ type: 'link', href: token.slice(split + 2, -1), children: parseInline(token.slice(1, split)) });
    } else out.push({ type: 'em', children: parseInline(token.slice(1, -1)) });
    rest = rest.slice(match.index + token.length);
  }
  return out;
}

export function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Texto plano de un fragmento en línea (para títulos y para el índice). */
export function inlineText(content: Inline[]): string {
  return content.map(n => n.type === 'text' || n.type === 'code' ? n.text : inlineText(n.children)).join('');
}

const FENCE = /^\s*```(\S*)\s*$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const RULE = /^\s*(-{3,}|\*{3,}|_{3,})\s*$/;
const LIST_MARK = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const TABLE_ROW = /^\s*\|.*\|\s*$/;
const TABLE_SEPARATOR = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;

const splitRow = (line: string): string[] => {
  const cells: string[] = [];
  let current = '';
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === '\\' && trimmed[i + 1] === '|') { current += '|'; i++; continue; }
    if (ch === '|') { cells.push(current.trim()); current = ''; continue; }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
};

export class MarkdownParser {
  parse(source: string): Block[] {
    return this.blocks(source.replace(/\r\n?/g, '\n').split('\n'));
  }

  private blocks(lines: string[]): Block[] {
    const out: Block[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      const fence = FENCE.exec(line);
      if (fence) {
        const body: string[] = [];
        i++;
        while (i < lines.length && !FENCE.test(lines[i])) body.push(lines[i++]);
        i++;
        out.push({ type: 'code', lang: fence[1], text: body.join('\n') });
        continue;
      }

      const heading = HEADING.exec(line);
      if (heading) {
        const content = parseInline(heading[2]);
        out.push({ type: 'heading', level: heading[1].length, content, slug: slugify(inlineText(content)) });
        i++;
        continue;
      }

      if (RULE.test(line)) { out.push({ type: 'rule' }); i++; continue; }

      if (TABLE_ROW.test(line) && i + 1 < lines.length && TABLE_SEPARATOR.test(lines[i + 1])) {
        const header = splitRow(line).map(parseInline);
        i += 2;
        const rows: Inline[][][] = [];
        while (i < lines.length && TABLE_ROW.test(lines[i])) rows.push(splitRow(lines[i++]).map(parseInline));
        out.push({ type: 'table', header, rows });
        continue;
      }

      if (/^\s*>/.test(line)) {
        const body: string[] = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) body.push(lines[i++].replace(/^\s*>\s?/, ''));
        out.push({ type: 'quote', blocks: this.blocks(body) });
        continue;
      }

      if (LIST_MARK.test(line)) {
        const end = this.listEnd(lines, i);
        out.push(this.list(lines.slice(i, end)));
        i = end;
        continue;
      }

      const paragraph: string[] = [];
      while (i < lines.length && lines[i].trim() && !this.startsBlock(lines, i)) paragraph.push(lines[i++].trim());
      if (!paragraph.length) { paragraph.push(lines[i++].trim()); }
      out.push({ type: 'paragraph', content: parseInline(paragraph.join(' ')) });
    }
    return out;
  }

  private startsBlock(lines: string[], i: number): boolean {
    const line = lines[i];
    return FENCE.test(line) || HEADING.test(line) || RULE.test(line) || /^\s*>/.test(line) || LIST_MARK.test(line)
      || (TABLE_ROW.test(line) && i + 1 < lines.length && TABLE_SEPARATOR.test(lines[i + 1]));
  }

  /** Una lista llega hasta la primera línea que no es marca, continuación sangrada ni hueco seguido de más lista. */
  private listEnd(lines: string[], start: number): number {
    let i = start + 1;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) {
        const next = lines.slice(i + 1).find(l => l.trim());
        if (next !== undefined && (LIST_MARK.test(next) || /^\s{2,}\S/.test(next)) && !FENCE.test(next)) { i++; continue; }
        return i;
      }
      if (LIST_MARK.test(line) || /^\s{2,}\S/.test(line)) { i++; continue; }
      return i;
    }
    return i;
  }

  private list(lines: string[]): ListBlock {
    const first = LIST_MARK.exec(lines[0])!;
    const baseIndent = first[1].length;
    const ordered = /\d/.test(first[2]);
    const items: ListItem[] = [];
    let current: { text: string[]; nested: string[] } | undefined;
    const flush = () => {
      if (!current) return;
      const children: ListBlock[] = [];
      const nested = current.nested.filter(l => l.trim());
      if (nested.length) {
        const sub = this.blocks(nested.map(l => l.slice(Math.min(l.length - l.trimStart().length, baseIndent + 2))));
        for (const block of sub) if (block.type === 'list') children.push(block);
      }
      items.push({ content: parseInline(current.text.join(' ')), children });
    };
    for (const line of lines) {
      if (!line.trim()) continue;
      const mark = LIST_MARK.exec(line);
      if (mark && mark[1].length <= baseIndent) {
        flush();
        current = { text: [mark[3].trim()], nested: [] };
      } else if (current) {
        if (mark) current.nested.push(line);
        else if (current.nested.length) current.nested.push(line);
        else current.text.push(line.trim());
      }
    }
    flush();
    return { type: 'list', ordered, items };
  }
}
