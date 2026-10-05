import { describe, expect, it } from 'vitest';
import { MarkdownParser, inlineText, parseInline } from './parseMarkdown';
import declaracion from '../../../../Dossier/DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md?raw';
import verificacion from '../../../../Dossier/VERIFICACION_ACUSTICA_INDEPENDIENTE.md?raw';
import hallazgos from '../../../../Dossier/REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md?raw';
import indice from '../../../../Dossier/INDICE.md?raw';

const parser = new MarkdownParser();

describe('parseInline', () => {
  it('reconoce código, negrita, cursiva y enlaces', () => {
    const nodes = parseInline('Un **dato** con `código`, *énfasis* y [enlace](a/b.md#x).');
    expect(nodes.map(n => n.type)).toEqual(['text', 'strong', 'text', 'code', 'text', 'em', 'text', 'link', 'text']);
    expect(inlineText(nodes)).toBe('Un dato con código, énfasis y enlace.');
  });
  it('conserva los asteriscos sueltos como texto', () => {
    expect(inlineText(parseInline('2 * 3 = 6'))).toBe('2 * 3 = 6');
  });
});

describe('MarkdownParser', () => {
  it('lee títulos, párrafos de varias líneas y reglas', () => {
    const blocks = parser.parse('# Título\n\nPrimera línea\nsegunda línea\n\n---\n\n## Otro');
    expect(blocks.map(b => b.type)).toEqual(['heading', 'paragraph', 'rule', 'heading']);
    expect(blocks[1].type === 'paragraph' && inlineText(blocks[1].content)).toBe('Primera línea segunda línea');
  });
  it('lee tablas con alineación y barras escapadas', () => {
    const [table] = parser.parse('| A | B |\n| :--- | ---: |\n| uno | `x \\| y` |\n| dos | tres |');
    expect(table.type).toBe('table');
    if (table.type === 'table') { expect(table.header).toHaveLength(2); expect(table.rows).toHaveLength(2); expect(inlineText(table.rows[0][1])).toBe('x | y'); }
  });
  it('lee listas ordenadas con listas anidadas', () => {
    const [list] = parser.parse('1. **Uno**\n   - a\n   - b\n2. Dos');
    expect(list.type).toBe('list');
    if (list.type === 'list') { expect(list.ordered).toBe(true); expect(list.items).toHaveLength(2); expect(list.items[0].children[0].items).toHaveLength(2); }
  });
  it('lee bloques de código sin interpretarlos', () => {
    const [code] = parser.parse('```bash\n# no es título\n| ni tabla |\n```');
    expect(code).toEqual({ type: 'code', lang: 'bash', text: '# no es título\n| ni tabla |' });
  });
  it('lee citas', () => {
    const [quote] = parser.parse('> Una cita\n> en dos líneas');
    expect(quote.type).toBe('quote');
  });
});

describe('documentos del Dossier que se publican', () => {
  const docs = { declaracion, verificacion, hallazgos, indice };
  for (const [id, text] of Object.entries(docs)) {
    it(`${id}: se analiza con títulos y sin dejar marcas sin resolver`, () => {
      const blocks = parser.parse(text);
      expect(blocks.some(b => b.type === 'heading')).toBe(true);
      const plain = blocks.flatMap(b => b.type === 'paragraph' ? [inlineText(b.content)] : []).join(' ');
      expect(plain).not.toMatch(/\*\*|`/);
    });
  }
  it('la declaración declara diez límites y cuatro correcciones', () => {
    const tables = parser.parse(declaracion).filter(b => b.type === 'table');
    const correcciones = tables.find(t => t.type === 'table' && inlineText(t.header[0]).includes('Afirmación previa'));
    expect(correcciones && correcciones.type === 'table' && correcciones.rows).toHaveLength(4);
  });
  it('el registro de hallazgos lista diez hallazgos', () => {
    const table = parser.parse(hallazgos).find(b => b.type === 'table' && inlineText(b.header[1]) === 'Hallazgo');
    expect(table && table.type === 'table' && table.rows).toHaveLength(10);
  });
  it('la matriz y el índice coinciden en 87 especificaciones', () => {
    expect(indice).toContain('87 especificaciones');
    expect(indice).not.toContain('89');
  });
});
