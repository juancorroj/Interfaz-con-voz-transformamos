import { describe, expect, it } from 'vitest';
import { SectionRegistry, type SectionDefinition } from './SectionRegistry';
import { createSectionRegistry } from './sections';

const icon = (() => null) as unknown as SectionDefinition['icon'];
const section = (id: string, hidden = false): SectionDefinition => ({ id, label: id.toUpperCase(), icon, group: 'g', hidden });

describe('subpáginas', () => {
  const r = new SectionRegistry()
    .registerGroup({ id: 'g', label: 'G' })
    .register({ ...section('hub'), subsections: [{ id: 'uno', label: 'Uno', description: 'd' }, { id: 'dos', label: 'Dos' }] })
    .register(section('plana'))
    .register({ ...section('oculta', true), subsections: [{ id: 'x', label: 'X' }] });

  it('encuentra una subpágina por id', () => {
    expect(r.subsection('hub', 'dos')?.label).toBe('Dos');
    expect(r.subsection('hub', 'zzz')).toBeUndefined();
    expect(r.subsection('plana', 'uno')).toBeUndefined();
  });

  it('resuelve rutas de sección y de subpágina', () => {
    expect(r.resolveStep('plana')).toMatchObject({ id: 'plana', label: 'PLANA' });
    expect(r.resolveStep('hub/uno')).toMatchObject({ id: 'hub', sub: 'uno', label: 'Uno', description: 'd' });
  });

  it('no resuelve rutas inexistentes ni ocultas', () => {
    expect(r.resolveStep('zzz')).toBeUndefined();
    expect(r.resolveStep('hub/zzz')).toBeUndefined();
    expect(r.resolveStep('oculta')).toBeUndefined();
    expect(r.resolveStep('oculta/x')).toBeUndefined();
  });
});

describe('pagerFor', () => {
  const r = new SectionRegistry()
    .registerGroup({ id: 'g', label: 'G' })
    .register(section('antes'))
    .register({ ...section('hub'), subsections: [{ id: 'uno', label: 'Uno' }, { id: 'dos', label: 'Dos' }, { id: 'tres', label: 'Tres' }] })
    .register(section('despues'));

  it('recorre las pestañas y en los extremos pasa a la sección vecina', () => {
    expect(r.pagerFor('hub', 'uno')).toEqual({ prev: expect.objectContaining({ id: 'antes' }), next: { id: 'hub', sub: 'dos', label: 'Dos' } });
    expect(r.pagerFor('hub', 'dos')).toEqual({ prev: { id: 'hub', sub: 'uno', label: 'Uno' }, next: { id: 'hub', sub: 'tres', label: 'Tres' } });
    expect(r.pagerFor('hub', 'tres')).toEqual({ prev: { id: 'hub', sub: 'dos', label: 'Dos' }, next: expect.objectContaining({ id: 'despues' }) });
  });

  it('sin pestaña activa trata la primera como actual', () => {
    expect(r.pagerFor('hub').next).toEqual({ id: 'hub', sub: 'dos', label: 'Dos' });
  });

  it('en una sección sin pestañas devuelve las vecinas del menú', () => {
    expect(r.pagerFor('antes').next).toEqual(expect.objectContaining({ id: 'hub' }));
  });
});

describe('createSectionRegistry (secciones actuales de la web)', () => {
  const registry = createSectionRegistry();

  it('mantiene el orden del menú vigente', () => {
    expect(registry.visible().map(s => s.id)).toEqual(['pitch', 'bienvenida', 'solucion', 'beneficios', 'distintos', 'asesoria', 'publicos', 'etica', 'implementacion', 'costos', 'soporte', 'preguntas', 'equipo']);
  });

  it('agrupa el menú en Presentar, Empezar, Conocer, Caso Asesoría, Otros públicos, Gobierno y Anexos', () => {
    const groups = registry.groups().map(g => [g.group.label, g.sections.map(s => s.id)]);
    expect(groups).toEqual([
      ['Presentar', ['pitch']],
      ['Empezar', ['bienvenida']],
      ['Conocer', ['solucion', 'beneficios', 'distintos']],
      ['Caso Asesoría', ['asesoria']],
      ['Otros públicos', ['publicos']],
      ['Gobierno', ['etica', 'implementacion', 'costos']],
      ['Anexos', ['soporte', 'preguntas', 'equipo']],
    ]);
  });

  it('el caso de Asesoría declara sus siete pestañas de lo humano a lo técnico', () => {
    expect(registry.byId('asesoria')?.subsections?.map(t => t.id)).toEqual(['resumen', 'proceso', 'memoria', 'operacion', 'malla', 'agentes', 'validacion']);
  });

  it('Casos de uso por público declara un panorama y una pestaña por público', () => {
    expect(registry.byId('publicos')?.subsections?.map(t => t.id)).toEqual(['panorama', 'estudiantes', 'graduados', 'profesores', 'administrativos', 'aliados']);
  });

  it('Beneficios declara sus cuatro pestañas', () => {
    expect(registry.byId('beneficios')?.subsections?.map(t => t.id)).toEqual(['personas', 'procesos', 'universidad', 'publicos']);
  });

  it('solo el pitch oculta Anterior / Siguiente', () => {
    expect(registry.byId('pitch')?.showPager).toBe(false);
    expect(registry.all().filter(s => s.showPager === false).map(s => s.id)).toEqual(['pitch']);
  });

  it('las secciones vecinas del caso son Preguntas frecuentes y Otros públicos', () => {
    const { prev, next } = registry.siblings('asesoria');
    expect([prev?.id, next?.id]).toEqual(['distintos', 'publicos']);
  });

  it('mantiene oculto el recorrido guiado', () => {
    expect(registry.byId('recorrido')?.hidden).toBe(true);
    expect(registry.visible().some(s => s.id === 'recorrido')).toBe(false);
  });

  it('Preguntas frecuentes, Ética, Costos, Soporte técnico y Equipo son los enlaces de pie', () => {
    expect(registry.footerLinks().map(s => s.id)).toEqual(['etica', 'costos', 'soporte', 'preguntas', 'equipo']);
    expect(registry.byId('equipo')?.sidebar).toBe(false);
  });
});
