import { describe, expect, it } from 'vitest';
import { audiences } from '../../data/audiences';
import { audienceVisions } from './beneficios';
import { publics } from './publicos';

describe('contenido de casos de uso por público', () => {
  it('tiene los cinco públicos del reto en el orden de la ficha', () => {
    expect(publics.map(p => p.id)).toEqual(['estudiantes', 'graduados', 'profesores', 'administrativos', 'aliados']);
  });

  it('el inventario suma 47 agentes de escucha y 40 de realimentación (87 en total)', () => {
    // La matriz de reutilización titula «89», pero las filas de su propia tabla suman 87.
    expect(publics.reduce((sum, p) => sum + p.agents.listening, 0)).toBe(47);
    expect(publics.reduce((sum, p) => sum + p.agents.feedback, 0)).toBe(40);
  });

  it('todas las mallas de realimentación tienen 8 agentes', () => {
    expect(publics.every(p => p.agents.feedback === 8)).toBe(true);
  });

  it('solo Estudiantes está ejecutado; los otros cuatro están diseñados sin ejecutar', () => {
    expect(publics.filter(p => p.status === 'ejecutado').map(p => p.id)).toEqual(['estudiantes']);
    expect(publics.filter(p => p.status === 'disenado')).toHaveLength(4);
  });

  it('la reutilización de las mallas nuevas está entre el 42 % y el 61 % que declara la ficha', () => {
    const values = publics.filter(p => p.reusePct !== null).map(p => p.reusePct!);
    expect(Math.min(...values)).toBe(42);
    expect(Math.max(...values)).toBe(61);
  });

  it('el público de origen no declara un porcentaje de reutilización', () => {
    expect(publics.find(p => p.id === 'estudiantes')?.reusePct).toBeNull();
  });

  it('cada público tiene fichas temáticas y declara qué existe y qué falta', () => {
    for (const p of publics) {
      expect(p.thematic.length, p.id).toBeGreaterThan(0);
      expect(p.exists.length, p.id).toBeGreaterThan(0);
      expect(p.missing.length, p.id).toBeGreaterThan(0);
    }
  });

  it('los públicos no ejecutados dicen explícitamente que no tienen ejecución con personas', () => {
    for (const p of publics.filter(p => p.status === 'disenado')) {
      expect(p.missing.some(m => /ejecuci[óo]n con personas/i.test(m)), p.id).toBe(true);
    }
  });

  it('coincide con la visión por público y con los casos de ejemplo', () => {
    expect(audienceVisions.map(a => a.id)).toEqual(publics.map(p => p.id));
    for (const p of publics) expect(audiences.some(a => a.id === p.id), p.id).toBe(true);
  });

  it('los estados de la visión por público coinciden con los de cada caso', () => {
    for (const p of publics) expect(audienceVisions.find(a => a.id === p.id)?.status, p.id).toBe(p.status);
  });
});

describe('impacto potencial', () => {
  it('solo los públicos con cifra en el modelo del proceso la declaran', () => {
    expect(publics.filter(p => p.impact).map(p => p.id)).toEqual(['graduados', 'profesores', 'administrativos']);
  });
  it('las cifras coinciden con las del modelo del proceso', () => {
    expect(publics.find(p => p.id === 'graduados')?.impact?.value).toBe(39399);
    expect(publics.find(p => p.id === 'profesores')?.impact?.value).toBe(1956);
    expect(publics.find(p => p.id === 'administrativos')?.impact?.value).toBe(1270);
  });
});
