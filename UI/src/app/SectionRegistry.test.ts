import { describe, expect, it } from 'vitest';
import { SectionRegistry, type SectionDefinition } from './SectionRegistry';
import { createSectionRegistry } from './sections';

const icon = (() => null) as unknown as SectionDefinition['icon'];
const section = (id: string, group = 'g1', hidden = false): SectionDefinition => ({ id, label: id.toUpperCase(), icon, group, hidden });

function sample() {
  return new SectionRegistry()
    .registerGroup({ id: 'g1', label: 'Uno' })
    .registerGroup({ id: 'g2', label: 'Dos' })
    .registerGroup({ id: 'g3', label: 'Vacío' })
    .register(section('a'))
    .register(section('b', 'g1', true))
    .register(section('c', 'g2'))
    .register(section('d', 'g1'));
}

describe('SectionRegistry', () => {
  it('rechaza secciones y grupos duplicados', () => {
    const r = sample();
    expect(() => r.register(section('a'))).toThrow(/duplicada/);
    expect(() => r.registerGroup({ id: 'g1', label: 'x' })).toThrow(/duplicado/);
  });

  it('rechaza secciones de un grupo desconocido', () => {
    expect(() => new SectionRegistry().register(section('a', 'nada'))).toThrow(/desconocido/);
  });

  it('encuentra por id y conserva el orden de registro', () => {
    const r = sample();
    expect(r.byId('c')?.label).toBe('C');
    expect(r.byId('zzz')).toBeUndefined();
    expect(r.all().map(s => s.id)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('excluye las ocultas del menú pero las deja consultables', () => {
    const r = sample();
    expect(r.visible().map(s => s.id)).toEqual(['a', 'c', 'd']);
    expect(r.byId('b')?.hidden).toBe(true);
  });

  it('agrupa solo grupos con secciones visibles, en orden de registro', () => {
    const grouped = sample().groups();
    expect(grouped.map(g => g.group.id)).toEqual(['g1', 'g2']);
    expect(grouped[0].sections.map(s => s.id)).toEqual(['a', 'd']);
  });

  it('devuelve el grupo de una sección', () => {
    const r = sample();
    expect(r.groupFor('c')?.label).toBe('Dos');
    expect(r.groupFor('zzz')).toBeUndefined();
  });

  it('lista como enlaces de pie solo las visibles que lo piden', () => {
    const r = new SectionRegistry()
      .registerGroup({ id: 'g', label: 'G' })
      .register({ ...section('a', 'g'), footer: true })
      .register({ ...section('b', 'g', true), footer: true })
      .register(section('c', 'g'));
    expect(r.footerLinks().map(s => s.id)).toEqual(['a']);
  });

  it('calcula vecinas anterior y siguiente saltando las ocultas', () => {
    const r = sample();
    expect(r.siblings('a')).toEqual({ prev: undefined, next: r.byId('c') });
    expect(r.siblings('d').prev?.id).toBe('c');
    expect(r.siblings('d').next).toBeUndefined();
    expect(r.siblings('b')).toEqual({});
  });
});

