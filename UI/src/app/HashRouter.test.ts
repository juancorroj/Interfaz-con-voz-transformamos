import { describe, expect, it } from 'vitest';
import { HashRouter } from './HashRouter';
import { createSectionRegistry, legacyRouteAliases } from './sections';

const router = new HashRouter(createSectionRegistry(), 'bienvenida', legacyRouteAliases);

describe('HashRouter.parse', () => {
  it('lee la sección', () => {
    expect(router.parse('#/solucion')).toEqual({ sectionId: 'solucion', sub: undefined, params: {} });
  });

  it('lee una subpágina declarada y los parámetros', () => {
    expect(router.parse('#/asesoria/malla?vista=x')).toEqual({ sectionId: 'asesoria', sub: 'malla', params: { vista: 'x' } });
  });

  it('descarta una subpágina que la sección no declara', () => {
    expect(router.parse('#/asesoria/no-existe').sub).toBeUndefined();
    expect(router.parse('#/solucion/graduados').sub).toBeUndefined();
  });

  it('acepta el hash sin barra inicial', () => {
    expect(router.parse('#publicos').sectionId).toBe('publicos');
  });

  it('vuelve a la ruta de respaldo si el hash está vacío o es desconocido', () => {
    expect(router.parse('').sectionId).toBe('bienvenida');
    expect(router.parse('#/').sectionId).toBe('bienvenida');
    expect(router.parse('#/no-existe/x').sectionId).toBe('bienvenida');
  });

  it('no permite entrar por URL a una sección oculta', () => {
    expect(router.parse('#/recorrido')).toEqual({ sectionId: 'bienvenida', params: {} });
  });

  it('tolera codificaciones inválidas', () => {
    expect(router.parse('#/asesoria/%E0%A4%A').sectionId).toBe('asesoria');
  });
});

describe('HashRouter y las rutas anteriores', () => {
  it.each([
    ['#/malla', 'malla'],
    ['#/agentes', 'agentes'],
    ['#/memoria', 'memoria'],
    ['#/operacion', 'operacion'],
  ])('%s abre la pestaña del caso', (hash, sub) => {
    expect(router.parse(hash)).toEqual({ sectionId: 'asesoria', sub, params: {} });
  });

  it('conserva los parámetros del enlace antiguo', () => {
    expect(router.parse('#/malla?x=1').params).toEqual({ x: '1' });
  });
});

describe('HashRouter.format', () => {
  it('construye el hash de una sección', () => {
    expect(router.format({ sectionId: 'solucion' })).toBe('#/solucion');
  });

  it('incluye subpágina y parámetros codificados', () => {
    expect(router.format({ sectionId: 'asesoria', sub: 'proceso', params: { q: 'a b' } })).toBe('#/asesoria/proceso?q=a+b');
  });

  it('es inverso de parse', () => {
    const target = { sectionId: 'asesoria', sub: 'validacion', params: { vista: 'x' } };
    expect(router.parse(router.format(target))).toEqual({ ...target });
  });
});
