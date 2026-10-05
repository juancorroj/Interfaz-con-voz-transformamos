import { describe, expect, it } from 'vitest';
import { supportDocuments } from '../../content/ficha/soporte';
import { teamMembers } from '../../content/ficha/equipo';
import { DocumentLibrary } from './DocumentLibrary';
import { documentLibrary } from './documents';
import { createSectionRegistry } from '../../app/sections';

describe('DocumentLibrary', () => {
  const library = new DocumentLibrary({ a: async () => 'Hola Asesora Liliam Chía' }, { a: 'A.md', b: 'B.md' }, [{ pattern: /Asesora Liliam Ch[ií]a/g, replacement: 'asesora simulada' }]);
  it('aplica las omisiones al cargar', async () => { expect(await library.load('a')).toBe('Hola asesora simulada'); });
  it('rechaza un documento que no se publica', async () => { await expect(library.load('b')).rejects.toThrow(); });
  it('resuelve enlaces relativos solo a documentos publicados', () => {
    expect(library.idForHref('../Dossier/A.md#seccion')).toBe('a');
    expect(library.idForHref('B.md')).toBeUndefined();
    expect(library.idForHref('../Implementacion/otro.md')).toBeUndefined();
  });
});

describe('Soporte técnico', () => {
  it('lo que se publica completo está en la biblioteca, y lo extenso no', () => {
    for (const d of supportDocuments) expect(documentLibrary.has(d.id)).toBe(d.mode === 'full');
  });
  it('los documentos que solo se resumen explican por qué', () => {
    for (const d of supportDocuments.filter(d => d.mode === 'summary')) expect(d.summaryReason).toBeTruthy();
  });
  it('ningún documento publicado muestra los nombres omitidos', async () => {
    for (const d of supportDocuments.filter(d => d.mode === 'full')) {
      const text = await documentLibrary.load(d.id);
      expect(text).not.toMatch(/Liliam|Forero/);
    }
  });
});

describe('Equipo', () => {
  it('tiene los tres integrantes de la ficha', () => {
    expect(teamMembers.map(m => m.name)).toEqual(['Gabriel Gerardo Amaya Becerra', 'Juan Esteban Cortés Rojas', 'Camilo Antonio Roncancio Camacho']);
  });
  it('Equipo no es entrada del menú lateral pero sí está en el pie y en la secuencia', () => {
    const registry = createSectionRegistry();
    const sidebar = registry.groups().flatMap(g => g.sections).filter(s => s.sidebar !== false).map(s => s.id);
    expect(sidebar).toContain('soporte');
    expect(sidebar).not.toContain('equipo');
    expect(registry.footerLinks().map(s => s.id)).toEqual(expect.arrayContaining(['soporte', 'equipo']));
    expect(registry.pagerFor('soporte').next?.id).toBe('preguntas');
    expect(registry.pagerFor('preguntas').next?.id).toBe('equipo');
  });
});
